import "../styles/globals.css"; //Available for all the pages and components
import "antd/dist/antd.css"; //Antd css file import

//Authentication Provider
import { UserProvider } from "@auth0/nextjs-auth0";

//Global custom layout for webapp
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    // wrapping all pages with authentication 
    <UserProvider> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
