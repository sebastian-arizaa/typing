import { TypeLetter } from "../types"
 
type Props = TypeLetter & {}

export function Letter({letter, correct, inCorrect, hover}: Props) {
  return (
    <div className={`text-2xl ${letter == ' ' ? 'min-w-[10px]' : ''}
      ${hover ? "bg-gray-200 animate-letter" : correct ? "bg-green-200" :  inCorrect ? "bg-red-300" : ''} 
    `}>{letter}</div>
  )
}
