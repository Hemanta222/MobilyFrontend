import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Card from "@mui/material/Card";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
//user import
import Helmet from "../../Shared/Page/Helmet";
import UserContext from "../../Shared/Context";
import { handleSignup } from "../../Global/userSlice";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {
    isLogin,
    doLogin,
    alertOpenHandler,
    alertSeverityHandler,
    alertCodeHandler,
    alertMessageHandler,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const inputHandler = (event) => {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };
  const formHandler = (event) => {
    event.preventDefault();
    if (email && password) {
      dispatch(handleSignup({ email, password }))
        .then(unwrapResult)
        .then((data) => {
          alertSeverityHandler("success");
          alertCodeHandler("success");
          alertMessageHandler(data.message);
          alertOpenHandler();
          doLogin();
          navigate("/");
        })
        .catch((err) => {
          alertSeverityHandler("error");
          alertCodeHandler("Error");
          alertMessageHandler(err.message);
          alertOpenHandler();
        });
    }
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Helmet title="Mobilylive|signup">
        <Container maxWidth="sm" style={{ transform: 'translateY("50px")' }}>
          <Card style={{ padding: "16px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  required
                  fullWidth
                  autoFocus
                  name="email"
                  value={email}
                  onChange={inputHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={inputHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={formHandler}>
                  Sign up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                  Already have account!{" "}
                  <Button href="/login" color="secondary">
                    Login
                  </Button>
                </Typography>{" "}
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Helmet>
    </React.Fragment>
  );
};

export default index;
