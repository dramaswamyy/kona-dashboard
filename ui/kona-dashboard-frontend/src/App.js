import { TeamDataTable } from "./components/TeamDataTable";

const styles = {
  container: {
    margin: 50, // figure out spacing on this later
  },
};

function App() {
  return (
    <div style={styles.container}>
      <TeamDataTable />
    </div>
  );
}

export default App;
