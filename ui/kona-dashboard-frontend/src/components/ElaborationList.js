import { ListItem, List, ListItemText } from "@mui/material";

const styles = {
  listItem: {
    fontStyle: "italic",
  },
};

/**
 * Report generated that explains more about what the team is doing that week
 */
export const ElaborationList = (props) => {
  const arr = props.elaboration;
  const [firstElab, secondElab, thirdElab] = props.elaboration.slice(
    arr.length - 4,
    arr.length - 1
  );

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
