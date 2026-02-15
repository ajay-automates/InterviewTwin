import Link from 'next/link';

interface InterviewCardProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    gradient: string;
}

export default function InterviewCard({ title, description, buttonText, href, gradient }: InterviewCardProps) {
    return (
        <div className={`relative group overflow-hidden rounded-2xl p-8 h-full flex flex-col justify-between border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] duration-300`}>
            <div className={`absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 blur-3xl rounded-full bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />

            <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">{title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {description}
                </p>
            </div>

            <div className="relative z-10 mt-auto">
                <Link
                    href={href}
                    className={`inline-block w-full py-4 px-6 rounded-xl font-semibold text-center transition-all bg-gradient-to-r ${gradient} hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]`}
                >
                    {buttonText}
                </Link>
            </div>
        </div>
    );
}
