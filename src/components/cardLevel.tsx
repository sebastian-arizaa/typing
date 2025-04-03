import { useContext } from "react"
import { PageContext } from "../context/PageContext"

interface Props {
  levelNumber: string,
  title: string
}

export function CardLevel({levelNumber, title}: Props) {
  const {setCurrentPage} = useContext(PageContext)

  const handleOnClick = () => {
    setCurrentPage('level')
  }

  return (
    <div onClick={handleOnClick} className="flex flex-col items-center justify-between w-40 h-40 bg-primary text-white rounded cursor-pointer hover:scale-105 hover:bg-primary/70 transition-transform">
      <span className="flex items-center h-full text-7xl">{levelNumber}</span>
      <p className="p-2 border-t-1 self-baseline w-40 text-center overflow-x-clip overflow-ellipsis text-nowrap">{title}</p>
    </div>
  )
}
