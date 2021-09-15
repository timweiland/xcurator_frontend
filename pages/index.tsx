import { useAuth } from "@services/AuthService";
import MainRecommendations from "@components/CategoryRecommendations/MainRecommendations";
import LandingPage from "@components/LandingPage/LandingPage";

import LayoutFlexibleFooter from "@components/Layout/LayoutFlexibleFooter";
import Layout from "@components/Layout/Layout";

import Spinner from "@components/Loading/Spinner";

const Home = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth((state) => ({
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
    return (
      <Layout>
        <div className="h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      </Layout>
    );
  }
  return isAuthenticated ? (
    <Layout>
      <MainRecommendations />
    </Layout>
  ) : (
    <LayoutFlexibleFooter>
      <LandingPage />
    </LayoutFlexibleFooter>
  );
};

Home.getLayout = (page) => {
  return page;
};

export default Home;
