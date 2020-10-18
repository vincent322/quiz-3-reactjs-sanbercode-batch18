import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";

const getLocalStorage = () => {
  const session = sessionStorage.getItem("login");
  return !session ? false : true;
};

export const Context = createContext(getLocalStorage());

export const Provider = (props) => {
  const [login, setLogin] = useState(getLocalStorage());
  const history = useHistory();

  useEffect(() => {
    setLogin(getLocalStorage());
  }, [login]);

  return (
    <Context.Provider value={{ logins: [login, setLogin], history }}>
      {props.children}
    </Context.Provider>
  );
};