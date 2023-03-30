import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { registerUser } from "../toolkit/authSlice";
export default function Register() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "john",
      email: "john@gmail.com",
      password: "123",
      cpassword: "123",
    },

    validationSchema: yup.object({
      name: yup.string().required("Please Enter Your Name"),

      email: yup.string().required("Please Enter Your Email"),

      password: yup.string().required("Please Enter Your Password"),

      cpassword: yup
        .string()
        .required("Please Enter Your Cpassword")
        .oneOf([yup.ref("password"), "Password Not Match"]),
    }),

    onSubmit: (values) => {
      dispatch(registerUser(values));
      console.log(values);
    },
  });

  const navigate = useNavigate();
  // const { login } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (login && login.name) {
  //     navigate("/account");
  //   }
  // }, [login]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header p-3 text-center text-light bg-dark">
                <strong>Register</strong>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="card-body">
                  <div>
                    <label for="name" className="form-label">
                      <strong>First name</strong>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.name && formik.touched.name
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="name"
                      placeholder="Enter your name"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      <strong>{formik.errors.name}</strong>
                    </div>
                  </div>
                  <div className="mt-2">
                    <label for="email" className="form-label">
                      <strong>Email</strong>
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
                  <div className="mt-2">
                    <label for="cpassword" className="form-label">
                      <strong>Confirm Password</strong>
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      value={formik.values.cpassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.cpassword && formik.touched.cpassword
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="cpassword"
                      placeholder="Confirm Your Password"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      <strong>{formik.errors.cpassword}</strong>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-light text-dark w-100 mt-3"
                  >
                    <strong>Signup</strong>
                  </button>
                  <p className="text-center mt-3">
                    <strong>Already Have Account?</strong>{" "}
                    <Link to="/login">Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
