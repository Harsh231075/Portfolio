"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import SimpleAIAssistant from "@/3d/model"

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
    <section className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative z-10 max-w-7xl mx-auto sm:pt-0 lg:pt-10">
          <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-96px)]">

            {/* Left Content */}
            <div className="w-full order-2 lg:order-1 lg:w-1/2  sm:space-y-0 md:space-y-6 lg:space-y-8 text-center lg:text-left mt-3 px-4 md:px-6 lg:px-12">

              <div className="">
                <p className="text-gray-400 text-sm md:text-lg min-h-[30px] md:min-h-[36px] lg:min-h-[44px]">
                  <TypingText texts={["Hey there,", "नमस्ते,"]} speed={80} pause={1500} />
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight min-h-[80px] md:min-h-[80px] lg:min-h-[120px]">
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

              <p className="text-gray-300 text-sm md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                A full stack developer is someone who uses their skills in both frontend and backend technologies to build complete web applications, handling everything from user interface to server-side logic and databases.
              </p>

              <div className="hidden lg:block">
                <SimpleAIAssistant />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full order-1 lg:order-2 relative lg:w-1/2 boader-none sm:pt-0 lg:pt-40 ">

              {/* Image - full cover on lg */}
              <div className="relative w-full h-[300px] sm:h-[150px] lg:h-[600px] mt-20 lg:mt-0">
                <Image
                  src="/Myphoto.png"
                  alt="Cybersecurity Professional"
                  fill
                  className=" object-none w-full h-full rounded-lgl bg-transparent px-0  lg:px-20 lg:py-0"
                  priority
                />
              </div>
              {/* Floating Boxes - thoda photo se gap diya */}
              <div className="hidden lg:flex flex-col gap-6 absolute top-10 right-0 z-10 backdrop-blur-md rounded-xl shadow-lg">
                <Counter target={2} label="Years of experience" />
                <Counter target={15} label="Completed projects" />
                <Counter target={12} label="Hackathons participated" />
              </div>

              {/* Mobile view - boxes below image */}
              <div className="lg:hidden mt-4 flex justify-center gap-4 px-4 overflow-x-auto scrollbar-hide">
                <Counter target={2} label="Years of experience" />
                <Counter target={15} label="Completed projects" />
                <Counter target={12} label="Hackathons participated" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
