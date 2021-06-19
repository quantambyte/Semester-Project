import React, { useState } from "react";

// toast
import { toast } from "react-toastify";

// component importing
import RegistrationForm from "../components/RegistrationForm";

// actions
import { registerUser } from "../actions/auth";

// rafce
const SignUp = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // submission of sign up form
  const handleSubmit = async (e) => {
    // as default behaviour of button is reloading the page we need to prevent it
    e.preventDefault();

    try {
      let user = await registerUser({
        name,
        email,
        password,
      });

      console.log(user);

      toast.success("You are Signed Up! :D");

      // directing to login page
      history.push("/login");
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center text-white">
        <h1>Sign Up</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col col-md-6 offset-md-3">
            <RegistrationForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
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

export default SignUp;
