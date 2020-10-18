import React, { useState, useContext } from "react";
import { Context } from "../utility/context";

const Login = () => {
  const [objectData, setObjectData] = useState({ username: "", password: "" });
  const { logins, history } = useContext(Context);
  const [, setLogin] = logins;
  const [error, setError] = useState({ username: null, password: null });
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    setObjectData({ ...objectData, [name]: e.target.value });
  };

  const handleValidation = () => {
    let errors = {};
    let valid = true;
    if (!objectData.username) {
      errors.title = "Username is required";
      valid = false;
    }

    if (!objectData.password) {
      errors.description = "Password is required";
      valid = false;
    }

    setError({ ...error, errors });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = handleValidation();
    if (valid) {
      if (objectData.username === "admin" && objectData.password === "admin") {
        sessionStorage.setItem("login", true);
        setLogin(true);
        history.push("/");
      } else {
        setResponse("Username atau Password salah");
      }
    }
  };

  return (
    <div className="sections" style={{ width: "50%" }}>
      <h1 className="text-center title">LOGIN</h1>
      <div className="container">
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-12 flex flex-column">
              <label className="label" htmlFor="username">
                Username
              </label>
              <input
                className={`form-control mt-3${
                  error.username ? " errors" : ""
                }`}
                type="text"
                name="username"
                id="username"
                required
                value={objectData.username}
                onChange={handleChange}
              />
              {error.username && <span>{error.username}</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-12 label">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className={`form-control mt-3${error.genre ? " errors" : ""}`}
                type="password"
                name="password"
                id="password"
                required
                value={objectData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <input className="btn btn-success" type="submit" value="Login" />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <h4>{response}</h4>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;