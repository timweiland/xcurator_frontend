import Head from "next/head";
import Image from "next/image";

import LayoutFlexibleFooter from "@components/Layout/LayoutFlexibleFooter";

const MainHero = (): JSX.Element => (
  <div className="relative" style={{ height: "75vh" }}>
    <div className="w-full h-full bg-primary-800 absolute top-0 left-0 opacity-60 z-10"></div>
    <div className="w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 z-30">
      <h1 className="text-6xl font-bold text-white">Explore history with AI</h1>
      <button className="w-96 text-3xl mt-4 py-2 px-4 border border-transparent font-bold rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Show me
      </button>
    </div>
    <Image
      src="/images/waterloo.jpg"
      layout="fill"
      alt="xCurator Background"
      objectFit="cover"
    />
  </div>
);

const Highlights = (): JSX.Element => (
  <article
    className="w-full flex px-16 py-16 relative"
    style={{ height: "70vh" }}
  >
    <div className="h-full w-1/2 relative border-2 border-gray-500">
      <Image
        src="/images/blm_throne.jpg"
        layout="fill"
        alt="Highlights"
        objectFit="cover"
      />
    </div>
    <div className="ml-10 flex flex-col justify-center">
      <h1 className="text-3xl font-bold">Highlights</h1>
      <p className="mt-4 text-lg">
        Check out the highlights of our collections
      </p>
    </div>
  </article>
);

const UntoldStories = (): JSX.Element => (
  <article
    className="w-full flex flex-row-reverse px-16 py-16 relative bg-gray-200"
    style={{ height: "70vh" }}
  >
    <div className="h-full w-1/2 relative border-2 border-gray-500">
      <Image
        src="/images/ap_sarcophagus.jpg"
        layout="fill"
        alt="Highlights"
        objectFit="cover"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-3xl font-bold">Untold Stories</h1>
      <p className="mt-4 text-lg">Discover hidden gems</p>
    </div>
  </article>
);

const CallToAction = (): JSX.Element => (
  <div className="w-full flex items-center p-32">
    <h1 className="flex-1 text-3xl font-bold">Use the xCurator</h1>
    <div className="flex">
      <button className="w-72 text-2xl py-2 px-4 border border-transparent font-bold rounded-md text-white bg-primary-800 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Sign up
      </button>
      <button className="w-72 text-2xl ml-8 py-2 px-4 border border-transparent font-bold rounded-md text-primary-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Please explain
      </button>
    </div>
  </div>
);

const Home = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      <MainHero />
      <Highlights />
      <UntoldStories />
      <CallToAction />
    </div>
  );
};

Home.getLayout = (page) => <LayoutFlexibleFooter>{page}</LayoutFlexibleFooter>;

export default Home;
