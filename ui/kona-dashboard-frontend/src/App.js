import { TeamDataTable } from "./components/TeamDataTable";
import { TeamDataGrid } from "./components/TeamDataGrid";
import { grey } from "@mui/material/colors";

const styles = {
  container: {
    margin: 50,
  },
};

function App() {
  return (
    <div style={styles.container}>
      <TeamDataGrid />
    </div>
  );
}

export default App;
