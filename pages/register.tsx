import Head from "next/head";
import { useState } from "react";

import classNames from "classnames";

import LayoutBlank from "@components/Layout/LayoutBlank";
import ProgressBar from "@components/Progress/ProgressBar";
import AccountCredentials from "@components/Register/AccountCredentials";

const tabs = [
  {
    title: "Experience",
    content: <p>Placeholder</p>,
  },
  {
    title: "Account Credentials",
    content: <AccountCredentials />,
  },
];

const TabPanel = ({ children, show, ...props }) => {
  return show ? <div {...props}>{children}</div> : null;
};

const StyledTab = ({ children, selected, ...rest }) => {
  const baseClassNames =
    "text-lg p-2 font-medium border-b-2 hover:border-gray-400";
  const conditionalClassNames = {
    "border-pink-800": selected,
  };
  return (
    <button
      className={classNames(baseClassNames, conditionalClassNames)}
      {...rest}
    >
      {children}
    </button>
  );
};

const RegisterTabs = ({ selectedTab, setTab }) => {
  return (
    <div className="h-full flex flex-col">
      <nav className="flex justify-center my-2">
        {tabs.map(({ title }, index) => (
          <StyledTab
            key={title}
            onClick={() => {
              setTab(index);
            }}
            selected={index == selectedTab}
          >
            {title}
          </StyledTab>
        ))}
      </nav>
      <div className="flex-grow flex items-center justify-center">
        {tabs.map(({ title, content }, index) => (
          <TabPanel key={title} show={index == selectedTab}>
            {content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

const Register = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full">
      <Head>
        <title>xCurator | Register</title>
      </Head>
      <div className="p-8 w-full h-full flex flex-col items-center">
        <h1 className="text-4xl font-bold">Registration</h1>
        <h2 className="font-light text-lg">
          {
            "You're only a few minutes away from your very own museum experience!"
          }
        </h2>
        <ProgressBar
          progress={((selectedTab + 1) / tabs.length) * 100}
          className="max-w-3xl mt-3"
        />
        <RegisterTabs selectedTab={selectedTab} setTab={setSelectedTab} />
      </div>
    </div>
  );
};

Register.getLayout = (page) => <LayoutBlank>{page}</LayoutBlank>;

export default Register;
