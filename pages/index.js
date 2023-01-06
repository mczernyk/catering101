import { useState } from "react";
import { getSession } from "next-auth/react";

// GET request - user permits from db
const getAllPermitsByUserID = require("../prisma/Permit").getAllPermitsByUserID;

import Head from "next/head";
import PermitsList from "../components/PermitsList";
import Editor from "../components/Editor"

// css
import HomeStyles from "../styles/Home.module.css";

// retrieve all user permits from server
export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { permits: [] } };
  }
  const permits = await getAllPermitsByUserID(session?.user?.id);
  return {
    props: { permits },
  };
};

const Home = ({permits}) => {
  const [showEditor, setShowEditor] = useState(true);

  return (
    <>
      <Head>
        <title>📝 Permits app</title>
        <meta name="description" content="Permits app built with Next.js, Prisma & MongoDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={HomeStyles.container}>
        <main className={HomeStyles.main}>
          <div className="wrapper m-auto max-w-8xl">
            {/* Editor Component */}
            {showEditor && <Editor />}

            {/* Permit list component */}
            <PermitsList retrieved_permits={permits} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
