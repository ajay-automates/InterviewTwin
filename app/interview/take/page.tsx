'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';

export default function TakeInterviewSetup() {
    const router = useRouter();
    const [resume, setResume] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState('');
    const [jdFile, setJdFile] = useState<File | null>(null);
    const [jdType, setJdType] = useState<'text' | 'file'>('text');
    const [recruiterName, setRecruiterName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = async () => {
        if (!resume || (jdType === 'text' && !jobDescription) || (jdType === 'file' && !jdFile)) {
            alert('Please upload your resume and provide the job description (text or PDF).');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('resume', resume);
            if (jdType === 'text') {
                formData.append('jobDescription', jobDescription);
            } else if (jdFile) {
                formData.append('jdFile', jdFile);
            }
            formData.append('mode', 'take');
            formData.append('recruiterName', recruiterName);
            formData.append('companyName', companyName);

            const response = await fetch('/api/tavus', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to start interview');
            }

            const { conversation_url } = await response.json();

            sessionStorage.setItem('conversation_url', conversation_url);
            router.push('/interview/room');

        } catch (error: any) {
            console.error('Error starting interview:', error);
            setIsLoading(false);
            alert(error.message || 'Failed to start interview. Please try again.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-20">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Set up your <span className="text-blue-400">AI Twin</span></h1>
                <p className="text-gray-400">Upload your resume and the target JD. We&apos;ll create an AI twin that answers questions exactly like you would.</p>
            </div>

            <div className="space-y-10 bg-white/5 p-8 rounded-2xl border border-white/10">
                <FileUpload
                    label="Your Resume (PDF)"
                    onFileSelect={setResume}
                />

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-400">Recruiter Name</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-gray-600"
                            placeholder="e.g. Sarah"
                            value={recruiterName}
                            onChange={(e) => setRecruiterName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-400">Company Name</label>
                        <input
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-gray-600"
                            placeholder="e.g. Google"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-400">Job Description (Target Role)</label>
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            <button
                                onClick={() => setJdType('text')}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${jdType === 'text' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Paste Text
                            </button>
                            <button
                                onClick={() => setJdType('file')}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${jdType === 'file' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Upload PDF
                            </button>
                        </div>
                    </div>

                    {jdType === 'text' ? (
                        <textarea
                            className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder-gray-600"
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    ) : (
                        <FileUpload
                            label="JD PDF File"
                            onFileSelect={setJdFile}
                        />
                    )}
                </div>

                <button
                    onClick={handleStart}
                    disabled={isLoading || !resume || (jdType === 'text' ? !jobDescription : !jdFile)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2
            ${isLoading || !resume || (jdType === 'text' ? !jobDescription : !jdFile)
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]'}`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Syncing AI Twin...</span>
                        </>
                    ) : (
                        <span>Start Practice</span>
                    )}
                </button>
            </div>
        </div>
    );
}
