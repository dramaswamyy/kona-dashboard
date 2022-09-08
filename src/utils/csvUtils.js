import { GREEN, RED, YELLOW } from "../constants/colors.js";

const RED_SELECTION_IDX = 0;
const YELL_SELECTION_IDX = 1;
const GREEN_SELECTION_IDX = 2;
const END_DATE = 1647507600; // March 17 2022 9am GMT
const START_DATE = 1646902800; // March 10 2022 9am GMT

export const createTeamObject = (row) => {
  const managerId = row.SlackTeamId.split("&")[0];
  const elaborationArr = setElaboration([], row.Elaboration);

  const rygOverallSelectionArr = setSelection(row.Selection, [0, 0, 0]);
  const overallStatus = setStatus(rygOverallSelectionArr);

  let rygWeeklySelectionArr = [0, 0, 0];
  let weeklyStatus = "no data this week :(";
  if (checkSelectionTimeValid(row.Timestamp)) {
    rygWeeklySelectionArr = setSelection(row.Selection, [0, 0, 0]);
    weeklyStatus = setStatus(rygWeeklySelectionArr);
  }

  return {
    teamId: row.SlackTeamId,
    managerId: managerId,
    elaboration: elaborationArr,
    rygOverallSelection: rygOverallSelectionArr,
    rygWeeklySelection: rygWeeklySelectionArr,
    weeklyStatus: weeklyStatus,
    overallStatus: overallStatus,
  };
};

/**
 * Modifies an existing team with the new elaboration/selection info
 * @param {} row one row of csv file
 * @param {*} teamInfo info already existing in team object
 * @returns newly modified team info
 */
export const modifyTeamObject = (row, teamInfo) => {
  setElaboration(teamInfo.elaboration, row.Elaboration);
  const selectionArr = setSelection(
    row.Selection,
    teamInfo.rygOverallSelection
  );
  teamInfo.overallStatus = setStatus(selectionArr);

  if (checkSelectionTimeValid(row.Timestamp)) {
    const selectionArr = setSelection(
      row.Selection,
      teamInfo.rygWeeklySelection
    );
    teamInfo.weeklyStatus = setStatus(selectionArr);
    // console.log(teamInfo);
  }
  return teamInfo;
};

/**
 * If in a team of 10 people: 3 will need to vote red/yellow to return GREEN as overall status of team,
 * 5 will need to vote red/yellow to return green, 4 will need to vote red/yellow to return yellow
 */
const setStatus = (selectionArr) => {
  if (selectionArr) {
    const red = selectionArr[0];
    const yellow = selectionArr[1];
    const green = selectionArr[2];
    const total = red + yellow + green;
    if (red + yellow <= total * 0.3) {
      return GREEN;
    } else if (red + yellow >= total * 0.5) {
      return RED;
    } else {
      return YELLOW;
    }
  } else {
    console.log("selectionArr doesn't exist", selectionArr);
    return 0;
  }
};

/** Sets the elaboration values for the team object
 * @elaborationArr the current elaboration array in the team object
 * @elaboration the elaboration being analyzed
 */
const setElaboration = (elaborationArr, elaboration) => {
  if (elaboration.length > 0) {
    // only add non empty strings to map
    elaborationArr.push(elaboration);
  }
  return elaborationArr;
};

/** Sets the selection values for the team object
 * @param color color is the color being analyzed
 * @param selectionArr selection array to update; arr is formatted as red, yellow, green
 * @param isWeeklySelection true if it is setting the # of selections this week, false if setting # of selections overall
 */
const setSelection = (color, selectionArr) => {
  switch (color) {
    case "red":
      selectionArr[RED_SELECTION_IDX]++;
      break;
    case "yellow":
      selectionArr[YELL_SELECTION_IDX]++;
      break;
    case "green":
      selectionArr[GREEN_SELECTION_IDX]++;
      break;
  }
  return selectionArr;
};

const checkSelectionTimeValid = (timestamp) => {
  if (timestamp >= START_DATE && timestamp <= END_DATE) {
    return true;
  } else {
    return false;
  }
};
