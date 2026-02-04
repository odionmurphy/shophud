import { Outlet, Link } from "react-router-dom";
import "./HomeLayout.css";

export const HomeLayout = () => {
  return (
    <div>
      <nav className="home-nav">
        <Link to={"/register"}>Register</Link>
        <Link to={"/login"}>Login</Link>
      </nav>
      <Outlet />
    </div>
  );
};
