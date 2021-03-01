import { useContext } from "react";
import { ChallengesContext } from "../context/ChallengesContext";
import { CountdownContext } from "../context/CountdownContext";

import styles from "../styles/components/ChallengeBox.module.css"

export function ChallengeBox(){
  const { activeChallenge, resetChallenge, completedChallange } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded(){
    completedChallange();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
  }

  return(
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
          <div className={styles.challengeActive}> 
            <header>Win {activeChallenge.amount} xp</header>
            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
              <strong>New Challenge</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
              <button 
                type="button" 
                className={styles.challengeFailedButton}
                onClick={handleChallengeFailed}
              >Failed</button>
              <button 
                type="button" 
                className={styles.challengeSucceedButton}
                onClick={handleChallengeSucceeded}
              >Finished</button>
            </footer>
          </div >
      ) : (
      <div className={styles.challengeNotActive}>
        <strong>Get a new challenge after finishing a Pomodoro Cycle.</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"/>
          Complete a new challenge and Move to the Next Level.
        </p>
      </div>
      )}
    </div>
  );
}