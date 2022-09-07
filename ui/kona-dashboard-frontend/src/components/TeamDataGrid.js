import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const getStatus = (params) => {
  return params.row.distribution * 5;
};

const columns = [
  { field: "teamId", headerName: "teamId", width: 90 },
  {
    field: "weeklyStatus",
    headerName: "weekly status",
    width: 150,
    editable: false,
  },
  {
    field: "managerId",
    headerName: "Manager ID",
    width: 110,
    editable: false,
  },
  //   {
  //     field: "button",
  //     headerName: "Button",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     renderCell: (params) => (
  //       <>
  //         <button>{params.value}</button>
  //       </>
  //     ),
  //   },
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
      <h1>{!data ? "Loading..." : data}</h1>
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
