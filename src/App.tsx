import { useState } from "react"
import { PageContext } from "./context/PageContext"
import { Page } from "./pages/Page"
import { CurrentPage, LevelType } from "./types"
import { Header1 } from "./components/Header1"
import { CurrenLevelContext } from "./context/CurrentLevelContext"


function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('levels')
  const [currentLevel, setCurrentLevel] = useState<LevelType>({title: "", level: "", content: ""})
  return (
    <>
      <PageContext.Provider value={{currentPage, setCurrentPage}}>
        <CurrenLevelContext.Provider value={{currentLevel, setCurrentLevel}}>
          <Header1/>
          <Page/>
        </CurrenLevelContext.Provider>
      </PageContext.Provider>
    </>
  )
}

export default App
