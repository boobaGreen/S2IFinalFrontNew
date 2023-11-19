import Axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at least 30 characters")
    .required("Username is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at least 20 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
  // acceptTerms: yup.bool().oneOf([true], "Accept Terms is required"),
});

function Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    console.log("data******************", data);
    try {
      // qui da mettere indirizzo vero quando in PROD questo in DEV ************

      const response = await Axios.post(
        `http://127.0.0.1:3005/api/v1/users/signup`,
        data
      );

      console.log("Risposta dal server:", response.data);
      reset();
    } catch (error) {
      console.error("Errore durante la richiesta POST:", error);
    }
  };
  const onResetHandler = () => {
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="userName"
            type="text"
            {...register("userName")}
            className={`form-control ${errors.userName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.userName?.message}</div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="passwordConfirm"
            type="password"
            {...register("passwordConfirm")}
            className={`form-control ${
              errors.passwordConfirm ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.passwordConfirm?.message}
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <button
            type="button"
            onClick={onResetHandler}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
