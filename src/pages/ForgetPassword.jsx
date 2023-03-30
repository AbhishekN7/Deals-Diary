import React from "react";
import { useState } from "react";
import axios from "axios";

export default function ForgetPassword() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("abhisheknarkhede123@gmail.com");
  const handleForgetPassword = async (e) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/forgetpassword",
        { email }
      );
      console.log(data);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {show ? (
        <div>
          <h1>Please Visit your email to reset password</h1>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-3 offset-sm-4 d-flex my-5">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <button className="btn btn-warning" onClick={handleForgetPassword}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}
