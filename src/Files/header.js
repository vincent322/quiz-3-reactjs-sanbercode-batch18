import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../utility/context";
import logo from "../tools/img/logo.png";

const Header = () => {
  const { logins } = useContext(Context);
  const [login, setLogin] = logins;

  const handleLogout = () => {
    setLogin(false);
    sessionStorage.clear()
  };
  return (
    <header className="navbar">
      <img id="logo" className="navbar-brand" alt="logo" src={logo} width="150px" />
      <nav className="navbar-right">
        <ul>
          <button className="button">
            <Link to="/">Home</Link>
          </button>
          <button className="button">
            <Link to="about">About</Link>
          </button>
          {login ? (
            <>
              <button className="button">
                <Link to="movie">Movie List Editor</Link>
              </button>
              <button className="button">
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </button>
            </>
          ) : (
            <button className="button">
              <Link to="login">Login</Link>
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;