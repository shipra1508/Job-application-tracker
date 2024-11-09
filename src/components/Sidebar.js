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
              <i className="fa-solid fa-circle-user"></i> Login
            </Link>
            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                  : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
              }
            >
              <i className="fa-solid fa-note-sticky"></i> Register
            </Link>
          </>
        )}
        {location.pathname !== "/register" &&
          location.pathname !== "/login" && (
            <>
              <Form className="d-flex w-100 mb-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="navbar-search padding-extra text-decoration-none navbar-link-color"
                  aria-label="Search"
                />
              </Form>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "w-100 mb-2 padding-extra text-decoration-none navbar-link-color-selected selected-navbar"
                    : "w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                }
              >
                <i class="fa-solid fa-house"></i> Dashboard
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
                  <i class="fa-solid fa-clipboard-list"></i> View Applied Jobs
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
                  <i className="fa-solid fa-plus"></i> Add Job
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
                  <i class="fa-solid fa-clipboard-list"></i> View Created Jobs
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
                    <i class="fa-solid fa-clipboard-check"></i> Application
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
                    <i class="fa-solid fa-calendar-check"></i> Schedules
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
                  <i class="fa-solid fa-users"></i> Manage Users
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
                <i class="fa-solid fa-address-card"></i> Profile
              </Link>
              <Link
                className="w-100 mb-2 padding-extra text-decoration-none navbar-link-color"
                onClick={logout}
              >
                <i class="fa-solid fa-sign-out"></i> Logout
              </Link>
            </>
          )}
      </Navbar>
    </>
  );
}

export default Sidebar;
