import styles from "./Button.module.css";

export default function Button({ increase }: { increase: () => void }) {
  return (
    <button className={styles.button} onClick={increase}>
      Button
    </button>
  );
}
