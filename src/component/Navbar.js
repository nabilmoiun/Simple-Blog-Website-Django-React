import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../ContextApi";

const Navbar = () => {
  const context = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarID"
        aria-expanded="false"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarID">
        <ul className="navbar-nav m-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Jsonholder-Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user_posts" className="nav-link">
              User-Post
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create_post" className="nav-link">
              Create-Post
            </Link>
          </li>
          {context.isUserLoggedIn ? (
            <li className="nav-item">
              <Link to="" className="nav-link" onClick={() => context.logout()}>
                logout
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {!context.isUserLoggedIn ? (
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
