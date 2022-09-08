import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { YELLOW, RED, GREEN } from "../constants/colors";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const getStatusMsg = (status) => {
  if (status === YELLOW) {
    return "Things are a little rocky.";
  } else if (status === RED) {
    return "Oh no, it looks like this team needs some help.";
  } else if (status === GREEN) {
    return "Yay! This team is doing great.";
  }
};

export const DialogBox = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const statusMsg = getStatusMsg(props.weeklyStatus);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        More Info
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth="true"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.teamId}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography>
            Manager: {props.managerId}
            {"    |    "}
            <a href={`mailto:${props.managerId}@kona.com`}>Contact</a>
          </Typography>
          <Typography
            gutterBottom
            color="primary"
            sx={{ fontStyle: "italic", marginTop: 2, marginBottom: 2 }}
          >
            {statusMsg}
          </Typography>
          <Typography gutterBottom>
            Here's what the team is saying this week:
          </Typography>
          <Typography gutterBottom>3</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
