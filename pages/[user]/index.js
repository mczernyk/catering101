import Head from "next/head";

import PermitsList from "../../components/PermitsList";

import HomeStyles from "../../styles/Home.module.css";

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      params,
    },
  };
};

const User = ({ params }) => {
  return (
    <>
      <Head>
        <title>Permits app</title>
        <meta name="description" content="Permits app built with Next.js, Prisma & MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper m-auto max-w-8xl">
            {/* Permit list component */}
            <PermitsList />
          </div>
        </main>
      </div>
    </>
  );
};

export default User;
