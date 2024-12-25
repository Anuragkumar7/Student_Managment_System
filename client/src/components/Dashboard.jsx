import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./style.css"; // Import custom CSS for hover effects
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/auth/logout").then((result) => {
      console.log(result.data);
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      } else {
        alert("Error while logging out");
      }
    });
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-4 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">
                C-DAC Managment System
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
              <li className="w-100 nav-item custom-hover">
                <Link
                  to="/dashboard"
                  className="nav-link align-middle px-0 text-white"
                >
                  <i className="bi bi-speedometer2 ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100 custom-hover">
                <Link
                  to="/dashboard/student"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi bi-people ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Student
                  </span>
                </Link>
              </li>
              <li className="w-100 custom-hover">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi bi-grid ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100 custom-hover">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi bi-person ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100 custom-hover" onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="bi bi-power ms-2"></i>
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Student Managment System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
