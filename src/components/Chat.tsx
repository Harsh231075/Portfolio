import Link from 'next/link';

export default function FloatingChatIcon() {
  return (
    <Link href="/chat" aria-label="Chat with Harsh’s AI assistant" className="fixed bottom-6 right-6 z-40 hidden min-h-11 items-center px-2 text-sm text-gray-300 underline underline-offset-4 hover:text-white focus-visible:outline-1 focus-visible:outline-gray-400 sm:flex">
      Chat with my assistant
    </Link>
  );
}
