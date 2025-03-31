import { useState } from "react"
import { PageContext } from "./context/PageContext"
import { Page } from "./pages/Page"
import { CurrentPage } from "./types"


function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('levels')
  return (
    <>
      <PageContext.Provider value={{currentPage, setCurrentPage}}>
        <Page/>
      </PageContext.Provider>
    </>
  )
}

export default App
