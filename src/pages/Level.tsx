import { useContext, useEffect, useRef, useState } from "react"
import { PageContext } from "../context/PageContext"
import { Letter } from "../components/Letter"
import { TypeLetter } from "../types"
import correctTypingSound from '../assets/typewriter.mp3'
import errorTypingSound from '../assets/error.mp3'

export function Level() {
  const { setCurrentPage } = useContext(PageContext)
  const correctTypingRef = useRef<HTMLAudioElement>(null)
  const errorTypingRef = useRef<HTMLAudioElement>(null)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [correctLetters, setCorrectLetters] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState("0")
  const [timeInterval, setTimeInterval] = useState(0)
  const [logicText, setLogicText] = useState<TypeLetter[]>(() => "rec tus datos de contacto u hoja de vida, por medio de nuestras plataformas, para nuestras vacantes de PRACTICAS, me gustaría verificar si te encuentras interesado en participar en el proceso de selección. ".split("").map((letter, index) => ({letter: letter, correct: false, inCorrect: false, hover: index == 0 ? true : false})))

  const handleOnClick = () => {
    setCurrentPage("levels")
  }

  const getAccurancy = () => {
    return ((correctLetters / logicText.length) * 100).toFixed(1)
  }

  useEffect(() => {
    const handleSpeedInterval = () => {
      let ms = 0
      return () => {
        ms = ms + 100
        setCorrectLetters(prev => {
          const result = ((prev / 5) / (ms / 1000) * 60).toFixed(1)
          setTypingSpeed(result)
          return prev
        })
      }
    }

    const handleLetterProps = (letter: Partial<TypeLetter>, props: Partial<TypeLetter>) => {
      letter.hover = props.hover ?? letter.hover
      letter.correct = props.correct ?? letter.correct
      letter.inCorrect = props.inCorrect ?? letter.inCorrect
    }

    const handleTypingSound = (audioRef: HTMLAudioElement | null) => {
      if(audioRef) {
        audioRef.currentTime = 0
        audioRef.play() 
      }
    }
  
    const handleIsCorrectLetter = (letter: string, key: string, copyLogicText: TypeLetter[]) => {
      if(letter === key){
        handleTypingSound(correctTypingRef.current)
        handleLetterProps(copyLogicText[currentLetter], {correct: true})
        setCorrectLetters(correctLetters + 1)
      }else {
        handleTypingSound(errorTypingRef.current)
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
          if(copyLogicText[currentLetter - 1].correct) {
            setCorrectLetters(correctLetters - 1)
          }

          handleTypingSound(correctTypingRef.current)
          handleLetterProps(copyLogicText[currentLetter - 1], {correct: false, inCorrect: false, hover: true})
          handleLetterProps(copyLogicText[currentLetter], {correct: false, inCorrect: false, hover: false})

          setLogicText(copyLogicText)
          setCurrentLetter(currentLetter - 1)
          return
        }else if(key === 'Backspace' && currentLetter == 0) {
          return
        }
        if(currentLetter + 1 != copyLogicText.length) {
          if(!timeInterval) setTimeInterval(setInterval(handleSpeedInterval(), 100))
          handleIsCorrectLetter(letter, key, copyLogicText)
        }else {
          handleIsCorrectLetter(letter, key, copyLogicText)
          clearInterval(timeInterval)
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
              if(i == currentLetter) {
                handleLetterProps(copyLogicText[i], {correct: false, inCorrect: false, hover: false})
                continue
              }
              setCorrectLetters(prev => prev + 1)
              setCurrentLetter(i + 1)
              handleLetterProps(copyLogicText[i + 1], {correct: false, inCorrect: false, hover: true})
              setLogicText(copyLogicText)
              return
            }
            setCorrectLetters(prev => prev - 1)
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
  }, [currentLetter, logicText, timeInterval, correctLetters])

  return (
    <div className="flex flex-col gap-4 px-[10%] select-none">
      <div className="flex justify-between items-center">
          <div onClick={handleOnClick} className="text-4xl cursor-pointer hover:scale-110 transition-transform">⮨</div>
          <div className="flex gap-4">
            <span>Speed: {/* getSpeed() */ typingSpeed} <span className="text-xs">PPM</span></span>
            <span>Precición: {getAccurancy()}%</span>
          </div>
      </div>
      <div className="flex flex-wrap text-2xl">
        {logicText.map((letter, index) => <Letter key={index} letter={letter.letter} correct={letter.correct} inCorrect={letter.inCorrect} hover={letter.hover}/>)}
      </div>
      <audio ref={correctTypingRef} className="hidden" src={correctTypingSound} controls={true}></audio>
      <audio ref={errorTypingRef} className="hidden" src={errorTypingSound} controls={true}></audio>
    </div>
  )
}
