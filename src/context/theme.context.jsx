import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState("");

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/validate-token`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((response) => {
          setAuth((prevState) => ({
            ...prevState,
            user: response.data.user,
          }));
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
          setAuth({ token: null, user: null });
        });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.authToken);
      setAuth({ token: response.data.authToken, user: response.data.user });
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

const useAuth = () => useContext(AuthContext); //create a custom hook to use AuthContext

export { AuthContext, AuthProvider, useAuth };
