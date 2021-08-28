import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const LayoutFlexibleFooter = ({ children }): JSX.Element => (
  <div className="flex flex-col">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default LayoutFlexibleFooter;
