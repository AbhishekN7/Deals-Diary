import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../store/actions/authAction";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { googleLoginUser, loginUser } from "../toolkit/authSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Login() {
  const { login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "john@gmail.com",
      password: "123",
    },
    validationSchema: yup.object({
      email: yup.string().required("Please Enter Email"),
      password: yup.string().required("Please Enter Valid Email"),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
    },
  });

  useEffect(
    (e) => {
      if (login && login.name) {
        toast.success("Successfully Logged In!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        login.admin ? navigate("/dashboard") : navigate("/account");
      }
    },
    [login]
  );

  const responseGoogleSuccess = async (res) => {
    console.log(res);
    dispatch(
      googleLoginUser({
        token: res.tokenId,
      })
    );
    // const { data } = await axios.post("http://localhost:5000/api/auth/google");
    // console.log(data);
    navigate("/account");
  };

  const responseGoogleFail = () => {};
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "825721989246-ukpi8unbvp43vkisfs5quj65ntcr3tvn.apps.googleusercontent.com",
        scope: "",
      });
    });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(formik.errors, null, 0)}</pre>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header p-3 text-center text-light bg-dark">
                <strong>Login</strong>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="card-body">
                  <div>
                    <label for="email" className="form-label">
                      <strong>First Email</strong>
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.email && formik.touched.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="email"
                      placeholder="Enter Your Email"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      <strong>{formik.errors.email}</strong>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label for="password" className="form-label">
                      <strong>Password</strong>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.password && formik.touched.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="password"
                      placeholder="Enter Your Password"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      <strong>{formik.errors.password}</strong>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-light text-dark w-100 mt-3"
                  >
                    <strong>Login</strong>
                  </button>
                  <div className="w-100">
                    <GoogleLogin
                      clientId="825721989246-ukpi8unbvp43vkisfs5quj65ntcr3tvn.apps.googleusercontent.com"
                      buttonText="Continue with google"
                      onSuccess={responseGoogleSuccess}
                      onFailure={responseGoogleFail}
                      cookiePolicy={"single_host_origin"}
                      className="w-50 m-auto my-3 d-flex justify-content-center"
                    />
                  </div>
                  <p className="text-center mt-3">
                    <strong>Dont Have Account?</strong>{" "}
                    <Link to="/register">Create Account</Link>
                  </p>
                  <p className="text-center mt-3">
                    <Link to="/forget-password">Forget Password?</Link>
                    {/* <strong onClick={navigate("")}></strong>{" "} */}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
}
