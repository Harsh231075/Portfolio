"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

      // Fixed: Remove duplicate user message
      setMessages((msgs) => [
        ...msgs,
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Fixed Header - Always visible */}
      <header className="sticky top-0 w-full z-50 bg-black/60 backdrop-blur text-white py-3 px-4 sm:px-6 flex justify-between items-center shadow-lg border-b border-white/20">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
          My Assistant
        </h1>
        <Link href="/" className="hover:scale-110 transition-transform duration-200">
          <FaHome size={20} className="text-green-800 hover:text-yellow-300" />
        </Link>
      </header>

      {/* Main chat area - Full width with smooth scroll */}
      <main
        className="flex-1 w-full overflow-y-auto overflow-x-hidden p-2 sm:p-4 pb-24 bg-cover bg-center bg-no-repeat bg-fixed scroll-smooth"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://media.istockphoto.com/id/1216688115/vector/seamless-pattern-with-social-media-elements.jpg?s=612x612&w=0&k=20&c=5c_iSGEPfiNFNKsR2cZaix1plXGuTip3gYF9RYSsCIo=')",
          scrollBehavior: 'smooth'
        }}
      >
        <div className="w-full max-w-none space-y-4 mt-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} px-4 sm:px-6 w-full`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                  : "bg-white text-gray-800 rounded-bl-md border-l-4 border-purple-500"
                  }`}
              >
                <div className="text-sm sm:text-base leading-relaxed break-words">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ ...props }) => (
                        <mark className="bg-yellow-200 px-1 rounded font-semibold" {...props} />
                      ),
                      ul: (props) => <ul className="list-disc ml-5 space-y-1" {...props} />,
                      ol: (props) => <ol className="list-decimal ml-5 space-y-1" {...props} />,
                      li: (props) => <li className="leading-snug" {...props} />,
                      p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                      code: (props) => (
                        <code className="bg-gray-200 text-pink-600 px-1 py-0.5 rounded text-xs" {...props} />
                      ),
                      pre: (props) => (
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-xs" {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start px-2">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-lg border-l-4 border-orange-500">
                <div className="flex items-center space-x-2">
                  <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full" style={{ animationDelay: '0.1s' }}></div>
                  <div className="animate-bounce w-2 h-2 bg-purple-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-gray-600 text-sm ml-2">Assistant is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>
      </main>

      {/* Fixed bottom input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 sm:p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={sendMessage} className="flex items-center gap-2 sm:gap-3">
            <input
              ref={inputRef}
              className="flex-1 border-2 border-gray-300 bg-white text-gray-800 rounded-full px-4 py-2 sm:py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 text-sm sm:text-base placeholder-gray-500"
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              // disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              // disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 sm:p-3 rounded-full hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}