import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      axios
        .get(`${API_URL}/validate-token`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((response) => {
          setAuth((prevState) => ({
            ...prevState,
            user: response.data.user,
          }));
        })
        .catch(() => {
          localStorage.removeItem("token");
          setAuth({ token: null, user: null });
        });
    }
  }, [auth.token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setAuth({ token: response.data.token, user: response.data.user });
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
