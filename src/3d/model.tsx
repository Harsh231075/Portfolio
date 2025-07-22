import { MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
const SimpleAIAssistant = () => {
  return (
    <Link href='/chat'>
      <div className="max-w-sm  bg-black rounded-xl shadow-lg flex items-center ">
        {/* AI Assistant Photo */}
        <Image
          width={100}
          height={100}
          src="/ai.jpeg"
          alt="AI Assistant"
          className="w-40 h-40 rounded-full object-cover border-2 border-gray-500"
        />

        {/* Talk Button */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white rounded-lg py-2 px-4 flex items-center gap-2 text-base shadow-md transition duration-200 ml-2"
          onClick={() => console.log('Talk button clicked')}
        >
          <MessageCircle size={20} />
          Talk to me
        </button>
      </div>
    </Link>
  )
}

export default SimpleAIAssistant
