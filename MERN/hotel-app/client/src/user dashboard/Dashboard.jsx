import React from "react";
import { Link } from "react-router-dom";

// component
import DashboardNavBar from "../components/DashboardNavBar";

import ConnectNavBar from "../components/ConnectNavBar";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid bg-secondary text-white text-center p-5">
        <ConnectNavBar />
      </div>

      <div className="container-fluid p-4">
        <DashboardNavBar />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-10">
            <h1>Your Bookings</h1>
          </div>

          <div className="col col-md-2">
            <Link className="btn btn-primary" to="/ ">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
