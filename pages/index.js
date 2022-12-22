import { useState } from "react";

import Head from "next/head";

import PermitsList from "../components/PermitsList";
import Editor from "../components/Editor"

import HomeStyles from "../styles/Home.module.css";

const Home = () => {
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
            <PermitsList />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
