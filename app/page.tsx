import InterviewCard from '@/components/InterviewCard';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Master Your <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">Interview</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Choose your practice mode. Either face our AI interviewer or learn how you sound through your AI twin.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 h-[500px]">
        <InterviewCard
          title="Give Interview"
          description="A professional AI interviewer will ask you tough questions based on your target job and provide real-time feedback on your performance."
          buttonText="Start Interviewing"
          href="/interview/give"
          gradient="from-purple-600 to-indigo-600"
        />
        <InterviewCard
          title="Take Interview"
          description="Watch your AI twin answer interview questions as YOU. Learn the perfect way to articulate your experience using your own voice and data."
          buttonText="Practice Now"
          href="/interview/take"
          gradient="from-blue-600 to-cyan-600"
        />
      </div>

      <div className="mt-32 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest font-medium mb-8">Powered by Tavus CVI</p>
        <div className="flex justify-center space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Logo placeholders/icons could go here */}
          <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
          <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
          <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
