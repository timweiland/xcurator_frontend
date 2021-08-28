import { useForm, Controller } from "react-hook-form";
import TextInput from "@components/Form/TextInput";
import Checkbox from "@components/Form/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const REGISTER_URI =
  process.env.NEXT_PUBLIC_BACKEND_BASE +
  process.env.NEXT_PUBLIC_USER_AUTH_PATH +
  "/register/";

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

const handleRegisterSubmit = (formData) => {
  const transformedData = transformFormData(formData);
  console.log(transformedData);
  return axios.post(REGISTER_URI, transformFormData(formData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
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

const AccountCredentials = (props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  return (
    <form
      className="flex flex-col max-w-3xl m-auto"
      onSubmit={handleSubmit(handleRegisterSubmit)}
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
            {...register("firstname", {
              required: "Please enter your first name.",
            })}
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
            {...register("lastname", {
              required: "Please enter your last name.",
            })}
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
          {...register("email", {
            required: "Please enter your email address.",

            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format.",
            },
          })}
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
          {...register("username", {
            required: "Please choose a username.",
            minLength: {
              value: 3,
              message: "Your username must have at least 3 characters.",
            },
            maxLength: {
              value: 20,
              message: "Your username cannot have more than 20 characters.",
            },
          })}
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
          {...register("password", {
            required: "Please choose a password.",
            minLength: {
              value: 6,
              message: "Your password must have at least 6 characters.",
            },
          })}
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
