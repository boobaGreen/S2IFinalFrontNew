// Manage.js
import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import GroupListLogic from "./GroupList";
import { useAuthMode } from "../contexts/AuthModeProvider";
import { useNavigate } from "react-router-dom";
import GroupList from "./GroupList";

const groupSchema = yup.object().shape({
  name: yup.string().required("Group Name is required"),
  course: yup.string().required("Course is required"),
  master: yup.string().required("Master is required"),
  school: yup.string().required("School is required"),
});

const Manage = () => {
  const navigate = useNavigate();
  const { isAuth, name, role } = useAuthMode();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCreateGroupOpen, setCreateGroupOpen] = useState(true);
  const [isViewGroupsOpen, setViewGroupsOpen] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    setValue, // Aggiungi setValue dalla libreria react-hook-form
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(groupSchema),
  });

  const jwtToken = Cookies.get("jwt");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      setCourses(response?.data.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [jwtToken]);

  useEffect(() => {
    handleGetAllCourses();
  }, [handleGetAllCourses]);

  useEffect(() => {
    // Aggiorna i campi del form quando il corso selezionato cambia
    if (selectedCourse) {
      setValue("master", selectedCourse.master);
      setValue("school", selectedCourse.school);
    }
  }, [selectedCourse, setValue]);

  const handleCreateGroup = async (data, e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await Axios.post(
        "http://localhost:3005/api/v1/groups",
        data,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      reset();
      setForceUpdate((prev) => !prev); // Forza l'aggiornamento
      navigate("/manage");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggleCreateGroup = () => {
    setCreateGroupOpen((prev) => !prev);
  };

  const toggleViewGroups = () => {
    setViewGroupsOpen((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Study Groups</h1>

      {/* Create Group Section */}
      <div>
        <button onClick={toggleCreateGroup}>Toggle Create Group Section</button>
        {isCreateGroupOpen && (
          <form onSubmit={handleSubmit(handleCreateGroup)} className="mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Group Name:
              </label>
              <input
                {...register("name")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-red-500 text-xs italic">
                {errors.name?.message}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Course:
              </label>
              <select
                {...register("course")}
                onChange={(e) => {
                  const selectedCourse = courses?.find(
                    (course) => course?._id === e.target.value
                  );
                  setSelectedCourse(selectedCourse);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                  <option key={course?._id} value={course?._id}>
                    {course?.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs italic">
                {errors.course?.message}
              </p>
            </div>

            {selectedCourse && (
              <>
                <input
                  type="hidden"
                  {...register("master")}
                  value={selectedCourse?.master}
                />
                <input
                  type="hidden"
                  {...register("school")}
                  value={selectedCourse?.school}
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Group
            </button>
          </form>
        )}
      </div>

      {/* View Groups Section */}
      <div>
        <button onClick={toggleViewGroups}>Toggle View Groups Section</button>
        {isViewGroupsOpen && <GroupList forceUpdate={forceUpdate} />}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Manage;
