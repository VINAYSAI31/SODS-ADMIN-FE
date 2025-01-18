import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Adminhome.css";
import AdminNavbar from "./Adminnavbar";
import { CircleUser, Trophy, Target, Sparkles } from "lucide-react";

const Adminhome = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeProjects: 0,
    completedActivities: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersResponse, projectsResponse, activitiesResponse] =
          await Promise.all([
            axios.get("https://sods-admin.up.railway.app/api/member/getallmembers"),
            axios.get("https://sods-admin.up.railway.app/api/project/getallprojects"),
            axios.get("https://sods-admin.up.railway.app/api/activity/getactivities"),
          ]);

        const members = membersResponse.data;
        const projects = projectsResponse.data;
        const activities = activitiesResponse.data;

        const totalMembers = members.length;
        const activeProjects = projects.filter(
          (project) => project.status === "In Progress"
        ).length;
        const completedActivities = activities.filter(
          (activity) => activity.status === "Completed"
        ).length;
        const upcomingEvents = activities.filter(
          (activity) => new Date(activity.date) > new Date()
        ).length;

        setStats({
          totalMembers,
          activeProjects,
          completedActivities,
          upcomingEvents,
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="main-content p-4 sm:p-6 lg:p-8">
        <div className="card-container space-y-6">
          {/* Top Card */}
          <div className="top-card flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, Admin!
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Here's what's happening in the Data Science Club
              </p>
            </div>
            <div className="top-actions flex flex-row space-x-4">
              <div className="search-bar relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border rounded-lg w-full sm:w-48"
                />
                <i className="fas fa-search absolute top-2.5 right-3 text-gray-400"></i>
              </div>
              <div className="bell-icon flex items-center">
                <i className="fas fa-bell text-xl"></i>
              </div>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div className="main-card">
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Members */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">Total Members</h2>
                  <CircleUser className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {stats.totalMembers}
                </div>
                <p className="text-xs text-blue-600/80 mt-1">Active club members</p>
              </div>

              {/* Active Projects */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">Active Projects</h2>
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mt-2">
                  {stats.activeProjects}
                </div>
                <p className="text-xs text-purple-600/80 mt-1">Ongoing research projects</p>
              </div>

              {/* Completed Activities */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">Completed Activities</h2>
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                  {stats.completedActivities}
                </div>
                <p className="text-xs text-green-600/80 mt-1">
                  Successfully completed events
                </p>
              </div>

              {/* Upcoming Events */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium">Upcoming Events</h2>
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-3xl font-bold text-amber-600 mt-2">
                  {stats.upcomingEvents}
                </div>
                <p className="text-xs text-amber-600/80 mt-1">Events in the next 30 days</p>
              </div>
            </div>

            {/* Quick Overview */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Quick Overview</h2>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mt-6">
                <div>
                  <h3 className="font-semibold">Latest Achievements</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Successfully hosted Data Science Symposium</li>
                    <li>Reached 150+ active members milestone</li>
                    <li>Completed 5 research collaborations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Coming Up Next</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Machine Learning Workshop (Next Week)</li>
                    <li>Annual Project Showcase</li>
                    <li>New Member Orientation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminhome;
