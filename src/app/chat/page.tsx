// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { Send, Bot, User, Sparkles } from 'lucide-react';

// const ChatUI = () => {
//   const [message, setMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm your AI assistant. How can I help you today?",
//       sender: "ai",
//       time: "10:30 AM",
//       isTyping: false
//     },
//     {
//       id: 2,
//       text: "Hi there! I'd like to know more about your capabilities.",
//       sender: "user",
//       time: "10:32 AM",
//       isTyping: false
//     },
//     {
//       id: 3,
//       text: "I'm designed to help with a wide variety of tasks including answering questions, providing explanations, helping with analysis, creative writing, coding assistance, and much more. What specific area would you like to explore?",
//       sender: "ai",
//       time: "10:32 AM",
//       isTyping: false
//     },
//     {
//       id: 4,
//       text: "That sounds great! Can you help me with some creative writing?",
//       sender: "user",
//       time: "10:35 AM",
//       isTyping: false
//     }
//   ]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // const simulateAIResponse = (userMessage: string) => {
//   //   setIsTyping(true);

//   //   setTimeout(() => {
//   //     const aiResponses = [
//   //       "That's a great question! Let me help you with that.",
//   //       "I'd be happy to assist you with this. Here's what I think...",
//   //       "Interesting! Let me analyze this for you.",
//   //       "Absolutely! I can definitely help you with creative writing. What genre or style are you interested in exploring?",
//   //       "I understand what you're looking for. Let me provide some insights."
//   //     ];

//   //     const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

//   //     const newAIMessage = {
//   //       id: messages.length + 2,
//   //       text: randomResponse,
//   //       sender: "ai",
//   //       time: new Date().toLocaleTimeString('en-US', {
//   //         hour: 'numeric',
//   //         minute: '2-digit',
//   //         hour12: true
//   //       }),
//   //       isTyping: false
//   //     };

//   //     setMessages(prev => [...prev, newAIMessage]);
//   //     setIsTyping(false);
//   //   }, 1500);
//   // };

//   // const handleSendMessage = () => {
//   //   if (message.trim()) {
//   //     const newMessage = {
//   //       id: messages.length + 1,
//   //       text: message,
//   //       sender: "user",
//   //       time: new Date().toLocaleTimeString('en-US', {
//   //         hour: 'numeric',
//   //         minute: '2-digit',
//   //         hour12: true
//   //       }),
//   //       isTyping: false
//   //     };

//   //     setMessages(prev => [...prev, newMessage]);
//   //     const currentMessage = message;
//   //     setMessage('');

//   //     // Simulate AI response
//   //     simulateAIResponse(currentMessage);
//   //   }
//   // };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       {/* Header */}
//       <div className="bg-black/90 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex items-center justify-between shadow-2xl">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//               <Bot className="w-7 h-7 text-white" />
//             </div>
//             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
//               <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-white flex items-center gap-2">
//               AI Assistant
//               <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
//             </h1>
//             <p className="text-sm text-green-400 font-medium">Online & Ready to Help</p>
//           </div>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
//         {messages.map((msg) => (
//           <div
//             key={msg.id}
//             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-3 duration-500`}
//           >
//             <div className={`flex items-start space-x-3 max-w-4xl ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//               {/* Avatar */}
//               <div className={`flex-shrink-0 ${msg.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
//                 {msg.sender === 'ai' ? (
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
//                     <User className="w-5 h-5 text-white" />
//                   </div>
//                 )}
//               </div>

//               {/* Message Bubble */}
//               <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
//                 <div
//                   className={`px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm border ${msg.sender === 'user'
//                     ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500/30 rounded-br-lg'
//                     : 'bg-white/10 text-white border-gray-600/30 rounded-bl-lg'
//                     } transition-all duration-300 hover:shadow-xl`}
//                 >
//                   <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
//                   <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
//                     {msg.time}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {isTyping && (
//           <div className="flex justify-start animate-in slide-in-from-bottom-3 duration-500">
//             <div className="flex items-start space-x-3 max-w-4xl">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                 <Bot className="w-5 h-5 text-white" />
//               </div>
//               <div className="px-6 py-4 rounded-3xl rounded-bl-lg bg-white/10 border border-gray-600/30 shadow-lg backdrop-blur-sm">
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="bg-black/50 backdrop-blur-xl border-t border-gray-700/50 px-6 py-4">
//         <div className="flex items-end space-x-4 max-w-4xl mx-auto">
//           <div className="flex-1 relative">
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me anything..."
//               className="w-full px-6 py-4 bg-gray-800/50 border border-gray-600/50 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 text-sm backdrop-blur-sm"
//               rows={1}
//               style={{
//                 minHeight: '56px',
//                 maxHeight: '120px',
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none'
//               }}
//             />
//           </div>

//           <button
//             onClick={handleSendMessage}
//             disabled={!message.trim() || isTyping}
//             className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Quick Actions */}
//         <div className="flex items-center justify-center mt-4 space-x-2">
//           <div className="text-xs text-gray-500">Press Enter to send • Shift+Enter for new line</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatUI;

// pages/chat.tsx (Next.js, TypeScript, Tailwind CSS)
"use client"
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';


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
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault?.();
    if (!input.trim()) return;
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input },
      { sender: "assistant", text: "I'm here to help! Thanks for your message." },
    ]);
    setInput("");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="fixed top-0 w-full z-50  bg-gray-900/60 backdrop-blur-sm text-white py-4 px-6 flex justify-between items-center shadow-md">
          {/* Left side */}
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            My Assistant
          </h1>


          {/* Right side: Home text + icon */}
          <div className="flex items-center gap-2 cursor-pointer">

            <Link href='/' ><FaHome size={24} className="text-green-500" /></Link>

          </div>
        </header>



        {/* Main area with background photo */}
        <main
          className="flex-1 relative bg-cover bg-center bg-no-repeat bg-fixed overflow-y-auto p-4 py-20"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://media.istockphoto.com/id/1216688115/vector/seamless-pattern-with-social-media-elements.jpg?s=612x612&w=0&k=20&c=5c_iSGEPfiNFNKsR2cZaix1plXGuTip3gYF9RYSsCIo=')`
          }}
        >
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-3 rounded-lg max-w-md shadow-lg
                ${msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>
        </main>

        {/* Bottom input */}
        <div className="fixed bottom-0 left-0 w-full z-40 bg-gray-600/60  backdrop-blur-sm border-t border-gray-200 p-2 ">
          <div className="max-w-4xl mx-auto flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <input
              ref={inputRef}
              className="flex-1 border border-red-500 bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:border-red-700 transition duration-200 w-[50%] sm:w-auto"
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
              autoFocus
            />
            <button
              onClick={sendMessage}
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>


      </div>
    </>
  );
}

