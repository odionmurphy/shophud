import { Link, Outlet, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const logout = () => {
    // clear all the data in context
    // move back to login page
    navigate("/login");
  };

  return (
    <div>
      <nav className="dashboard-nav">
        <Link to={"/dashboard/profile"}>Profile</Link>
        <button onClick={logout}>logout</button>
      </nav>
      <Outlet />
    </div>
  );
};
