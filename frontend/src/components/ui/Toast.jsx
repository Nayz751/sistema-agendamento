import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { colors } from "../../colors/colors";

export default function Toast({
  open,
  message,
  type = "success",
  onClose,
}) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{
          width: "100%",
          borderRadius: "12px",
          fontWeight: 500,
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}