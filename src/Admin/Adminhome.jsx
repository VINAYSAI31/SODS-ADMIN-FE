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
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        const [membersResponse, projectsResponse, activitiesResponse] =
          await Promise.all([
            axios.get("http://localhost:9092/api/member/getallmembers"),
            axios.get("http://localhost:9092/api/project/getallprojects"),
            axios.get("http://localhost:9092/api/activity/getactivities"),
          ]);

        const members = membersResponse.data;
        const projects = projectsResponse.data;
        const activities = activitiesResponse.data;

        // Calculate the stats based on the API responses
        const totalMembers = members.length;
        const activeProjects = projects.filter(
          (project) => project.status === "In Progress"
        ).length;
        const completedActivities = activities.filter.length;
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

      {/* Main Content */}
      <div className="main-content">
        <div className="card-container">
          {/* Top Card */}
          <div className="top-card ">
            <h1>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back, Admin!</h1>
              <p className="text-lg text-muted-foreground mt-4">
              Here's what's happening in the Data Science Club
            </p>
            </h1>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Members */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100  p-6 rounded-lg">
                <div className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-sm font-medium">Total Members</h2>
                  <CircleUser className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalMembers}
                </div>
                <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
                  Active club members
                </p>
              </div>

              {/* Active Projects */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100  p-6 rounded-lg">
                <div className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-sm font-medium">Active Projects</h2>
                  <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.activeProjects}
                </div>
                <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
                  Ongoing research projects
                </p>
              </div>

              {/* Completed Activities */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-sm font-medium">Completed Activities</h2>
                  <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.completedActivities}
                </div>
                <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
                  Successfully completed events
                </p>
              </div>

              {/* Upcoming Events */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg">
                <div className="flex flex-row items-center justify-between pb-2">
                  <h2 className="text-sm font-medium">Upcoming Events</h2>
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.upcomingEvents}
                </div>
                <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
                  Events in the next 30 days
                </p>
              </div>
            </div>

            {/* Quick Overview */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-200 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Quick Overview</h2>
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Latest Achievements</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Successfully hosted Data Science Symposium
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Reached 150+ active members milestone
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Completed 5 research collaborations
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Coming Up Next</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      Machine Learning Workshop (Next Week)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      Annual Project Showcase
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      New Member Orientation
                    </li>
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
