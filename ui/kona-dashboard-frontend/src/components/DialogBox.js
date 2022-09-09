import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ElaborationList } from "./ElaborationList.js";
import { YELLOW, RED, GREEN, GRAY } from "../constants/colors";

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
            fontStyle: "bold",
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

/** gets status messages to send */
const getStatusMsg = (status) => {
  if (status === YELLOW) {
    return "Things are a little rocky.";
  } else if (status === RED) {
    return "Oh no, it looks like this team needs some help.";
  } else if (status === GREEN) {
    return "Yay! Looks like we have some wins to celebrate. ";
  }
};

/** main component */
export const DialogBox = (props) => {
  const [open, setOpen] = useState(false);

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
        Report
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
            color={GRAY}
            sx={{
              fontStyle: "italic",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            {statusMsg}
          </Typography>
          <ElaborationList elaboration={props.elaboration} />
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
