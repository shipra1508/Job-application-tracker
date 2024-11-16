import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation } from "react-router-dom"; // Import Link for client-side routing

function Sidebar({ user, setUser }) {
  const location = useLocation();

  const logout = () => {
    setUser({});
    localStorage.removeItem("job-application-tracker");
  };

  return (
    <>
      <Navbar className="d-flex flex-column h-100 bg-primary-color px-4 py-5 text-start position-fixed sidebar">
        <Offcanvas.Title
          id={`offcanvasNavbarLabel-expand-false`}
          className="w-100 pb-3"
        >
          Job Portal
        </Offcanvas.Title>
        {(location.pathname === "/login" ||
          location.pathname === "/register") && (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                  : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
              }
            >
              <em className="fa-solid fa-circle-user"></em> Login
            </Link>
            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                  : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
              }
            >
              <em className="fa-solid fa-note-sticky"></em> Register
            </Link>
          </>
        )}
        {location.pathname !== "/register" &&
          location.pathname !== "/login" && (
            <>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                    : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                }
              >
                <em class="fa-solid fa-house"></em> Dashboard
              </Link>
              {user.role === "user" && (
                <Link
                  to="/applied-jobs"
                  className={
                    location.pathname === "/applied-jobs"
                      ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                      : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                  }
                >
                  <em class="fa-solid fa-clipboard-list"></em> View Applied Jobs
                </Link>
              )}
              {user.role === "company" && (
                <Link
                  to="/add-job"
                  className={
                    location.pathname === "/add-job"
                      ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                      : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                  }
                >
                  <em className="fa-solid fa-plus"></em> Add Job
                </Link>
              )}
              {user.role === "company" && (
                <Link
                  to="/created-jobs"
                  className={
                    location.pathname === "/created-jobs"
                      ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                      : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                  }
                >
                  <em class="fa-solid fa-clipboard-list"></em> View Created Jobs
                </Link>
              )}
              {(user.role === "user" || user.role === "company") && (
                <>
                  <Link
                    to="/instructions"
                    className={
                      location.pathname === "/instructions"
                        ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                        : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                    }
                  >
                    <em class="fa-solid fa-clipboard-check"></em> Application
                    Instructions
                  </Link>

                  <Link
                    to="/view-schedule"
                    className={
                      location.pathname === "/view-schedule"
                        ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                        : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                    }
                  >
                    <em class="fa-solid fa-calendar-check"></em> Schedules
                  </Link>
                </>
              )}
              {user.role === "admin" && (
                <Link
                  to="/manage-users"
                  className={
                    location.pathname === "/manage-users"
                      ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                      : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                  }
                >
                  <em class="fa-solid fa-users"></em> Manage Users
                </Link>
              )}
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                    : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                }
              >
                <em class="fa-solid fa-address-card"></em> Profile
              </Link>
              <Link
                className="w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                onClick={logout}
              >
                <em class="fa-solid fa-sign-out"></em> Logout
              </Link>
            </>
          )}
      </Navbar>
    </>
  );
}

export default Sidebar;
