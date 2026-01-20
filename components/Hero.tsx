import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface HeroProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto pt-20 pb-12 px-6 text-center z-10">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight serif">
          Data <span className="text-indigo-600 font-light">&</span> Humanities
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          데이터의 이성과 인문학의 감성을 결합하여 <br className="hidden md:block"/>
          세상을 움직이는 콘텐츠를 기획합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isLoading ? 'animate-pulse' : ''}`}></div>
        <div className="relative flex items-center bg-white rounded-full shadow-xl">
          <div className="pl-6 text-slate-400">
            <Sparkles size={20} />
          </div>
          <input
            type="text"
            className="w-full py-4 px-4 text-lg text-slate-800 bg-transparent border-none focus:ring-0 placeholder-slate-400 focus:outline-none"
            placeholder="기획하고 싶은 주제를 입력하세요 (예: 잊혀진 계절, 도시의 고독)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="mr-2 my-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-full p-3 transition-all duration-300"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search size={20} />
            )}
          </button>
        </div>
      </form>
      
      {isLoading && (
        <div className="mt-8 text-indigo-600 font-medium animate-pulse flex flex-col items-center gap-2">
           <span>Gemini가 데이터를 분석하고 인문학적 가치를 찾고 있습니다...</span>
           <span className="text-xs text-indigo-400">Youtube, News, SNS, History DB Search Active</span>
        </div>
      )}
    </div>
  );
};

export default Hero;