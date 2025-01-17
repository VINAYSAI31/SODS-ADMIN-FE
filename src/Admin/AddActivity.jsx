import React from "react";
import Adminnavbar from "./Adminnavbar";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const AddActivity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form data fields
    formData.append(
      "act",
      new Blob(
        [
          JSON.stringify({
            title:data.title,
            des:data.des,
          }),
        ],
        { type: "application/json" }
      )
    );
    formData.append("image", data.image[0]); // Select the first file from the array

    try {
      const response = await axios.post(
        "http://localhost:9092/api/activity/addactivity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data, // Display success message from the server
      });
    } catch (error) {
      console.error("Error adding Activity:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data || "An error occurred while adding the Activity",
      });
    }
  };

  return (
    <>
      <Adminnavbar />

      {/* Main Content */}
      <div className="main-content bg-gray-100 min-h-screen p-6">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card flex justify-between items-center bg-white p-4 rounded shadow mb-6">
            <h2 className="text-xl font-bold">Hello Admin</h2>
            <div className="top-actions flex items-center space-x-4">
              <div className="search-bar relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border border-gray-300 rounded-md w-64"
                />
                <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
              </div>
              <div className="bell-icon">
                <i className="fas fa-bell text-gray-500 text-xl"></i>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="flex items-center justify-center min-h-screen bg-white-100">
            <div className="max-w-4xl w-full main-card bg-white p-6 rounded shadow transform -translate-y-20">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Add Activity
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is Required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description:
                  </label>
                  <textarea
                    {...register("des", {
                      required: "Description is Required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    rows="4"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Poster */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Poster:
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: "Poster is Required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  {errors.poster && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.poster.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddActivity;
