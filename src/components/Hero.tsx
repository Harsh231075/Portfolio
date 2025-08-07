"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
// import SimpleAIAssistant from "@/3d/model"

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const increment = target / 100
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < target) {
          return Math.min(prev + increment, target)
        }
        clearInterval(timer)
        return target
      })
    }, 20)

    return () => clearInterval(timer)
  }, [target])

  return (
    <div className="text-center shrink-0 min-w-[150px] bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
      <div className="text-2xl md:text-4xl font-bold text-white mb-1">
        {Math.floor(count)}<span className="text-red-500">+</span>
      </div>
      <div className="text-gray-400 text-xs md:text-sm">{label}</div>
    </div>
  )
}

const TypingText = ({
  texts,
  speed = 100,
  pause = 1500,
  className = ""
}: {
  texts: string[];
  speed?: number;
  pause?: number;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState("")
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (charIndex < texts[currentTextIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + texts[currentTextIndex][charIndex])
        setCharIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else {
      const pauseTimeout = setTimeout(() => {
        setDisplayText("")
        setCharIndex(0)
        setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      }, pause)
      return () => clearTimeout(pauseTimeout)
    }
  }, [charIndex, currentTextIndex, texts, speed, pause])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-red-500">|</span>
    </span>
  )
}

const Hero = () => {
  return (
    <section className="min-h-screen bg-black relative overflow-hidden flex items-center ">
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between  gap-0 md:gap-10">

          {/* Left Content */}
          <div className="w-full order-2 lg:order-1 lg:w-1/2 text-center lg:text-left  lg:mt-0">
            <div>
              <p className="text-gray-400 text-sm md:text-lg min-h-[30px] md:min-h-[36px] lg:min-h-[44px]">
                <TypingText texts={["Hey there,", "नमस्ते,"]} speed={80} pause={1500} />
              </p>
              <h1 className="text-xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight  md:min-h-[80px] lg:min-h-[120px]">
                <TypingText
                  texts={[
                    "I'm Harsh singh baghel",
                    "I'm हर्ष सिंह बघेल",
                  ]}
                  speed={60}
                  pause={2000}
                />
              </h1>
            </div>

            <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mt-3 lg:mt-4">
              A full stack developer is someone who uses their skills in both frontend and backend technologies to build complete web applications, handling everything from user interface to server-side logic and databases.
            </p>
          </div>

          {/* Right Content */}
          <div className="w-full order-1 lg:order-2 relative lg:w-1/2">
            {/* Image Container */}
            <div className="relative w-full h-[400px] sm:h-[320px] md:h-[360px] lg:h-[600px] mt-0 md:mt-6 lg:mt-0">

              <Image
                src="/Myphoto.png"
                alt="Harsh Singh Baghel"
                fill
                className="object-cover md:object-contain w-full h-full rounded-xl"
                priority
              />
            </div>
            {/* Floating Boxes - Desktop */}
            <div className="hidden lg:flex flex-col gap-6 absolute top-1/2 transform -translate-y-1/2 -right-16 z-10">
              <Counter target={3} label="Months of experience" />
              <Counter target={15} label="Completed projects" />
              <Counter target={12} label="Hackathons participated" />
            </div>

            {/* Floating Boxes - Mobile */}
            {/* <div className="lg:hidden flex flex-wrap justify-center gap-4 px-4 mt-6"> */}

            {/* <Counter target={2} label="Years of experience" />
              <Counter target={15} label="Completed projects" />
              <Counter target={12} label="Hackathons participated" /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        {/* You can add a decorative element here if needed */}
      </div>
    </section>
  )
}

export default Hero