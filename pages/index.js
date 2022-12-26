import { useState } from "react";

import { getSession } from "next-auth/react";
// troubleshooting nextauth google login
import {getServerSession} from "next-auth"
const getAllPermitsByUserID = require("../prisma/Permit").getAllPermitsByUserID;

import Head from "next/head";

import PermitsList from "../components/PermitsList";
import Editor from "../components/Editor"

import HomeStyles from "../styles/Home.module.css";


export const getServerSideProps = async ({ req, res }) => {


  // const session = await getSession({ req });
  // Using below instead for nextauth bugs; remove session from props and below session def if no good
  const session = await getServerSession({req})

  if (!session) {
    res.statusCode = 403;
    return { props: { permits: [] } };
  }
  const permits = await getAllPermitsByUserID(session?.user?.id);
  return {
    props: {
      permits,
      session
    },
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
