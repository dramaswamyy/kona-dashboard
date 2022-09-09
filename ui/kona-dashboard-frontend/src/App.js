import { TeamDataGrid } from "./components/TeamDataGrid";

const styles = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    marginTop: 70,
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
