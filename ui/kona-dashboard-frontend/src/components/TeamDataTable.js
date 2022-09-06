import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  TableCell,
} from "@mui/material";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
  },
};

export const TeamDataTable = () => {
  return (
    <TableContainer component={Paper} sx={styles.container}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TeamID</TableCell>
            <TableCell>Distribution</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>ManID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row></Row>
          <Row></Row>
          <Row></Row>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Row = () => {
  return (
    <TableRow
      key="UA1"
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell>UA1</TableCell>
      <TableCell>202020</TableCell>
      <TableCell>Not good</TableCell>
      <TableCell>UA</TableCell>
    </TableRow>
  );
};
