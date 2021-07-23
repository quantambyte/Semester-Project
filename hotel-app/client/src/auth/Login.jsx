import React, { useState } from "react";

// toast
import { toast } from "react-toastify";

// component
import LoginForm from "../components/LoginForm";

// action
import { login } from "../actions/auth";

// useDispatch to update the state
import { useDispatch } from "react-redux";

// rafce
const Login = ({ history }) => {
  // hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // submission of login form

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SEND LOGIN DATA", { email, password });

    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log("DATA RECEIVED");

        // save user to local storage and redux store
        // local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        // redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });

        toast.success("You are Logged In :D");
        // redirect to home
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);

      if (err.response.status === 400) {
        toast.error(err.response.data);
      }
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary text-white p-5 text-center">
        <h1>Log In</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
