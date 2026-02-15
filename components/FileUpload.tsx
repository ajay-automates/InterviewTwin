'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
    label: string;
    onFileSelect: (file: File | null) => void;
    acceptedFileTypes?: string;
}

export default function FileUpload({ label, onFileSelect, acceptedFileTypes = '.pdf' }: FileUploadProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center bg-white/5 
          ${isDragging ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 hover:border-white/20 hover:bg-white/10'}`}
            >
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={acceptedFileTypes}
                />

                <div className="mb-4 p-4 rounded-full bg-white/5">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </div>

                {fileName ? (
                    <p className="text-white font-medium">{fileName}</p>
                ) : (
                    <p className="text-gray-400 text-center">
                        <span className="text-purple-400 font-semibold">Click to upload</span> or drag and drop<br />
                        <span className="text-xs">PDF (max. 10MB)</span>
                    </p>
                )}
            </div>
        </div>
    );
}
