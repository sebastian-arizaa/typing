import { createContext} from "react";
import { LevelType } from "../types";

interface CurrentLevelContextDefaultValue {
  currentLevel: LevelType,
  setCurrentLevel: React.Dispatch<React.SetStateAction<LevelType>>
}

export const CurrenLevelContext = createContext<CurrentLevelContextDefaultValue>({currentLevel: {title: "", level: "", content: ""}, setCurrentLevel: () => {}})