import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import TextInput from "@components/Form/TextInput";
import axios from "axios";

import { useAuth } from "@services/AuthService";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });

  const user = useAuth((state) => state.user);
  const login = useAuth((state) => state.login);

  const router = useRouter();

  const [loginError, setLoginError] = useState(undefined);

  const handleLoginSubmit = ({ username, password }) => {
    login(username, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        setLoginError(error);
      });
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(
        (formData) => {
          handleLoginSubmit(formData);
        },
        (errors) => {
          setLoginError(undefined);
        }
      )}
    >
      <h1 className="text-5xl font-bold leading-loose">Login</h1>
      <div className="w-full max-w-xl">
        <label htmlFor="username" className="sr-only">
          Email address or username
        </label>
        <TextInput
          type="text"
          name="username"
          id="username"
          placeholder="Email address or username"
          {...register("username", {
            required: "You need to enter your email address or username.",
          })}
          errors={errors}
        />
      </div>
      <div className="w-full mt-3 max-w-xl">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <TextInput
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          {...register("password", {
            required: "You need to enter your password.",
          })}
          errors={errors}
        />
      </div>
      {loginError && (
        <span className="text-red-500 mt-3">Error: {loginError.message}</span>
      )}
      <div className="w-full mt-3 max-w-xl">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent font-bold rounded-md text-white bg-pink-800 hover:bg-pink-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </div>
    </form>
  );
};

const RegisterHint = (): JSX.Element => (
  <Link href="/register">
    <a className="w-1/2 py-2 px-4 border border-transparent font-bold rounded-md text-white bg-green-500 text-center">
      Create a new account
    </a>
  </Link>
);

const LoginContent = (): JSX.Element => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  const router = useRouter();

  if (isAuthenticated && user) {
    router.push("/");
    return (
      <div className="flex items-center justify-center">
        <p className="text-center font-bold text-3xl">
          Already logged in. Redirecting...
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="pb-8">
        <LoginForm />
      </div>
      <div className="border-t pt-8 flex justify-center">
        <RegisterHint />
      </div>
    </>
  );
};

export default function Login(): JSX.Element {
  return (
    <div class="container mx-auto flex flex-col items-center justify-center h-full">
      <Head>
        <title>xCurator | Login</title>
      </Head>
      <div className="border-4 px-12 pb-8 pt-6 w-full max-w-3xl bg-white">
        <LoginContent />
      </div>
    </div>
  );
}
