export const createTeamObject = (row) => {
  //if it exists
  // TODO: csv is already sorted by timestamp i think; it needs to display the last 7 elaboration values and selection values
  const managerID = row.SlackTeamId.split("&")[0];
  const elaborationArr = setElaboration([], row.Elaboration);

  const [redSelection, yellowSelection, greenSelection] = setSelection(
    row.Selection,
    0,
    0,
    0
  );

  return {
    managerID: managerID,
    elaboration: elaborationArr,
    redSelection: redSelection,
    yellowSelection: yellowSelection,
    greenSelection: greenSelection,
  };
};

export const modifyTeamObject = (row, teamInfo) => {
  setElaboration(teamInfo.elaboration, row.Elaboration);
  // console.log(
  //   "before: " +
  //     "red: " +
  //     teamInfo.redSelection +
  //     " green: " +
  //     teamInfo.greenSelection +
  //     " yellow: " +
  //     teamInfo.yellowSelection
  // );
  [teamInfo.redSelection, teamInfo.yellowSelection, teamInfo.greenSelection] =
    setSelection(
      row.Selection,
      teamInfo.redSelection,
      teamInfo.greenSelection,
      teamInfo.yellowSelection
    );
  return teamInfo;
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
 * @param redSelection redSelection is the curr number of reds in the team
 * @param greenSelection greenSelction is the curr number of greens in the team
 * @param yellowSelection yellowSelection is the curr number of yellows in the team
 */
const setSelection = (color, redSelection, greenSelection, yellowSelection) => {
  switch (color) {
    case "red":
      redSelection++;
      break;
    case "yellow":
      yellowSelection++;
      break;
    case "green":
      greenSelection++;
      break;
  }
  // console.log(
  //   "red " +
  //     redSelection +
  //     " green " +
  //     greenSelection +
  //     " yellow " +
  //     yellowSelection
  // );
  return [redSelection, yellowSelection, greenSelection];
};
