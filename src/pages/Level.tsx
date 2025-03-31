import { useContext } from "react"
import { PageContext } from "../context/PageContext"

export function Level() {
  const { setCurrentPage } = useContext(PageContext)
  
  return (
    <div>
      <p>Level</p>
      <button onClick={() => setCurrentPage("levels")}>click to go LEVELS</button>
    </div>
  )
}
