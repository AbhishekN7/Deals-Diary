import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutAction } from "../toolkit/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { logoutAction } from "../redux/actions/authAction";

export default function Navbar() {
  const { login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutFunc = () => {
    dispatch(logoutAction());
    // alert("Successfully Logged Out");
    toast.success("Successfully Logged Out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/login");
  };
  return (
    <div>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            <div className="d-flex">
              <h2>Deals Diary</h2>
              {/* <p></p> */}
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/category">
                Category
              </NavLink>

              {login && login.name && (
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                  >
                    {login.name}
                  </button>
                  <ul className="dropdown-menu">
                    <Link className="nav-link" to="/account">
                      Account
                    </Link>
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link className="nav-link" to="/createad">
                      Create Ad
                    </Link>
                    <button className="dropdown-item" onClick={logoutFunc}>
                      Logout
                    </button>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
