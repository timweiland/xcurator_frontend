import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ children }): JSX.Element => (
  <div className="flex flex-col h-screen">
    <Header />
    <main className="flex-1 p-5 md:p-20 bg-gray-50">{children}</main>
    <Footer />
  </div>
);

export default Layout;
