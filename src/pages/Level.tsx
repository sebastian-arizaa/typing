import { useContext, useEffect, useState } from "react"
import { PageContext } from "../context/PageContext"
import { Letter } from "../components/Letter"
import { TypeLetter } from "../types"

export function Level() {
  const { setCurrentPage } = useContext(PageContext)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [logicText, setLogicText] = useState<TypeLetter[]>(() => "Hello goodbye".split("").map((letter, index) => ({letter: letter, correct: false, inCorrect: false, hover: index == 0 ? true : false})))

  const handleOnClick = () => {
    setCurrentPage("levels")
  }

  useEffect(() => {
    const handleLetterProps = (letter: Partial<TypeLetter>, props: Partial<TypeLetter>) => {
      letter.hover = props.hover ?? letter.hover
      letter.correct = props.correct ?? letter.correct
      letter.inCorrect = props.inCorrect ?? letter.inCorrect
    }
  
    const handleIsCorrectLetter = (letter: string, key: string, copyLogicText: TypeLetter[]) => {
      if(letter === key){
        handleLetterProps(copyLogicText[currentLetter], {correct: true})
      }else {
        handleLetterProps(copyLogicText[currentLetter], {inCorrect: true})
      }
  
      handleLetterProps(copyLogicText[currentLetter], {hover: false})
      setLogicText(copyLogicText)
  
      setCurrentLetter(currentLetter + 1)
      if(copyLogicText[currentLetter + 1]) {
        handleLetterProps(copyLogicText[currentLetter + 1], {hover: true})
      }
    }

    const keyDownListener = (e: KeyboardEvent) => {
      const copyLogicText = [...(logicText.map(lt => ({...lt})))]
      const key = e.key

      if(logicText[currentLetter]) {
        const letter = copyLogicText[currentLetter].letter
        if(key.length > 1 && key != 'Backspace') return
        if(key === 'Backspace' && currentLetter > 0) {
          handleLetterProps(copyLogicText[currentLetter - 1], {correct: false, inCorrect: false, hover: true})
          handleLetterProps(copyLogicText[currentLetter], {correct: false, inCorrect: false, hover: false})

          setLogicText(copyLogicText)
          setCurrentLetter(currentLetter - 1)
          return
        }else if(key === 'Backspace' && currentLetter == 0) {
          return
        }
        if(currentLetter + 1 != copyLogicText.length) {
          handleIsCorrectLetter(letter, key, copyLogicText)
        }else {
          handleIsCorrectLetter(letter, key, copyLogicText)
          window.removeEventListener('keydown', keyDownListener)
        }
      }
    }

    const keyPressListener = (e: KeyboardEvent) => {
      const copyLogicText = [...(logicText.map(lt => ({...lt})))]
      const key = e.code
      if(currentLetter === copyLogicText.length) {
        window.removeEventListener('keypress', keyPressListener)
        return
      }
      if(key === "Backspace") {
        if(key === 'Backspace' && currentLetter > 0) {
          for (let i = currentLetter; i >= 0; i--) {
            if(copyLogicText[i].letter === ' ') {
              if(i == currentLetter) return
              setCurrentLetter(i + 1)
              handleLetterProps(copyLogicText[i + 1], {correct: false, inCorrect: false, hover: true})
              setLogicText(copyLogicText)
              return
            }
            handleLetterProps(copyLogicText[i], {correct: false, inCorrect: false, hover: false})
          }
          handleLetterProps(copyLogicText[0], {correct: false, inCorrect: false, hover: true})
          setCurrentLetter(0)
          setLogicText(copyLogicText)
        }
      }
    }

    window.addEventListener('keydown', keyDownListener)
    window.addEventListener('keypress', keyPressListener)

    return () => {
      window.removeEventListener('keydown', keyDownListener)
      window.removeEventListener('keypress', keyPressListener)
    }
  }, [currentLetter, logicText])

  return (
    <div className="flex flex-col gap-4 px-[10%]">
      <div className="flex justify-between items-center">
          <div onClick={handleOnClick} className="text-4xl cursor-pointer hover:scale-110 transition-transform">⮨</div>
          <div className="flex gap-4">
            <span>TPM: 200</span>
            <span>Precición: 80%</span>
          </div>
      </div>
      <div className="flex flex-wrap text-2xl">
        {logicText.map((letter, index) => <Letter key={index} letter={letter.letter} correct={letter.correct} inCorrect={letter.inCorrect} hover={letter.hover}/>)}
      </div>
    </div>
  )
}
