import "./App.css";
import Job from "./components/Job/Job";
import Button from "./components/Button/Button";
import { useCallback, useEffect, useState } from "react";

const API_URL: string = "https://hacker-news.firebaseio.com/v0/jobstories.json";

function App() {
  const [jobIDs, setJobIDs] = useState<number[]>([]);
  const [currentCount, setCurrentCount] = useState<number>(9);
  const [jobDisplay, setJobDisplay] = useState<number[]>([]);

  useEffect(() => {
    async function fetchJobIDs(): Promise<number[] | void> {
      const controller = new AbortController();
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          console.log("Error fetching job IDs");
        }
        const data = await response.json();
        setJobIDs(data);
      } catch (err) {
        console.log(err);
        controller.abort();
      }
    }
    fetchJobIDs();
  }, []);

  useEffect(() => {
    setJobDisplay(jobIDs.slice(0, currentCount));
  }, [currentCount, jobIDs]);

  const IncreaseJobs = useCallback(() => {
    setCurrentCount((prevCount) => Math.min(prevCount + 6, jobIDs.length));
  }, [currentCount, jobIDs]);

  return (
    <div className="app">
      <h2>HN Jobs :</h2>
      <div className="main_area">
        {jobDisplay.map((jobID, idx) => {
          return <Job key={idx} jobID={jobID} />;
        })}
      </div>
      <div className="load_more">
        <Button increase={IncreaseJobs} />
      </div>
    </div>
  );
}

export default App;
