import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/react";
const getPermitByID = require("../../prisma/Permit").getPermitByID;
import HomeStyles from "../../styles/Home.module.css";
import Link from "next/link"

// display permit data at page corresponding to [ID]


// get single permit data from server
export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getSession({ req });
  console.log({ params });
  const { id } = params;
  if (!session) {
    res.statusCode = 403;
    return { props: { permit: null } };
  }
  const permit = await getPermitByID(id);

  return {
    props: { permit },
  };
};
const Permit = ({ permit }) => {
  if (permit == null) {
    return (
      <div>
        <Head>
          <title>Login to view permit</title>
          <meta name="description" content="Login to view this permit" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={HomeStyles.container}>
          <main className={HomeStyles.main}>
            <header className="max-w-4xl mt-24 mx-auto">
              <h1 className="text-4xl">You have to login to view this permit</h1>
            </header>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{permit.name}</title>
        <meta name="description" content={`By ${permit.user.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <article className="permit max-w-4xl m-auto mt-20">
            <header className="permit-header">
              <h2 className="text-4xl">Event Details</h2>
            </header>
            <main className=" px-4">
              <p className="text-xl">Event Name: {permit.name}</p>
              <p className="text-xl">Location: {permit.location}</p>
              <p className="text-xl">Time: {permit.eventTime}</p>
              <p className="text-xl">Location: {permit.location}</p>
              <p className="text-xl">Liquor Needs: {permit.liquor}</p>
            </main>
            <header className="permit-header">
              <h2 className="text-4xl">Venue Details</h2>
            </header>
            <main className=" px-4">
              <p className="text-xl">Owner: {permit.venueName}</p>
              <p className="text-xl">Email: {permit.email}</p>
              <p className="text-xl">Phone: {permit.phone}</p>
            </main>
            <header className="permit-header">
              <h2 className="text-4xl">Business Details</h2>
            </header>
            <main className=" px-4">
              <p className="text-xl">Contact Name: {permit.contactName}</p>
              <p className="text-xl">Contact SSN: {permit.contactSSN}</p>
              <p className="text-xl">Contact DOB: {permit.contactDOB}</p>
              <p className="text-xl">Company Type: {permit.companyType}</p>
              <p className="text-xl">Address: {permit.address}</p>
            </main>
            <header className="permit-header">
              <h2 className="text-4xl">Permit Status</h2>
            </header>
            <main className=" px-4">
              <p className="text-xl">Status: {permit.reviewed? 'approved' : 'under review'}</p>
              <p className="text-xl">Submitted by: {permit.user.name}</p>

            </main>

            <footer className="permit-footer">
              <div className="option-footer">
                <div className="auth-btn">
                  <button>
                    <Link href={`/`} passHref={true}>Home</Link>
                  </button>
                </div>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
};
export default Permit;
