import * as React from "react";
import HelpIcon from "@mui/icons-material/Help";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ErrorIcon from "@mui/icons-material/Error";
import {
  GREEN,
  PASTEL_GREEN,
  PASTEL_RED,
  PASTEL_YELLOW,
  RED,
  YELLOW,
} from "../constants/colors.js";

const styles = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  greenIcon: {
    color: PASTEL_GREEN,
    backgroundColor: "black",
    borderRadius: "50%",
  },
  redIcon: {
    color: PASTEL_RED,
    backgroundColor: "black",
    borderRadius: "50%",
  },
  yellowIcon: {
    color: PASTEL_YELLOW,
    backgroundColor: "black",
    borderRadius: "50%",
  },
};

/**
 * Returns the correct emoji to use
 */
const getEmoji = (color) => {
  if (color === GREEN) {
    return <EmojiEmotionsIcon sx={styles.greenIcon} />;
  } else if (color === RED) {
    return <ErrorIcon sx={styles.redIcon} />;
  } else if (color === YELLOW) {
    return <HelpIcon sx={styles.yellowIcon} />;
  }
};

/**
 * Returns the status icon with styling applied
 */
export const StatusIcon = (props) => {
  return <div style={styles.container}>{getEmoji(props.color)}</div>;
};
