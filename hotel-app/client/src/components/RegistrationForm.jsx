import React from "react";

const RegistrationForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="form-control mb-3">
          <label className="form-label">Enter Your Name</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-control mb-3">
          <label className="form-label">Enter Your Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control mb-3">
          <label className="form-label">Enter Your Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={!name || !email || !password}
          className="btn btn-primary"
          type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
