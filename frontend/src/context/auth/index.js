import React from "react";
import { createContext } from "react";
import axios from "axios";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = React.useState(false);
  const [userInformation, setUserInformation] = React.useState(null);

  const getTokenLocalStorage = () => {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    if (token) {
      return token;
    } else {
      return false;
    }
  };

  const ExitUser = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUserInformation(null);
  };

  const verifyUser = async () => {
    const token = getTokenLocalStorage();
    if (token) {
      const verifiedUser = await axios.post(
        "http://localhost:8000/user/verify",
        { token }
      );
      if (verifiedUser.status === 200) {
        setIsLogged(true);
      } else {
        localStorage.removeItem("token");
        setIsLogged(false);
      }
    }
  };

  const getUserInfo = async () => {
    const token = getTokenLocalStorage();
    if (token) {
      const userInfo = await axios.post("http://localhost:8000/user/get-user", {
        token,
      });
      console.log(token);

      if (userInfo.status === 200) {
        return userInfo.data.USER_OBJ;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    verifyUser();
  }, []);

  React.useEffect(() => {
    verifyUser();
  }, [isLogged]);

  const getInfoDB = async () => {
    if (isLogged) {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserInformation(userInfo);
      }
      console.log(userInfo);
    }
  };
  React.useEffect(() => {
    getInfoDB();
  }, [isLogged]);

  const bag = {
    isLogged,
    setIsLogged,
    getUserInfo,
    userInformation,
    ExitUser,
  };

  return <AuthContext.Provider value={bag}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
