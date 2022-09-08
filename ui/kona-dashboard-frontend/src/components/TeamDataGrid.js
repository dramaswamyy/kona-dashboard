import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box } from "@mui/material";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import MoodIcon from "@mui/icons-material/Mood";
import { GREEN, RED, YELLOW } from "../constants/colors.js";
import { DialogBox } from "./DialogBox.js";

const getStatus = (params) => {
  const val = params.value;
  if (val === GREEN) {
    return <MoodIcon color="primary" />;
  } else if (val === YELLOW) {
    return <SentimentNeutralIcon color="secondary" />;
  } else if (val === RED) {
    return <MoodBadIcon color="tertiary" />;
  } else {
    return (
      <>
        <p>something went wrong.</p>
      </>
    );
  }
};

const getDialogButton = (params) => {
  const teamId = params.row.teamId;
  const managerId = params.row.managerId;
  const weeklyStatus = params.row.weeklyStatus;
  const elaboration = params.row.elaboration;
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

const columns = [
  { field: "teamId", headerName: "Team ID", width: 150 },
  {
    field: "managerId",
    headerName: "Manager ID",
    width: 150,
    editable: false,
  },
  {
    field: "weeklyStatus",
    headerName: "Weekly Status",
    width: 150,
    editable: false,
    sortable: false,
    renderCell: getStatus,
  },
  {
    field: "overallStatus",
    headerName: "Overall Status",
    description: "This column is not sortable.",
    sortable: false,
    width: 150,
    renderCell: getStatus,
  },
  {
    field: "learnMore",
    headerName: "Report",
    description: "This column is not sortable.",
    sortable: false,
    width: 150,
    renderCell: getDialogButton,
  },
];

export const TeamDataGrid = () => {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch("/api");
      const teamInfoArr = await response.json();
      setData(teamInfoArr.length);
      setRows(teamInfoArr);
    };
    fetchFunc();
  }, [rows]);

  return (
    <Box sx={{ height: 400, width: "60%" }}>
      <h1>{!data ? "Loading..." : "Welcome Kona x ORG ID!"}</h1>
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
