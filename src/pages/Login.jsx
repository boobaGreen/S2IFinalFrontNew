//Login.jsx

import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at max 20 characters")
    .required("Password is required"),
});

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loadingStatus, setLoadingStatus] = useState("isLoading");
  const goToForgetPassword = () => navigate("/forgetPassword");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    try {
      // qui da mettere indirizzo vero quando in PROD questo in DEV ************
      const response = await Axios.post(
        `http://localhost:3005/api/v1/users/login`,
        data
      );
      console.log("Risposta dal server:", response.data);
      const { token } = response.data;
      Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
      setLoadingStatus("tokenReceived");
      console.log("loadingStatus in token", loadingStatus);
      window.location.reload(); // qui refresha fa l'auth e quindi va su home se il token e' valido
      setLoadingStatus("tokenNotValid");
    } catch (error) {
      console.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };
  const onResetHandler = () => {
    reset();
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">Logo</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 undefined">
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  {...register("email")}
                  name="email"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <div className="text-red-600">{errors.email?.message}</div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 undefined">
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  {...register("password")}
                  name="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="text-red-600">{errors.password?.message}</div>
            </div>
            <button
              onClick={goToForgetPassword}
              className="text-s text-purple-600 hover:underline"
            >
              Forget Password?
            </button>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
            </div>
          </form>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
