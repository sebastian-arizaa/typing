import { CardLevel } from "../components/CardLevel"

export function Levels() {
  const levels: {levelNumber: string, title: string}[] = [
    {
      levelNumber: '1',
      title: 'France and more'
    },
    {
      levelNumber: '2',
      title: 'France and more'
    },
    {
      levelNumber: '3',
      title: 'France and more'
    },
    {
      levelNumber: '4',
      title: 'France and more'
    },
  ]
  return (
    <div className="flex flex-col items-center gap-4 px-[10%] max-sm:px-4 mt-4">
      <h2 className="text-2xl font-semibold">Levels</h2>
      <div className="flex flex-wrap justify-center gap-4 w-full pt-2 border-t-4 border-primary">
          {levels.map(level => <CardLevel key={level.levelNumber}  levelNumber={level.levelNumber} title={level.title}/>)}
      </div>
    </div>
  )
}
