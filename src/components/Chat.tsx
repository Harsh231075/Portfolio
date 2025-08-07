// import { MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const FloatingChatIcon = () => {
  return (
    // This div hides the component on screens smaller than 'sm' (small)
    // and positions it on the bottom right for larger screens.
    <div className="hidden sm:block fixed bottom-8 right-8 z-50">
      <Link href='/chat'>
        <div
          className="group relative flex items-center justify-center p-3 rounded-full"
        >
          {/* Pulsing ring animation */}
          <div className="absolute inset-0 rounded-full bg-pink-100
                          animate-ping opacity-75  
                          "></div>

          {/* Main button with the icon */}
          <Image src="/logo-1.jpg" alt="Chat Icon" width={80} height={80} className="w-full h-full text-white rounded-full" />


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