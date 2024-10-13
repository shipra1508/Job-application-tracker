import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useLocation } from "react-router-dom";

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
            className="navbar-search padding-extra"
            aria-label="Search"
          />
        </Form>
        {location.pathname === "/login" && (
          <>
            <Nav.Link
              className="w-100 mb-3 selected-navbar padding-extra"
              href="/login"
            >
              <i class="fa-solid fa-circle-user"></i> Login
            </Nav.Link>
            <Nav.Link className="w-100 mb-3 padding-extra" href="/register">
              <i class="fa-solid fa-note-sticky"></i> Register
            </Nav.Link>
          </>
        )}
        {location.pathname === "/register" && (
          <>
            <Nav.Link className="w-100 mb-3 padding-extra" href="/login">
              Login
            </Nav.Link>
            <Nav.Link
              className="w-100 mb-3 selected-navbar padding-extra"
              href="/register"
            >
              <i class="fa-solid fa-note-sticky"></i> Register
            </Nav.Link>
          </>
        )}
        {location.pathname !== "/register" &&
          location.pathname !== "/login" && (
            <>
              <Nav.Link className="w-100 mb-3 padding-extra" href="/">
                Dashboard
              </Nav.Link>
              <Nav.Link className="w-100 mb-3 padding-extra" href="/">
                View Applied Jobs
              </Nav.Link>
              <Nav.Link className="w-100 mb-3 padding-extra" href="/">
                Application Instructions
              </Nav.Link>
              <Nav.Link className="w-100 mb-3 padding-extra" href="/">
                Profile
              </Nav.Link>
            </>
          )}
      </Navbar>
    </>
  );
}

export default Sidebar;
