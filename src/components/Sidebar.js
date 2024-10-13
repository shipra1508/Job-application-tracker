import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation } from "react-router-dom"; // Import Link for client-side routing

function Sidebar() {
  const location = useLocation();

  return (
    <>
      <Navbar className="d-flex flex-column h-100 bg-primary-color px-4 py-5 text-start position-fixed">
        <Offcanvas.Title
          id={`offcanvasNavbarLabel-expand-false`}
          className="w-100 pb-3"
        >
          <div className="d-flex w-100 mb-5">
            <div className="circle circle1 m-1"></div>
            <div className="circle circle2 m-1"></div>
            <div className="circle circle3 m-1"></div>
          </div>
          Job Portal
        </Offcanvas.Title>
        <Form className="d-flex w-100 mb-3">
          <Form.Control
            type="search"
            placeholder="Search"
            className="navbar-search padding-extra  text-decoration-none"
            aria-label="Search"
          />
        </Form>
        {(location.pathname === "/login" ||
          location.pathname === "/register") && (
          <>
            <Link
              to="/login"
              className={
                location.pathname === "/login"
                  ? "w-100 mb-3 padding-extra text-decoration-none selected-navbar"
                  : "w-100 mb-3 padding-extra text-decoration-none"
              }
            >
              <i className="fa-solid fa-circle-user"></i> Login
            </Link>
            <Link
              to="/register"
              className={
                location.pathname === "/register"
                  ? "w-100 mb-3 padding-extra text-decoration-none selected-navbar"
                  : "w-100 mb-3 padding-extra text-decoration-none"
              }
            >
              <i className="fa-solid fa-note-sticky"></i> Register
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
                    ? "w-100 mb-3 padding-extra text-decoration-none selected-navbar"
                    : "w-100 mb-3 padding-extra text-decoration-none"
                }
              >
                <i class="fa-solid fa-house"></i> Dashboard
              </Link>
              <Link
                to="/applied-jobs"
                className={
                  location.pathname === "/applied-jobs"
                    ? "w-100 mb-3 padding-extra text-decoration-none selected-navbar"
                    : "w-100 mb-3 padding-extra text-decoration-none"
                }
              >
                <i class="fa-solid fa-clipboard-list"></i> View Applied Jobs
              </Link>
              <Link
                to="/instructions"
                className={
                  location.pathname === "/instructions"
                    ? "w-100 mb-3 padding-extra text-decoration-none selected-navbar"
                    : "w-100 mb-3 padding-extra text-decoration-none"
                }
              >
                <i class="fa-solid fa-clipboard-check"></i> Application
                Instructions
              </Link>
              <Link
                to="/profile"
                className={
                  location.pathname === "/profile"
                    ? "w-100 mb-3 padding-extra text-decoration-none selected-navbar"
                    : "w-100 mb-3 padding-extra text-decoration-none"
                }
              >
                <i class="fa-solid fa-address-card"></i> Profile
              </Link>
            </>
          )}
      </Navbar>
    </>
  );
}

export default Sidebar;
