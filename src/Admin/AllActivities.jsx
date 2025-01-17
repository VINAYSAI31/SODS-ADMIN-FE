import React, { useState, useEffect } from "react";
import Adminnavbar from "./Adminnavbar";
import axios from "axios";
import Swal from "sweetalert2";

const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Fetch all activities
  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:9092/api/activity/getactivities");
      setActivities(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle editing an activity
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to save the changes for this activity.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        for (const key in selectedActivity) {
          formData.append(key, selectedActivity[key]);
        }
        try {
          await axios.put(
            `http://localhost:9092/api/activity/update/${selectedActivity.id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          setIsEditing(false);
          setSelectedActivity(null);
          fetchActivities(); // Refresh activity list
          Swal.fire("Saved!", "The activity's details have been updated.", "success");
        } catch (error) {
          console.error("Error updating activity:", error);
          Swal.fire("Error!", "There was an error updating the activity.", "error");
        }
      }
    });
  };

  // Handle deleting an activity
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:9092/api/activity/deleteactivity/${id}`);
          fetchActivities(); // Refresh activity list
          Swal.fire("Deleted!", "The activity has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting activity:", error);
          Swal.fire("Error!", "There was an error deleting the activity.", "error");
        }
      }
    });
  };

  return (
    <>
      <Adminnavbar />

      <div className="main-content">
        <div className="card-container">
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

          <div className="main-card p-6">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Activities</h2>
              </div>

              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-4 py-2 border">{activity.title}</td>
                      <td className="px-4 py-2 border">{activity.des}</td>
                      <td className="px-4 py-2 border">
                        <img
                          src={`http://localhost:9092/api/activity/getactivityimage/${activity.id}`}
                          alt={`${activity.title}`}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-4 py-2 border flex gap-2">
                        <button
                          className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedActivity(activity);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                          onClick={() => handleDelete(activity.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isEditing && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <form
                  className="bg-white p-6 rounded shadow-md w-1/3"
                  onSubmit={handleEditSubmit}
                >
                  <h2 className="text-lg font-bold mb-4">Edit Activity</h2>
                  {Object.keys(selectedActivity).map((key) =>
                    key !== "imagedata" ? (
                      <div className="mb-4" key={key}>
                        <label className="block text-gray-700">{key}</label>
                        <input
                          type="text"
                          name={key}
                          value={selectedActivity[key] || ""}
                          onChange={(e) =>
                            setSelectedActivity({
                              ...selectedActivity,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                    ) : (
                      <div className="mb-4" key={key}>
                      <label className="block text-gray-700">
                        Poster
                      </label>
                      <input
                        type="file"
                        name={key}
                        onChange={(e) =>
                          setSelectedActivity({
                                ...selectedActivity,
                                [key]: e.target.files[0],
                              })
                        }
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                    )
                  )}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllActivities;