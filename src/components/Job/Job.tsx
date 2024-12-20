import { useEffect, useState } from "react";
import styles from "./Job.module.css";

type JobProps = {
  jobID: number;
};

type TJobDetails = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const initalState = {
  by: "",
  id: 0,
  score: 0,
  time: 0,
  title: "",
  type: "",
  url: "",
};

export default function Job({ jobID }: JobProps) {
  const API_URL: string = `https://hacker-news.firebaseio.com/v0/item/${jobID}.json`;
  const [jobDetails, setJobDetails] = useState<TJobDetails>(initalState);

  useEffect(() => {
    async function fetchJobDetails() {
      const controller = new AbortController();
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          console.error("Error Fetching Data");
          setJobDetails(initalState);
          return;
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (e) {
        console.log(e);
        setJobDetails(initalState);
        return;
      }
      return () => {
        controller.abort();
      };
    }
    fetchJobDetails();
  }, []);

  return (
    <div className={styles.job}>
      <h3 className={styles.company}>
        {jobDetails.title.toLowerCase().split("is hiring")[0]}
      </h3>
      <p className={styles.title}>
        {"is hiring" + jobDetails.title.toLowerCase().split("is hiring")[1] ||
          ""}
      </p>
      <p className={styles.date}>
        {new Date(jobDetails.time * 1000).toLocaleDateString()}
      </p>
    </div>
  );
}
