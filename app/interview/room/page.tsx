'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InterviewRoom() {
    const router = useRouter();
    const [conversationUrl, setConversationUrl] = useState<string | null>(null);

    useEffect(() => {
        const url = sessionStorage.getItem('conversation_url');
        if (!url) {
            router.push('/');
            return;
        }
        setConversationUrl(url);
    }, [router]);

    const handleEndInterview = () => {
        if (confirm('Are you sure you want to end the interview?')) {
            sessionStorage.removeItem('conversation_url');
            router.push('/');
        }
    };

    if (!conversationUrl) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl font-medium">Entering Interview Room...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-black overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                        Interview Session
                    </h1>
                    <p className="text-xs text-gray-500">Real-time AI Conversation</p>
                </div>
                <button
                    onClick={handleEndInterview}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-2 rounded-xl font-semibold transition-all"
                >
                    End Interview
                </button>
            </div>

            <div className="flex-grow relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                <iframe
                    src={conversationUrl}
                    allow="camera; microphone; display-capture; autoplay; encrypted-media"
                    className="absolute inset-0 w-full h-full border-0"
                    title="Tavus Interview"
                />
            </div>

            <div className="mt-4 flex justify-center">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Live Connection Established</span>
                </div>
            </div>
        </div>
    );
}
