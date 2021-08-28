import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const LayoutBlank = ({ children }): JSX.Element => (
  <div className="flex flex-col h-screen">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default LayoutBlank;
