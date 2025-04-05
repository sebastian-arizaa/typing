import { useState } from "react"
import { CardLevel } from "../components/CardLevel"
import { levels } from "../levels"

export function Levels() {
  const [showMessage, setShowMessage] = useState(() => window.matchMedia("(max-width: 768px)").matches)

  return (
    <div className="flex flex-col items-center gap-4 px-[10%] max-sm:px-4 mt-4">
      <h2 className="text-2xl">Niveles</h2>
      <div className="flex flex-wrap justify-center gap-4 w-full pt-2 border-t-4 border-primary">
          {levels.map(level => <CardLevel key={level.level}  levelNumber={level.level} title={level.title}/>)}
      </div>
      {showMessage && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center bg-white/80">
        <div className="flex flex-col gap-2 -translate-y-1/2 max-w-68 py-4 px-8 text-center text-lg text-white font-semibold bg-primary rounded-sm">
          <p className="border-b-2 border-white text-xl ">Aviso!</p>
          <p className="text-base">Esta pagina esta orienda al uso de un teclado, funciona con el teclado de un movil, pero le recomendamos usar un teclado o visitar esta pagina en un computador, Gracias.</p>
          <button onClick={() => setShowMessage(false)} className="bg-white text-black/80 font-normal rounded cursor-pointer hover:scale-105 transition-transform">Seguir</button>
        </div>
      </div>
      )}
      
    </div>
  )
}
