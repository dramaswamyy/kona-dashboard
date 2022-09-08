import { ListItem, List, ListItemText, ListSubheader } from "@mui/material";

const styles = {
  listItem: {
    fontStyle: "italic",
  },
};

const doesElabExist = (elab) => {
  if (elab.length() > 1) {
    return `"${elab}"`;
  } else {
    return null;
  }
};

export const ElaborationList = (props) => {
  const arr = props.elaboration;
  const [firstElab, secondElab, thirdElab] = props.elaboration.slice(
    arr.length - 4,
    arr.length - 1
  );
  console.log(props.elaboration);

  return (
    <>
      <List>
        Here's what the team is saying this week:
        <ListItem>
          <ListItemText sx={styles.listItem}>{firstElab}</ListItemText>
        </ListItem>
      </List>{" "}
      <List>
        <ListItem>
          <ListItemText sx={styles.listItem}>{secondElab}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText sx={styles.listItem}>{thirdElab}</ListItemText>
        </ListItem>
      </List>
    </>
  );
};
