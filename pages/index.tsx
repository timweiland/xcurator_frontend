import LandingPage from "@components/LandingPage/LandingPage";

import LayoutFlexibleFooter from "@components/Layout/LayoutFlexibleFooter";

const Home = (): JSX.Element => {
  return <LandingPage />;
};

Home.getLayout = (page) => <LayoutFlexibleFooter>{page}</LayoutFlexibleFooter>;

export default Home;
