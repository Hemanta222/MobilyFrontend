import React from "react";
const UserContext = React.createContext({
  isLogin: false,
  alertCode: "",
  alertMessage: "",
  isAlertOpen: false,
  alertSeverity: "",
  doLogin: () => {},
  doLogout: () => {},
  alertOpenHandler: () => {},
  alertCloseHandler: () => {},
  alertSeverityHandler: (severity) => {},
  alertCodeHandler: (code) => {},
  alertMessageHandler: (code) => {},
});

export default UserContext;
