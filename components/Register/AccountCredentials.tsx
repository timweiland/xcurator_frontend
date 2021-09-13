import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@components/Form/TextInput";
import Checkbox from "@components/Form/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const transformFormData = ({
  firstname,
  lastname,
  newsletter,
  acceptTerms,
  ...rest
}) => {
  return {
    first_name: firstname,
    last_name: lastname,
    ...rest,
  };
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Please enter your first name."),
  lastname: Yup.string().required("Please enter your last name."),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(512, "Password must not exceed 512 characters"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Please accept the terms and conditions."
  ),
});

const AccountCredentials = ({ onCredentialsSubmit }) => {
  const [submitError, setSubmitError] = useState(undefined);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  console.log(submitError);

  const firstname = register("firstname", {
    required: "Please enter your first name.",
  });
  const lastname = register("lastname", {
    required: "Please enter your last name.",
  });
  const email = register("email", {
    required: "Please enter your email address.",

    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Invalid email format.",
    },
  });
  const username = register("username", {
    required: "Please choose a username.",
    minLength: {
      value: 3,
      message: "Your username must have at least 3 characters.",
    },
    maxLength: {
      value: 20,
      message: "Your username cannot have more than 20 characters.",
    },
  });
  const password = register("password", {
    required: "Please choose a password.",
    minLength: {
      value: 6,
      message: "Your password must have at least 6 characters.",
    },
  });

  return (
    <form
      className="flex flex-col max-w-3xl m-auto"
      onSubmit={handleSubmit(
        (formData) => {
          const credentials = transformFormData(formData);
          onCredentialsSubmit(credentials).catch((error) => {
            setSubmitError(error);
          });
        },
        (errors) => {
          setSubmitError(undefined);
        }
      )}
    >
      <div className="w-full flex justify-center mb-2">
        <div className="mr-2 w-full">
          <label htmlFor="firstname" className="sr-only">
            First name
          </label>
          <TextInput
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First name"
            {...firstname}
            errors={errors}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastname" className="sr-only">
            Last name
          </label>
          <TextInput
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last name"
            {...lastname}
            errors={errors}
          />
        </div>
      </div>
      <div className="w-full mb-2">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <TextInput
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          {...email}
          errors={errors}
        />
      </div>
      <div className="w-full mb-2">
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <TextInput
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          {...username}
          errors={errors}
        />
      </div>
      <div className="w-full mb-2">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <TextInput
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          {...password}
          errors={errors}
        />
      </div>
      <Controller
        control={control}
        name="newsletter"
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label="Please add me to the xCurator newsletter."
            name="newsletter"
            id="newsletter"
            errors={errors}
            checked={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="acceptTerms"
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label="I accept the terms and conditions."
            name="acceptTerms"
            id="acceptTerms"
            errors={errors}
            checked={value}
            onChange={onChange}
          />
        )}
      />
      {submitError && (
        <span className="text-red-500 mt-3">Error: {submitError.message}</span>
      )}
      <div className="w-full mt-3 max-w-xl m-auto">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent font-bold rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default AccountCredentials;
