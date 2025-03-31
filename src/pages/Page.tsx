import { useContext } from "react";
import { PageContext } from "../context/PageContext";
import { Levels } from "./Levels";
import { Level } from "./Level";

export function Page() {
  const { currentPage } = useContext(PageContext);

  switch (currentPage) {
    case 'levels':
      return <Levels />;
    case 'level':
      return <Level />;
    default:
      return <Levels />;
  }
}
