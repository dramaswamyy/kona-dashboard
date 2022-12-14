// load modules
import express from "express";
import csv from "csv-parser";
import fs from "fs";
import { createTeamObject, modifyTeamObject } from "./utils/csvUtils.js";

const app = express();
const PORT = 8000;

let db = new Map();
let isFileRead = false;
const getStream = () => {
  return fs.createReadStream("rygs.csv").pipe(csv());
};

const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (row) => {
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
    });
    stream.on("error", (err) => {
      reject(err);
    });
    stream.on("end", () => {
      let id = 1;
      for (const value of db.values()) {
        value.id = id;
        id++;
        chunks.push(value);
      }
      resolve(chunks);
    });
  });
};
/**
 * Parses file for team info once when the endpoint is called.
 */
app.get("/teamInfo", (req, res) => {
  const stream = getStream();
  streamToString(stream).then((teamInfoArr) => {
    const newArr = teamInfoArr;
    db = new Map();
    res.send(newArr);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
