import { PermitProvider } from "../modules/AppContext";
import { SessionProvider } from "next-auth/react";
import DefaultLayout from "../layouts/default";

import "../styles/globals.css";
import "../styles/Editor.css";
import '../styles/SiteHeader.css'
import "../styles/PermitList.css"
import "../styles/AuthBtn.css"


// **<<SessionProvider />**](https://next-auth.js.org/getting-started/client#sessionprovider)

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <PermitProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </PermitProvider>
    </SessionProvider>
  );
}

export default MyApp;
