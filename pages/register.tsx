import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import axios from "axios";
import classNames from "classnames";

import LayoutBlank from "@components/Layout/LayoutBlank";
import ProgressBar from "@components/Progress/ProgressBar";
import Experience from "@components/Register/Experience";
import AccountCredentials from "@components/Register/AccountCredentials";
import { SuccessModal } from "@components/Modal/InformationModal";

const REGISTER_URI =
  process.env.NEXT_PUBLIC_BACKEND_BASE +
  process.env.NEXT_PUBLIC_USER_AUTH_PATH +
  "/register/";

const register = (userDetails) => {
  return axios
    .post(REGISTER_URI, userDetails.credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.data && error.response.data.detail) {
          throw new Error(error.response.data.detail);
        }
        throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
        throw new Error("Could not reach server.");
      } else {
        throw new Error(error.message);
      }
    });
};

const tabs = [
  {
    title: "Experience",
    content: ({ userDetails, setUserDetails, ...rest }) => (
      <Experience
        experience={userDetails.experience}
        setExperience={(experience) => {
          setUserDetails({ experience: experience });
        }}
        {...rest}
      />
    ),
  },
  {
    title: "Account Credentials",
    content: ({ handleCredentialsSubmit, ...rest }) => (
      <AccountCredentials
        onCredentialsSubmit={handleCredentialsSubmit}
        {...rest}
      />
    ),
  },
];

const TabPanel = ({ children, show, ...props }) => {
  return (
    <div className={!show ? "hidden" : ""} {...props}>
      {children}
    </div>
  );
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

const RegisterTabs = ({
  selectedTab,
  setTab,
  userDetails,
  setUserDetails,
  handleSubmit,
}) => {
  return (
    <div className="">
      <nav className="flex justify-center mt-6 mb-10">
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
            {content({
              onContinue: () => {
                setTab(index + 1);
              },
              userDetails: userDetails,
              setUserDetails: setUserDetails,
              handleCredentialsSubmit: (credentials) => {
                const finalUserDetails = {
                  ...userDetails,
                  credentials: credentials,
                };
                return handleSubmit(finalUserDetails);
              },
            })}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

const Register = (): JSX.Element => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState(0);
  const [userDetails, setUserDetails] = useState({
    experience: undefined,
    credentials: {},
  });
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <Head>
        <title>xCurator | Register</title>
      </Head>
      <div className="p-8 w-full flex flex-col items-center">
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
        <RegisterTabs
          selectedTab={selectedTab}
          setTab={setSelectedTab}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          handleSubmit={(userDetails) => {
            return register(userDetails).then((resp) => {
              setSuccessModalOpen(true);
            });
          }}
        />
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            router.push("/");
          }}
          title="Success"
          description="Your account has been created successfully. We will now send you an account activation link to your email address."
        />
      </div>
    </div>
  );
};

Register.getLayout = (page) => <LayoutBlank>{page}</LayoutBlank>;

export default Register;
