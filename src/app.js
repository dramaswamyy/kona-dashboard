// load modules
import express from "express";
import csv from "csv-parser";
import fs from "fs";
import { createTeamObject, modifyTeamObject } from "./utils/csvUtils.js";

const app = express();
const PORT = 3000;

const db = new Map();

/**
 * Go through CSV data and parse out useful information for dashboard.
 */
fs.createReadStream("rygs.csv")
  .pipe(csv())
  .on("data", (row) => {
    // parse data
    const teamId = row.SlackTeamId;
    if (db.get(teamId) != null) {
      const teamInfo = db.get(teamId);
      modifyTeamObject(row, teamInfo);
      db.set(teamId, teamInfo);
    } else {
      const teamInfo = createTeamObject(row);
      db.set(teamId, teamInfo);
    }
  })
  .on("end", () => {
    // when parsed, send a success message
    for (const user of db.values()) {
      console.log(user);
    }
    // displays all data for each team
    console.log("CSV file successfully processed");
  });

app.get("/api", (req, res) => {
  res.send("Hello from server!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
