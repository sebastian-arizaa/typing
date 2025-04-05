import { useContext, useEffect, useRef, useState } from "react"
import { PageContext } from "../context/PageContext"
import correctTypingSound from '../assets/typewriter.mp3'
import errorTypingSound from '../assets/error.mp3'
import { CurrenLevelContext } from "../context/CurrentLevelContext"

export function Level() {
  const { setCurrentPage } = useContext(PageContext)
  const {currentLevel} = useContext(CurrenLevelContext)

  const lettersRef = useRef<HTMLDivElement>(null)
  const correctTypingRef = useRef<HTMLAudioElement>(null)
  const errorTypingRef = useRef<HTMLAudioElement>(null)
  const percentageBar = useRef<HTMLDivElement>(null)

  const [currentLetter, setCurrentLetter] = useState(0)
  const [correctLetters, setCorrectLetters] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState("0")
  const [timeInterval, setTimeInterval] = useState(0)
  const [logicText, setLogicText] = useState<string[]>(()=> currentLevel.content.split(""))

  const handleOnClick = () => {
    setCurrentPage("levels")
  }

  const getAccurancy = () => {
    const percent = ((correctLetters / logicText.length) * 100).toFixed(1)
    return percent
  }

  useEffect(()=> {
    const percent = ((currentLetter / logicText.length) * 100).toFixed(1)

    if(percentageBar.current) percentageBar.current.style.width = `${percent}%`
  }, [currentLetter, logicText])

  useEffect(() => {
    if(lettersRef.current) {
      if(lettersRef.current.children.length < 1) {
        lettersRef.current.innerHTML = logicText.map((letter, index) => `
          <div  class = "${index == 0 ? 'hoverLetter' : ''} ${letter == ' ' ? 'min-w-[10px]' : ''}">${letter}</div>
        `).join("")
      }
      if(lettersRef.current.children) {
        const letters: HTMLElement[] = []
        for (let i = 0; i < lettersRef.current.children.length; i++) {
          letters.push(lettersRef.current.children[i] as HTMLElement)
        }
        
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

        const handleLetterProps = (letter: HTMLElement, props: string[] | null) => {
          letter.classList.remove("hoverLetter", "correctLetter", "inCorrectLetter")
          if(props) letter.classList.add(...props)
        }
  
        const handleTypingSound = (audioRef: HTMLAudioElement | null) => {
          if(audioRef) {
            audioRef.currentTime = 0
            audioRef.play() 
          }
        }
  
        const handleIsCorrectLetter = (letter: string, key: string) => {
          if(letter === key){
            handleTypingSound(correctTypingRef.current)
            handleLetterProps(letters[currentLetter], ["correctLetter"])
            setCorrectLetters(correctLetters + 1)
          }else {
            handleTypingSound(errorTypingRef.current)
            handleLetterProps(letters[currentLetter], ["inCorrectLetter"])
          }
      
          setCurrentLetter(currentLetter + 1)
          if(letters[currentLetter + 1]) {
            handleLetterProps(letters[currentLetter + 1], ["hoverLetter"])
          }
        }
  
        const keyDownListener = (e: KeyboardEvent) => {
            const key = e.key
          if(key == ' ') {
            e.preventDefault();
          }
          const controKey = e.ctrlKey
          if(letters[currentLetter]) {
            const letter = letters[currentLetter].innerHTML
            if((key.length > 1 && key != 'Backspace') || controKey) return
            if(key === 'Backspace' && currentLetter > 0) {
              if(letters[currentLetter - 1].classList.contains("correctLetter")) {
                setCorrectLetters(prev => prev != 0 ? prev - 1 : 0)
              }
    
              handleTypingSound(correctTypingRef.current)
              handleLetterProps(letters[currentLetter - 1], ["hoverLetter"])
              handleLetterProps(letters[currentLetter], null)
    
              setCurrentLetter(currentLetter - 1)
              return
            }else if(key === 'Backspace' && currentLetter == 0) {
              return
            }
            if(currentLetter + 1 != letters.length) {
              if(!timeInterval) setTimeInterval(setInterval(handleSpeedInterval(), 100))
              handleIsCorrectLetter(letter, key)
            }else {
              handleIsCorrectLetter(letter, key)
              clearInterval(timeInterval)
              window.removeEventListener('keydown', keyDownListener)
            }
          }
        }
  
        const keyPressListener = (e: KeyboardEvent) => {
          const key = e.code
          if(currentLetter === letters.length) {
            window.removeEventListener('keypress', keyPressListener)
            return
          }
          if(key === "Backspace") {
            if(key === 'Backspace' && currentLetter > 0) {
              for (let i = currentLetter; i >= 0; i--) {
                if(letters[i - 1]) {
                  if(letters[i - 1].innerHTML == " ") {
                    if(i == currentLetter) {
                      handleLetterProps(letters[i], null)
                      if(letters[i - 1].classList.contains("correctLetter")) {
                        setCorrectLetters(prev => prev != 0 ? prev - 1 : 0)
                      }
                      continue
                    }
                    handleLetterProps(letters[i], ["hoverLetter"])
                    setCurrentLetter(i)
                    return  
                  }
                  if(letters[i - 1].classList.contains("correctLetter")) {
                    setCorrectLetters(prev => prev != 0 ? prev - 1 : 0)
                  }
                  handleLetterProps(letters[i], null)
                }
              }
              setCorrectLetters(0)
              handleLetterProps(letters[0], ["hoverLetter"])
              setCurrentLetter(0)
            }
          }
        }
  
        window.addEventListener('keydown', keyDownListener)
        window.addEventListener('keypress', keyPressListener)
  
        return () => {
          window.removeEventListener('keydown', keyDownListener)
          window.removeEventListener('keypress', keyPressListener)
        }
      }
    }
  }, [currentLetter, logicText, timeInterval, correctLetters, lettersRef])

  useEffect(()=> {
    setLogicText(()=> currentLevel.content.split(""))
  }, [currentLevel])

  return (
    <div className="relative flex flex-col gap-4 h-full px-[20%] max-sm:px-[5%] select-none">
      <div className="flex justify-between items-center py-4 border-b-4 border-primary">
          <div onClick={handleOnClick} className="text-4xl cursor-pointer hover:scale-110 transition-transform">⮨</div>
          <div className="flex gap-4 text-lg max-sm:text-sm">
            <span className="pb-1 border-b-2 border-primary">Velocidad: {typingSpeed} <span className="text-xs">PPM</span></span>
            <span className="pb-1 border-b-2 border-primary">Precición: {getAccurancy()}%</span>
          </div>
      </div>
      <h1 className="text-center text-2xl font-semibold text-black/60 font-mono">{currentLevel.title}</h1>
      <div ref={lettersRef} className="flex flex-wrap gap-y-2  gap-x-1 text-2xl max-sm:text-lg text-black/80 font-mono"></div>
      <div className="w-full mt-4 border border-primary">
        <div ref={percentageBar} className={`w-2 h-4 bg-primary`}></div>
      </div>
      {currentLetter == logicText.length && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-white/80">
          <div className="flex flex-col gap-2 -translate-y-1/2 py-4 px-8 text-lg text-white font-semibold bg-primary rounded-sm">
            <p className="border-b-2 border-white text-xl">Felicidades Terminaste!</p>
            <p className="pb-1 border-b-2 border-primary">Velocidad: {typingSpeed} <span className="text-xs">PPM</span></p>
            <p className="pb-1 border-b-2 border-primary">Precición: {getAccurancy()}%</p>
            <button onClick={handleOnClick} className="bg-white text-black/80 font-normal rounded cursor-pointer hover:scale-105 transition-transform">Volver</button>
          </div>
        </div>  
      )}
      <audio ref={correctTypingRef} className="hidden" src={correctTypingSound} controls={true}></audio>
      <audio ref={errorTypingRef} className="hidden" src={errorTypingSound} controls={true}></audio>
    </div>
  )
}
