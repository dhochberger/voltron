import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import userApi from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    me();
  }, [])

  const me = () => {
    if(localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      if(user && user.jwtToken) {
        whoami(user.jwtToken)
        .then(res => {
          setUser(res.data.data);
          setUserLoading(false);
        })
        .catch(err => {
          console.log(err);
          setUserLoading(false);
        });
      }
      else setUserLoading(false);
    } else setUserLoading(false);
  }

  const whoami = (access_token) => {
    return userApi.whoami(access_token)
  }

  const signin = (email, password) => {
    return userApi.signin(email, password)
      .then((res) => {
          window.localStorage.setItem("user", JSON.stringify(res.data.data));
          me();
          history.push("/");
      })
  };

  const signup = (email, username, password, firstname, lastame) => {
    return userApi.signup({email, username, password, firstname, lastame})
      .then((res) => {
          history.push("/signin");
      })
  };

  const signout = () => {
    setUser();
    window.localStorage.removeItem("user");
  };


  return (
    <AuthContext.Provider
      value={{ user, userLoading, whoami, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
