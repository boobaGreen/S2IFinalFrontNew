//ManageAdmin.jsx
import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Cookies from "js-cookie";

const schoolSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Username must be at least 3 characters")
    .max(50, "Max 50 characters"),
  site: yup.string().url("Invalid URL").required("Site URL is required"),
});

const masterSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Max 50 characters"),
});

const courseSchema = yup.object().shape({
  name: yup.string().required("Name is required").max(50, "Max 50 characters"),
  master: yup.string().required("Master is required"),
  school: yup.string().required("School is required"),
});

const ManageAdmin = () => {
  const [schools, setSchools] = useState([]);
  const [masters, setMasters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewing, setViewing] = useState(null);

  const {
    register: registerSchool,
    handleSubmit: handleSubmitSchool,
    formState: { errors: errorsSchool },
    reset: resetSchool,
  } = useForm({
    resolver: yupResolver(schoolSchema),
  });

  const {
    register: registerMaster,
    handleSubmit: handleSubmitMaster,
    formState: { errors: errorsMaster },
    reset: resetMaster,
  } = useForm({
    resolver: yupResolver(masterSchema),
  });

  const {
    register: registerCourse,
    handleSubmit: handleSubmitCourse,
    formState: { errors: errorsCourse },
    reset: resetCourse,
  } = useForm({
    resolver: yupResolver(courseSchema),
  });

  const jwtToken = Cookies.get("jwt");

  const handleGetAllMasters = useCallback(async () => {
    try {
      setLoading(true);

      if (!jwtToken) {
        return null;
      }

      const response = await Axios.get("http://localhost:3005/api/v1/masters", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setMasters((prevMasters) => [...prevMasters, ...response.data.data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [jwtToken]);

  const handleGetAllSchools = useCallback(async () => {
    try {
      setLoading(true);

      if (!jwtToken) {
        return null;
      }

      const response = await Axios.get("http://localhost:3005/api/v1/schools", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setSchools((prevSchools) => [...prevSchools, ...response.data.data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [jwtToken]);

  const handleGetAllCourses = useCallback(async () => {
    try {
      setLoading(true);

      if (!jwtToken) {
        return null;
      }

      const response = await Axios.get("http://localhost:3005/api/v1/courses", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setCourses((prevCourses) => [...prevCourses, ...response.data.data.data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [jwtToken]);

  const handleCreateEntity = async (data, endpoint, resetFunction) => {
    try {
      setLoading(true);
      const response = await Axios.post(
        `http://localhost:3005/api/v1/${endpoint}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (endpoint === "schools") {
        setSchools([...schools, response.data]);
      } else if (endpoint === "masters") {
        setMasters([...masters, response.data]);
      } else if (endpoint === "courses") {
        setCourses([...courses, response.data]);
      }

      resetFunction();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMaster = (data) => {
    handleCreateEntity(data, "masters", resetMaster);
  };

  const handleCreateCourse = (data) => {
    handleCreateEntity(data, "courses", resetCourse);
  };

  const handleCreateSchool = (data) => {
    handleCreateEntity(data, "schools", resetSchool);
  };

  useEffect(() => {
    handleGetAllCourses();
    handleGetAllMasters();
    handleGetAllSchools();
  }, [handleGetAllMasters, handleGetAllSchools, handleGetAllCourses]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Test Page</h1>

      <div className="md:flex">
        <div className="md:w-1/2 pr-4">
          {/* Form per creare una scuola */}
          <form
            onSubmit={handleSubmitSchool(handleCreateSchool)}
            className="mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                School Name:
              </label>
              <input
                {...registerSchool("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-500 text-xs italic">
                {errorsSchool.name?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Site URL:
              </label>
              <input
                {...registerSchool("site")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-500 text-xs italic">
                {errorsSchool.site?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Create School
            </button>
          </form>

          {/* Form per creare un master */}
          <form
            onSubmit={handleSubmitMaster(handleCreateMaster)}
            className="mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Master Name:
              </label>
              <input
                {...registerMaster("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-500 text-xs italic">
                {errorsMaster.name?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select School:
              </label>
              <select
                {...registerMaster("school")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a School</option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id}>
                    {school.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs italic">
                {errorsMaster.school?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Master
            </button>
          </form>

          {/* Form per creare un corso */}
          <form
            onSubmit={handleSubmitCourse(handleCreateCourse)}
            className="mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Course Name:
              </label>
              <input
                {...registerCourse("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-500 text-xs italic">
                {errorsCourse.name?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Master:
              </label>
              <select
                {...registerCourse("master")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Master</option>
                {masters.map((master) => (
                  <option key={master._id} value={master._id}>
                    {master.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs italic">
                {errorsCourse.master?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select School:
              </label>
              <select
                {...registerCourse("school")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a School</option>
                {schools.map((school) => (
                  <option key={school._id} value={school._id}>
                    {school.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs italic">
                {errorsCourse.school?.message}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Course
            </button>
          </form>
        </div>

        <div className="md:w-1/2">
          <button
            onClick={() => setViewing("schools")}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            View Schools
          </button>
          <button
            onClick={() => setViewing("masters")}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            View Masters
          </button>
          <button
            onClick={() => setViewing("courses")}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            View Courses
          </button>

          {/* Visualizzazione delle scuole */}
          {viewing === "schools" && (
            <div>
              <h2>Schools:</h2>
              <ul>
                {schools.map((school) => (
                  <li key={school._id}>
                    {school.name} - {school.site}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Visualizzazione dei master */}
          {viewing === "masters" && (
            <div>
              <h2>Masters:</h2>
              <ul>
                {masters.map((master) => (
                  <li key={master._id}>{master.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Visualizzazione dei corsi */}
          {viewing === "courses" && (
            <div>
              <h2>Courses:</h2>
              <ul>
                {courses.map((course) => (
                  <li key={course._id}>{course.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ManageAdmin;
