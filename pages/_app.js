import { PermitProvider } from "../modules/AppContext";

import DefaultLayout from "../layouts/default";

import "../styles/globals.css";
import "../styles/Editor.css";
import '../styles/SiteHeader.css'
import "../styles/PermitList.css"

function MyApp({ Component, pageProps }) {
  return (
    <PermitProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </PermitProvider>
  );
}

export default MyApp;
