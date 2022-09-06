import React from "react";

const styles = {
  header: {
    color: "red",
  },
};

export default function Button(props) {
  return (
    <>
      <h1 style={styles.header}>Hi!</h1>
      <button>{props.val}</button>
    </>
  );
}
