import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/app/profile");
  };

  const goToLogin = () => {
    navigate("/app/login");
  };

  const goToRegister = () => {
    navigate("/app/register");
  };

  const goToSearch = () => {
    navigate("/app/search");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          GiftLink
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Task 1: Add links to Home and Gifts */}
            <li className="nav-item">
              <a className="nav-link" href="/home.html">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/app">
                Gifts
              </a>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={goToSearch}>
                Search
              </button>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={goToProfile}
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={goToLogin}>
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={goToRegister}
                  >
                    Register
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
