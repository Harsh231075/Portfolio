'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message { role: 'user' | 'assistant'; content: string }


export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const followRef = useRef(true);

  useEffect(() => () => requestRef.current?.abort(), []);
  useEffect(() => {
    const area = inputRef.current;
    if (area) { area.style.height = 'auto'; area.style.height = `${Math.min(area.scrollHeight, 144)}px`; }
  }, [input]);
  useEffect(() => {
    if (followRef.current) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [messages, loading, error]);

  function newChat() {
    requestRef.current?.abort();
    requestRef.current = null;
    busyRef.current = false;
    followRef.current = true;
    setMessages([]); setInput(''); setLoading(false); setError(null); setFailedQuestion(null);
    inputRef.current?.focus({ preventScroll: true });
  }

  async function sendMessage(question = input, retry = false) {
    const text = question.trim();
    if (!text || busyRef.current || text.length > 2000) return;
    busyRef.current = true;
    const controller = new AbortController();
    requestRef.current = controller;
    const history = (retry ? messages.slice(0, -1) : messages).slice(-30);
    while (history.reduce((sum, message) => sum + message.content.length, 0) > 12000) history.shift();
    if (!retry) setMessages(previous => [...previous, { role: 'user', content: text }]);
    setInput(''); setError(null); setFailedQuestion(null); setLoading(true);
    followRef.current = true;
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: text, history }), signal: controller.signal });
      const data: { answer?: string; error?: string } = await response.json();
      if (!response.ok || typeof data.answer !== 'string' || !data.answer.trim()) throw new Error(response.ok ? 'The assistant returned an empty reply. Please try again.' : data.error || 'The assistant is temporarily unavailable. Please try again.');
      const answer = data.answer;
      if (requestRef.current === controller) setMessages(previous => [...previous, { role: 'assistant', content: answer }]);
    } catch (cause) {
      if (!controller.signal.aborted && requestRef.current === controller) {
        setError(cause instanceof TypeError ? 'Couldn’t connect. Check your connection and try again.' : cause instanceof Error ? cause.message : 'Something went wrong. Please try again.');
        setFailedQuestion(text);
      }
    } finally {
      if (requestRef.current === controller) { requestRef.current = null; busyRef.current = false; setLoading(false); }
    }
  }

  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-[#0d0f12] text-gray-200" style={{ fontFamily: "'IBM Plex Sans', Arial, sans-serif" }}>
      <header className="mx-auto flex w-full max-w-3xl shrink-0 items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-8 sm:py-5 lg:max-w-4xl">
        <div><h1 className="text-base font-medium tracking-tight text-white sm:text-lg">Harsh’s assistant</h1><p className="mt-1 text-[11px] text-gray-500">Projects, experience, and a little more.</p></div>
        <nav aria-label="Chat navigation" className="flex shrink-0 items-center gap-4 text-xs text-gray-400 sm:gap-6">
          <Link href="/" className="inline-flex min-h-11 items-center hover:text-white focus-visible:outline-1 focus-visible:outline-gray-400">Portfolio</Link>
          <button type="button" onClick={newChat} className="min-h-11 hover:text-white focus-visible:outline-1 focus-visible:outline-gray-400">New chat</button>
        </nav>
      </header>

      <main
        ref={scrollRef}
        onScroll={event => { const el = event.currentTarget; followRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120; }}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12 lg:max-w-4xl">
          <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className={messages.length === 0 ? 'my-auto lg:mb-0' : 'space-y-9'}>
            {messages.length === 0 && (
              <div className="mx-auto max-w-md pb-10 text-center lg:max-w-2xl lg:pb-3">
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-teal-300/80">A conversation about my work</p>
                <h2 className="text-2xl font-medium leading-tight tracking-tight text-white sm:text-3xl lg:text-[40px]">What would you like to know?</h2>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-gray-500 lg:max-w-md lg:text-base lg:text-gray-400">Ask about Harsh’s projects, experience, or the technologies he works with.</p>
                <div aria-label="Conversation starters" className="mt-7 hidden items-center justify-center gap-7 text-sm lg:flex">
                  {[
                    { label: 'Explore projects', question: 'What are Harsh’s top projects?' },
                    { label: 'Work experience', question: 'Tell me about Harsh’s professional experience.' },
                    { label: 'Skills & tools', question: 'What technologies does Harsh work with?' },
                  ].map(({ label, question }) => (
                    <button key={label} type="button" onClick={() => void sendMessage(question)} className="min-h-11 border-b border-gray-700 text-gray-400 transition-colors hover:border-teal-400 hover:text-teal-300 focus-visible:outline-1 focus-visible:outline-teal-400">{label}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`min-w-0 ${message.role === 'user' ? 'ml-auto max-w-[85%]' : 'w-full'}`}>
                <p className={`mb-2 text-[11px] font-medium ${message.role === 'user' ? 'text-gray-500' : 'text-teal-300/80'}`}>{message.role === 'user' ? 'You' : 'Assistant'}</p>
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap break-words text-[15px] leading-7 text-white">{message.content}</p>
                ) : (
                  <div className="break-words text-[15px] leading-7 [&_a]:break-all [&_a]:text-gray-100 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-white [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_h1]:mb-3 [&_h1]:text-xl [&_h2]:mb-3 [&_h2]:text-lg [&_h3]:mb-2 [&_h3]:font-semibold [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:py-2 [&_code]:text-xs [&_blockquote]:border-l [&_blockquote]:border-gray-700 [&_blockquote]:pl-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ children, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>,
                        table: ({ children, ...props }) => <div className="my-3 overflow-x-auto"><table {...props} className="w-full border-collapse text-left [&_td]:border-b [&_td]:border-gray-800 [&_td]:p-2 [&_th]:border-b [&_th]:border-gray-700 [&_th]:p-2">{children}</table></div>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
          {loading && <p role="status" className="mt-6 text-sm text-gray-500">Thinking…</p>}
          {error && (
            <div role="alert" className="mt-6 text-sm leading-6 text-gray-400">
              <p>{error}</p>
              {failedQuestion && <button type="button" onClick={() => void sendMessage(failedQuestion, true)} className="mt-1 min-h-11 text-white underline underline-offset-4">Try again</button>}
            </div>
          )}
        </div>
      </main>

      <footer className={`mx-auto w-full max-w-3xl shrink-0 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 lg:max-w-4xl ${messages.length === 0 ? 'lg:mb-[clamp(3rem,14vh,10rem)]' : ''}`}>
        <form
          onSubmit={event => { event.preventDefault(); void sendMessage(); }}
          className="flex items-end gap-4 border-b border-gray-700/80 pb-3 pt-2 transition-colors focus-within:border-teal-500/70 lg:pb-4 lg:pt-3"
        >
          <label htmlFor="chat-message" className="sr-only">Your message</label>
          <textarea
            id="chat-message"
            ref={inputRef}
            value={input}
            maxLength={2000}
            rows={1}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                void sendMessage();
              }
            }}
            placeholder="Ask a question…"
            className="block max-h-36 min-h-12 min-w-0 flex-1 resize-none bg-transparent py-3 text-base leading-6 text-white outline-none placeholder:text-gray-500"
          />
          <button type="submit" disabled={loading || !input.trim()} className="min-h-12 shrink-0 px-2 text-sm font-medium text-teal-300 hover:text-teal-200 focus-visible:outline-1 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:text-gray-600">Send</button>
        </form>
        <p className="mt-3 text-[11px] text-gray-600">{input.length > 1800 ? `${input.length}/2000` : 'Enter to send · Shift + Enter for a new line'}</p>
      </footer>
    </div>
  );
}
