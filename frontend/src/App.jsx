import { useEffect, useState } from "react";
import { luckyNumberService } from "./services/api";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    luckyNumberService
      .list()
      .then((data) => {
        setNumbers(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to fetch");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Little Lottery Data Laboratory</h1>
      <p>Backend connection test</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <p>Found {numbers.length} Lucky Number(s).</p>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {JSON.stringify(numbers, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

export default App;



