import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import UserContext from "../Context";
//severity = [error,success,info,warning]
const DescriptionAlerts = () => {
  const {
    isAlertOpen,
    alertMessage,
    alertCode,
    alertSeverity,
    alertCloseHandler,
  } = React.useContext(UserContext);
  return (
    <Snackbar
      open={isAlertOpen}
      autoHideDuration={6000}
      onClose={alertCloseHandler}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
    >
      <Alert
        severity={alertSeverity}
        onClose={alertCloseHandler}
        variant="filled"
      >
        <AlertTitle>{alertCode}</AlertTitle>
        <strong>{alertMessage}</strong>
      </Alert>
    </Snackbar>
  );
};

export default DescriptionAlerts;
