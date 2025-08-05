
// "use client"
// import { useState, useRef, useEffect } from 'react';
// import { Send } from 'lucide-react';
// import { FaHome } from 'react-icons/fa';
// import Link from 'next/link';


// interface Message {
//   sender: "user" | "assistant";
//   text: string;
// }

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       sender: "assistant",
//       text: "Hello! How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = (e: React.FormEvent) => {
//     e.preventDefault?.();
//     if (!input.trim()) return;
//     setMessages((msgs) => [
//       ...msgs,
//       { sender: "user", text: input },
//       { sender: "assistant", text: "I'm here to help! Thanks for your message." },
//     ]);
//     setInput("");
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col">
//         {/* Header */}
//         <header className="fixed top-0 w-full z-50  bg-gray-900/60 backdrop-blur-sm text-white py-4 px-6 flex justify-between items-center shadow-md">
//           {/* Left side */}
//           <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
//             My Assistant
//           </h1>


//           {/* Right side: Home text + icon */}
//           <div className="flex items-center gap-2 cursor-pointer">

//             <Link href='/' ><FaHome size={24} className="text-green-500" /></Link>

//           </div>
//         </header>



//         {/* Main area with background photo */}
//         <main
//           className="flex-1 relative bg-cover bg-center bg-no-repeat bg-fixed overflow-y-auto p-4 py-20"
//           style={{
//             backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://media.istockphoto.com/id/1216688115/vector/seamless-pattern-with-social-media-elements.jpg?s=612x612&w=0&k=20&c=5c_iSGEPfiNFNKsR2cZaix1plXGuTip3gYF9RYSsCIo=')`
//           }}
//         >
//           <div className="max-w-4xl mx-auto space-y-4">
//             {messages.map((msg, i) => (
//               <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                 <div
//                   className={`px-4 py-3 rounded-lg max-w-md shadow-lg
//                 ${msg.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-gray-800"
//                     }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             <div ref={bottomRef}></div>
//           </div>
//         </main>

//         {/* Bottom input */}
//         <div className="fixed bottom-0 left-0 w-full z-40 bg-gray-600/60  backdrop-blur-sm border-t border-gray-200 p-2 ">
//           <div className="max-w-4xl mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap">
//             <input
//               ref={inputRef}
//               className="flex-1 border border-red-500 bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:border-red-700 transition duration-200 w-[50%] sm:w-auto"
//               type="text"
//               value={input}
//               placeholder="Type your message..."
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
//               autoFocus
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-red-500 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-200"
//             >
//               <Send className="w-5 h-5" />
//             </button>
//           </div>
//         </div>


//       </div>
//     </>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "assistant",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault?.();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((msgs) => [...msgs, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await res.json();

      setMessages((msgs) => [
        ...msgs,
        { sender: "user", text: userMessage },
        { sender: "assistant", text: data.answer || "Sorry, no response." },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "assistant", text: "Something went wrong." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-gray-900/60 backdrop-blur-sm text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          My Assistant
        </h1>
        <Link href="/">
          <FaHome size={24} className="text-green-500" />
        </Link>
      </header>

      {/* Main chat area */}
      <main
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed overflow-y-auto p-4 py-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://media.istockphoto.com/id/1216688115/vector/seamless-pattern-with-social-media-elements.jpg?s=612x612&w=0&k=20&c=5c_iSGEPfiNFNKsR2cZaix1plXGuTip3gYF9RYSsCIo=')",
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-md shadow-lg ${msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-gray-300 animate-pulse">Assistant is typing...</div>
          )}
          <div ref={bottomRef}></div>
        </div>
      </main>

      {/* Bottom input bar */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-gray-600/60 backdrop-blur-sm border-t border-gray-200 p-2">
        <div className="max-w-4xl mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <input
            ref={inputRef}
            className="flex-1 border border-red-500 bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:border-red-700 transition duration-200 w-[50%] sm:w-auto"
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
            autoFocus
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
