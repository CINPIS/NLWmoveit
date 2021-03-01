import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallangeContextData {
  level: number;
  currentXP: number;
  challengeCompleted: number;
  activeChallenge: Challenge;
  xpToNextLevel: number;
  levelUp: () => void;
  completedChallange: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;

  level: number;
  currentXP: number;
  challengeCompleted: number;
}

export const ChallengesContext = createContext({} as ChallangeContextData);

export function ChallengesProvider({ children,  ...rest }: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
  const [challengeCompleted, setChallengeComplete] = useState(rest.challengeCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentXP", String(level));
    Cookies.set("challengeCompleted", String(level));
  }, [level, currentXP, challengeCompleted]);

  function levelUp(){
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge(){
    //console.log("New Challenge launched - context working");
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
  
    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if(Notification.permission === "granted"){
      new Notification("New Challenge?", {
        body: `Win ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completedChallange(){
    if(!activeChallenge){
      return;
    } 

    const { amount } = activeChallenge;

    let finalXP = currentXP + amount;

    if(finalXP >= xpToNextLevel){
      finalXP = finalXP - xpToNextLevel;
      levelUp();
    }

    setCurrentXP(finalXP);
    setActiveChallenge(null);
    setChallengeComplete(challengeCompleted + 1);
  }

  return(
    <ChallengesContext.Provider 
      value={{ 
        level, 
        levelUp, 
        currentXP, 
        challengeCompleted, 
        startNewChallenge, 
        activeChallenge, 
        resetChallenge, 
        xpToNextLevel,
        completedChallange,
        closeLevelUpModal,
      }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}