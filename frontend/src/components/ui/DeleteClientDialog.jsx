import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

export default function DeleteClientDialog({
  open,
  onClose,
  onConfirm,
  clientName,
}) {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onClose}
      aria-describedby="delete-client-dialog"

      PaperProps={{
        sx: {
          borderRadius: "58px",
          padding: "12px",
          background: "#ffe8fd",
          width: "100%",
          maxWidth: "520px",
        },
      }}
    >

      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: 700,
          color: "#4a2b33",
          paddingTop: "20px",
        }}
      >
        Excluir cliente
      </DialogTitle>

      <DialogContent>

        <DialogContentText
          id="delete-client-dialog"

          sx={{
            color: "#6d5c63",
            fontSize: "16px",
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          Você está prestes a remover{" "}
          <strong>{clientName}</strong> do
          sistema.
          <br />
          <br />
          Os agendamentos vinculados a este
          cliente também poderão ser removidos.
          Essa ação não poderá ser desfeita.

        </DialogContentText>

      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: "12px",
          paddingBottom: "20px",
        }}
      >

        <Button
          onClick={onClose}

          sx={{
            color: "#8c6b75",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "999px",
            padding: "10px 22px",
          }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onConfirm}

          sx={{
            background: "#e7a4df",
            borderRadius: "999px",
            padding: "12px 26px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",

            "&:hover": {
              background: "#e7a4df",
              boxShadow: "none",
            },
          }}
        >
          Excluir cliente
        </Button>

      </DialogActions>

    </Dialog>
  );
}