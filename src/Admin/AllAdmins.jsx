import React, { useState, useEffect } from "react";
import Adminnavbar from "./Adminnavbar";
import axios from "axios";
import Swal from "sweetalert2";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: "", 
    password: "",
  });

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get("https://sods-admin.up.railway.app/api/admin/getalladmins");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle adding a new admin
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("sods-admin.up.railway.app/api/admin/addadmin", newAdmin);
      setIsAdding(false);
      setNewAdmin({ username: "", password: "" });
      fetchAdmins(); // Refresh admin list
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  // Handle deleting an admin
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
          await axios.delete(`sods-admin.up.railway.app/api/admin/deleteadmin/${id}`);
          fetchAdmins(); // Refresh admin list
          Swal.fire("Deleted!", "The admin has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting admin:", error);
          Swal.fire("Error!", "There was an error deleting the admin.", "error");
        }
      }
    });
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
          <div className="main-card p-6">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">All Admins</h2>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => setIsAdding(true)}
                >
                  Add Admin
                </button>
              </div>

              {/* Admins Table */}
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                <thead>
                  <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Username</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id}>
                        <td className="px-4 py-2 border">{admin.id}</td>
                      <td className="px-4 py-2 border">{admin.username}</td>
                      <td className="px-4 py-2 border flex gap-2">
                        <button
                          className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                          onClick={() => handleDelete(admin.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Admin Form */}
            {isAdding && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <form
                  className="bg-white p-6 rounded shadow-md w-1/3"
                  onSubmit={handleAddSubmit}
                >
                  <h2 className="text-lg font-bold mb-4">Add Admin</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      value={newAdmin.username}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, username: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      value={newAdmin.password}
                      onChange={(e) =>
                        setNewAdmin({ ...newAdmin, password: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      onClick={() => setIsAdding(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add Admin
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

export default AllAdmins;
