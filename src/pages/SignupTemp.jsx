// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import * as yup from "yup";

// const Signup = () => {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfirm] = useState("");

//   const schema = yup.object().shape({
//     userName: yup
//       .string()
//       .min(3, "Username must be at least 3 characters")
//       .max(30, "Username must be at most 30 characters")
//       .required("Username is required"),
//     email: yup.string().required("Email is required").email("Email is invalid"),
//     password: yup
//       .string()
//       .min(8, "Password must be at least 8 characters")
//       .max(20, "Password must be at most 20 characters")
//       .required("Password is required"),
//     passwordConfirm: yup
//       .string()
//       .required("Confirm Password is required")
//       .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
//   });

//   const handleSignup = async () => {
//     try {
//       await schema.validate(
//         { userName, email, password, passwordConfirm },
//         { abortEarly: false }
//       );

//       const response = await axios.post(
//         "http://localhost:3005/api/v1/users/signup",
//         {
//           userName,
//           email,
//           password,
//           passwordConfirm,
//         }
//       );

//       // Ottieni il token dalla risposta e imposta il cookie HTTP-only
//       const { token } = response.data;
//       Cookies.set("jwt", token, { secure: true, sameSite: "strict" });

//       // Puoi anche gestire il redirect o altre azioni dopo la registrazione

//       console.log("Registrazione avvenuta con successo!", response.data);
//     } catch (error) {
//       if (error.name === "ValidationError") {
//         console.error("Errore di validazione:", error.errors);
//       } else {
//         console.error("Errore durante la registrazione:", error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign up for an account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSignup}>
//           {/* <input type="hidden" name="remember" defaultValue="true" /> */}
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="userName" className="sr-only">
//                 Username
//               </label>
//               <input
//                 id="userName"
//                 name="userName"
//                 type="text"
//                 autoComplete="userName"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="passwordConfirm" className="sr-only">
//                 Confirm Password
//               </label>
//               <input
//                 id="passwordConfirm"
//                 name="passwordConfirm"
//                 type="password"
//                 autoComplete="new-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Confirm Password"
//                 value={passwordConfirm}
//                 onChange={(e) => setPasswordConfirm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
