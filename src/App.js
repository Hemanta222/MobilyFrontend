import React, { useState, useCallback } from "react";
import Container from "@mui/material/Container";
import { Routes, Route  } from "react-router-dom";
import axios from "axios";
//user imports
import Home from "./Component/Home";
import Login from "./Component/Account/Login";
import SignUp from "./Component/Account/SignUp";
import UserContext from "./Component/Shared/Context";
import DisplayAlert from "./Component/Shared/Alert";
import { Button, Typography } from "@mui/material";
const URL = "http://localhost:8080/check-auth";
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertCode, setAlertCode] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [isLoading, setIsLoading] = useState(true);

  const doLogin = useCallback(() => {
    setIsLogin(true);
  });

  const doLogout = useCallback(() => {
    setIsLogin(false);
  });
  const alertOpenHandler = useCallback(() => {
    setIsAlertOpen(true);
  }, []);
  const alertCloseHandler = useCallback(() => {
    setIsAlertOpen(false);
  }, []);
  const alertSeverityHandler = useCallback((severity) => {
    setAlertSeverity(severity);
  }, []);
  const alertCodeHandler = useCallback((code) => {
    setAlertCode(code);
  }, []);
  const alertMessageHandler = useCallback((msg) => {
    setAlertMessage(msg);
  }, []);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: URL,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        setIsLoading(false);
        setIsLogin(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLogin(false);
      });
  }, []);
  return (
    <UserContext.Provider
      value={{
        isLogin,
        alertCode,
        isAlertOpen,
        alertMessage,
        alertSeverity,
        doLogin,
        doLogout,
        alertOpenHandler,
        alertCloseHandler,
        alertSeverityHandler,
        alertCodeHandler,
        alertMessageHandler,
      }}
    >
      <Container component="main" maxWidth="lg">
        {isLoading && <h1 className="center top">Loading</h1>}
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          className="center top"
        >
          Mobilly Invite <br />
          {isLogin ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                doLogout();
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              {" "}
              <Button href="/login" color="secondary" variant="contained">
                Login
              </Button>
              &nbsp;&nbsp;
              <Button href="/signup" color="primary" variant="contained">
                signup
              </Button>
            </>
          )}
        </Typography>
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          {!isLogin && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}

          <Route path="*" element={<Home />} />
        </Routes>
        <DisplayAlert />
      </Container>
    </UserContext.Provider>
  );
};

export default App;
