'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                            InterviewTwin
                        </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                        <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            Home
                        </Link>
                        <Link href="/interview/give" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            Give Interview
                        </Link>
                        <Link href="/interview/take" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            Take Interview
                        </Link>
                        <div className="pl-4 border-l border-white/10">
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
