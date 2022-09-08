import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import MoodIcon from "@mui/icons-material/Mood";
import { GREEN, RED, YELLOW } from "../constants/colors.js";
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
    headerAlign: "center",
    editable: false,
    sortable: false,
    renderCell: getStatus,
  },
  {
    field: "overallStatus",
    headerName: "Overall Status",
    description: "This column is not sortable.",
    sortable: false,
    headerAlign: "center",
    width: 150,
    renderCell: getStatus,
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
    <Box sx={{ height: 400, width: "100%" }}>
      <h1>{!data ? "Loading..." : "Kona x ORG ID"}</h1>
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
