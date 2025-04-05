import { useContext } from "react"
import { PageContext } from "../context/PageContext"
import { CurrenLevelContext } from "../context/CurrentLevelContext"
import { levels } from "../levels"

interface Props {
  levelNumber: string,
  title: string
}

export function CardLevel({levelNumber, title}: Props) {
  const {setCurrentPage} = useContext(PageContext)
  const {setCurrentLevel} = useContext(CurrenLevelContext)
  const handleOnClick = () => {
    setCurrentPage('level')
    setCurrentLevel(levels[Number(levelNumber) - 1])
  }

  return (
    <div onClick={handleOnClick} className="flex flex-col items-center justify-between w-40 h-40 max-sm:w-22 max-sm:h-22 bg-primary text-white rounded cursor-pointer hover:scale-105 hover:bg-primary/70 transition-transform">
      <span className="flex items-center h-full text-7xl max-sm:text-lg">{levelNumber}</span>
      <p className="p-2 border-t-1 self-baseline w-full max-sm:text-xs text-center overflow-x-clip overflow-ellipsis text-nowrap">{title}</p>
    </div>
  )
}
