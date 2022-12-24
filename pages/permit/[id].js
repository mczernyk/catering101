import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/react";
const getPermitByID = require("../../prisma/Permit").getPermitByID;
import HomeStyles from "../../styles/Home.module.css";


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
      <>
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
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{permit.title}</title>
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
            <footer className="permit-footer">
              <div className="option-footer">
                {/* add user image to permit footer */}
                <Image src={permit.user.image} alt={permit.user.name} width={48} height={48} className="rounded-full" />
                <p>{permit.user.name}</p>
              </div>
            </footer>
          </article>
        </main>
      </div>
    </>
  );
};
export default Permit;
