import { createContext } from "react";
import { CurrentPage } from "../types";

interface PageContextDefaultValue {
  currentPage: CurrentPage
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>
}

export const PageContext = createContext<PageContextDefaultValue>({currentPage: "levels", setCurrentPage: () => {}})