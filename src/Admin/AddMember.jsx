import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import Adminnavbar from "./Adminnavbar";

const AddMember = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append form data fields
    formData.append(
      "mem",
      new Blob(
        [
          JSON.stringify({
            name: data.name,
            role: data.role,
            bio: data.bio,
            linkedin: data.linkedin,
            email: data.email,
            github: data.github,
            year: data.year,
          }),
        ],
        { type: "application/json" }
      )
    );
    formData.append("image", data.image[0]); // Select the first file from the array

    try {
      const response = await axios.post(
        "https://sods-admin.up.railway.app/api/member/addmember",
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
      console.error("Error adding member:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data || "An error occurred while adding the member",
      });
    }
  };

  return (
    <>
      <Adminnavbar />

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card">
            <h2>Hello Admin</h2>
            <div className="top-actions">
              <div className="search-bar">
                <input type="text" placeholder="Search..." />
                <i className="fas fa-search"></i>
              </div>
              <div className="bell-icon">
                <i className="fas fa-bell"></i>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="main-card">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">Add Member</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */} 
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Role:
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("role", { required: "Role is required" })}
                  />
                  {errors.role && (
                    <p className="text-sm text-red-500">{errors.role.message}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bio:
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("bio", { required: "Bio is required" })}
                  ></textarea>
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    LinkedIn:
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("linkedin", {
                      required: "LinkedIn URL is required",
                      pattern: {
                        value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
                        message: "Enter a valid LinkedIn URL",
                      },
                    })}
                  />
                  {errors.linkedin && (
                    <p className="text-sm text-red-500">{errors.linkedin.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    GitHub:
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("github", {
                      required: "GitHub URL is required",
                      pattern: {
                        value: /^https?:\/\/(www\.)?github\.com\/.*$/,
                        message: "Enter a valid GitHub URL",
                      },
                    })}
                  />
                  {errors.github && (
                    <p className="text-sm text-red-500">{errors.github.message}</p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Year:
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("year", {
                      required: "Year is required",
                      min: { value: 1, message: "Year must be at least 1" },
                    })}
                  />
                  {errors.year && (
                    <p className="text-sm text-red-500">{errors.year.message}</p>
                  )}
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Image:
                  </label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("image", { required: "Image is required" })}
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMember;
