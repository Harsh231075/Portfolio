import { MessageCircle } from "lucide-react"
import Link from "next/link"

const FloatingChatIcon = () => {
  return (
    // This div hides the component on screens smaller than 'sm' (small)
    // and positions it on the bottom right for larger screens.
    <div className="hidden sm:block fixed bottom-8 right-8 z-50">
      <Link href='/chat'>
        <div
          className="group relative flex items-center justify-center p-3 rounded-full 
                     bg-green-200 text-white shadow-lg transition-transform 
                     duration-300 ease-in-out hover:scale-110
                     hover:shadow-xl hover:shadow-indigo-500/50"
        >
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-indigo-500 
                          animate-ping opacity-75 group-hover:opacity-100 
                          group-hover:animate-none"></div>

          {/* Main button with the icon */}
          <div className="relative z-10 w-14 h-14 flex items-center justify-center 
                          bg-pink-500 rounded-full transition-all duration-300 
                          group-hover:bg-indigo-700">
            <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
          </div>

          {/* "Chat with my assistant" tooltip */}
          <div className="absolute right-full mr-4 opacity-0 scale-90 
                          group-hover:opacity-100 group-hover:scale-100 
                          transition-all duration-300 ease-in-out
                          whitespace-nowrap px-4 py-2 rounded-full 
                          bg-white text-gray-800 text-sm font-semibold 
                          shadow-md">
            Chat with my assistant
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FloatingChatIcon