import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Avatar } from "@mui/material";
import { DialogBox } from "./DialogBox.js";
import dog from "../assets/dog.png";
import { StatusIcon } from "./StatusIcon.js";
import { COL_WIDTH } from "../constants/table.js";

/**
 * styles for component
 */
const styles = {
  container: {
    height: 400,
    width: "50%",
  },
  header: {
    display: "flex",
    flex: 1,
    height: 70,
    alignItems: "center",
  },
  roundImg: {
    maxWidth: "100%",
    maxHeight: "100%",
    marginRight: 2,
    marginBottom: 0,
  },
};

/**
 * Used to find the weekly or overall status columns for the table.
 * @param {} params
 * @returns appropriate icon to display
 */
const getStatus = (params) => {
  const color = params.value;
  return <StatusIcon color={color} />;
};

/**
 * Creates the dialog button that triggers the dialog and passes along the neccessary information
 */
const getDialogButton = (params) => {
  const row = params.row;
  const [teamId, managerId, weeklyStatus, elaboration] = [
    row.teamId,
    row.managerId,
    row.weeklyStatus,
    row.elaboration,
  ];
  return (
    <>
      <DialogBox
        teamId={teamId}
        managerId={managerId}
        weeklyStatus={weeklyStatus}
        elaboration={elaboration}
      />
    </>
  );
};

/** Columns of the table */
const columns = [
  { field: "teamId", headerName: "Team ID", width: COL_WIDTH },
  {
    field: "managerId",
    headerName: "Manager ID",
    width: COL_WIDTH,
    editable: false,
  },
  {
    field: "weeklyStatus",
    headerName: "Weekly Status",
    width: COL_WIDTH,
    editable: false,
    sortable: false,
    headerAlign: "center",
    renderCell: getStatus,
  },
  {
    field: "overallStatus",
    headerName: "Overall Status",
    description: "This column is not sortable.",
    sortable: false,
    headerAlign: "center",
    width: COL_WIDTH,
    renderCell: getStatus,
  },
  {
    field: "learnMore",
    headerName: "Report",
    description: "This column is not sortable.",
    sortable: false,
    width: COL_WIDTH,
    renderCell: getDialogButton,
  },
];

/** Main component */
export const TeamDataGrid = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch("/teamInfo");
      const teamInfoArr = await response.json();
      setRows(teamInfoArr);
    };
    fetchFunc();
  }, []);

  return (
    <Box sx={styles.container}>
      <div style={styles.header}>
        <Avatar alt="Example Alt" src={dog} sx={styles.roundImg} />
        <h1>{!rows ? "Loading..." : "Your Dashboard"}</h1>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[3]}
        disableSelectionOnClick
      />
    </Box>
  );
};
