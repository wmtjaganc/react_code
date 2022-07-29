import Footer from "./Footer";
import Navbar from "./Navbar";
import Meta from "./Meta";

export default function Layout({ children, home }) {
  return (
    <>
      {/* Global meta tags for all the pages better for SEO */}
      <Meta />

      <header style={{ padding: "20px 50px" }}>
        <Navbar />
      </header>

      <main
        style={{ minHeight: "86vh", padding: "20px 50px" }}
        className="px-56"
      >
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
