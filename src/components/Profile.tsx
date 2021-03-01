import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/CINPIS.png" alt="CINPIS photo"/>
      <div>
        <strong>Cinthia Pissetti</strong>
        <p>
          <img src="icons/level.svg" alt="level up"/>
          Level {level}</p>
      </div>
    </div>
  );
}