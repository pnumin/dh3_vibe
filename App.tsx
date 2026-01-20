import React, { useState } from 'react';
import Hero from './components/Hero';
import ProposalCard from './components/ProposalCard';
import { generateProposal, generateConceptArt } from './services/geminiService';
import { ContentProposal, AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [proposal, setProposal] = useState<ContentProposal | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (topic: string) => {
    setAppState(AppState.ANALYZING);
    setError(null);
    setProposal(null);
    setImageUrl(null);

    try {
      // 1. Generate Text Proposal
      const data = await generateProposal(topic);
      setProposal(data);
      setAppState(AppState.GENERATING_IMAGE);

      // 2. Generate Image based on prompt from proposal
      // We don't block the UI rendering of the text, but show loading for image
      generateConceptArt(data.visual_concept_prompt)
        .then((url) => {
          setImageUrl(url);
          setAppState(AppState.COMPLETE);
        })
        .catch((err) => {
          console.error("Image generation failed", err);
          setAppState(AppState.COMPLETE); // Complete even if image fails
        });

    } catch (err) {
      console.error(err);
      setError("기획안을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setAppState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="w-full py-6 px-8 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="text-xl font-bold tracking-tight text-slate-900 serif">
          Insight<span className="text-indigo-600">Flow</span>
        </div>
        <div className="text-sm font-medium text-slate-400">
          Powered by Gemini
        </div>
      </nav>

      <main className="relative">
        {/* Background decorative elements */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <Hero onSearch={handleSearch} isLoading={appState === AppState.ANALYZING || appState === AppState.GENERATING_IMAGE} />

        {error && (
          <div className="max-w-md mx-auto p-4 bg-red-50 text-red-600 rounded-lg text-center mb-8 border border-red-100">
            {error}
          </div>
        )}

        {proposal && (
          <ProposalCard data={proposal} imageUrl={imageUrl} />
        )}
      </main>
      
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>&copy; 2024 Insight Flow. Creative Intelligence.</p>
      </footer>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;