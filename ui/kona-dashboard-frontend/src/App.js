import { TeamDataTable } from "./components/TeamDataTable";
import { TeamDataGrid } from "./components/TeamDataGrid";

const styles = {
  container: {
    margin: 50, // figure out spacing on this later
  },
};

function App() {
  return (
    <div style={styles.container}>
      <TeamDataTable />
      <TeamDataGrid />
    </div>
  );
}

export default App;
