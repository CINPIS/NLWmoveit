import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges(){
  const { challengeCompleted } = useContext(ChallengesContext);

  return(
    <div className={styles.completedChallengesContainer}>
      <span>Completed Challenges</span>
      <span>{challengeCompleted}</span>
    </div>
  );
}