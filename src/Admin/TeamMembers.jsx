import React, { useState, useEffect } from "react";
import Adminnavbar from "./Adminnavbar";
import axios from "axios";
import Swal from "sweetalert2";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    linkedin: "",
    email: "",
    github: "",
    year: "",
    image: null,
  });

  // Fetch all members
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9092/api/member/getallmembers"
      );
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle adding a new member


  // Handle editing a member
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to save the changes for this member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        for (const key in selectedMember) {
          formData.append(key, selectedMember[key]);
        }
        try {
          await axios.put(
            `http://localhost:9092/api/member/update/${selectedMember.id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          setIsEditing(false);
          setSelectedMember(null);
          fetchMembers(); // Refresh member list
          Swal.fire(
            "Saved!",
            "The member's details have been updated.",
            "success"
          );
        } catch (error) {
          console.error("Error updating member:", error);
          Swal.fire(
            "Error!",
            "There was an error updating the member.",
            "error"
          );
        }
      }
    });
  };

  // Handle deleting a member
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
          await axios.delete(
            `http://localhost:9092/api/member/deletemember/${id}`
          );
          fetchMembers(); // Refresh member list
          Swal.fire("Deleted!", "The member has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting member:", error);
          Swal.fire(
            "Error!",
            "There was an error deleting the member.",
            "error"
          );
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
                <h2 className="text-2xl font-bold">Team Members</h2>
                
              </div>

              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Role</th>
                    <th className="px-4 py-2 border">Bio</th>
                    <th className="px-4 py-2 border">Year</th>
                    <th className="px-4 py-2 border">Image</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-2 border">{member.name}</td>
                      <td className="px-4 py-2 border">{member.role}</td>
                      <td className="px-4 py-2 border">{member.bio}</td>
                      <td className="px-4 py-2 border">{member.year}</td>
                      <td className="px-4 py-2 border">
                        <img
                          src={`http://localhost:9092/api/member/getmemberimage/${member.id}`}
                          alt={`${member.name}'s profile`}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                      </td>
                      <td className="px-4 py-2 border flex gap-2">
                        <button
                          className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                          onClick={() => {
                            setIsEditing(true);
                            setSelectedMember(member);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                          onClick={() => handleDelete(member.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {( isEditing) && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <form
                  className="bg-white p-6 rounded shadow-md w-1/3"
                  onSubmit={handleEditSubmit}
                >
                  <h2 className="text-lg font-bold mb-4">
                    { "Edit Member"}
                  </h2>
                  {Object.keys(newMember).map((key) =>
                    key !== "image" ? (
                      <div className="mb-4" key={key}>
                        <label className="block text-gray-700">{key}</label>
                        <input
                          type="text"
                          name={key}
                          value={
                             selectedMember[key]
                          }
                          onChange={(e) =>
                            setSelectedMember({
                                  ...selectedMember,
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
                          Profile Image
                        </label>
                        <input
                          type="file"
                          name={key}
                          onChange={(e) =>
                             setSelectedMember({
                                  ...selectedMember,
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
                      {"Save Changes"}
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

export default TeamMembers;
