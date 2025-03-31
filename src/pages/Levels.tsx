import { useContext } from "react"
import { PageContext } from "../context/PageContext"

export function Levels() {
  const { setCurrentPage } = useContext(PageContext)

  return (
    <div>
      <p>levels</p>
      <button onClick={() => setCurrentPage("level")}>click to go LEVEL</button>
    </div>
  )
}
