import React from 'react';
import { ContentProposal } from '../types';
import { Youtube, Newspaper, Share2, BookOpen, Quote, Target, Layout, List, Sparkles } from 'lucide-react';

interface ProposalCardProps {
  data: ContentProposal;
  imageUrl: string | null;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ data, imageUrl }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-slate-100">
        <div className="relative h-64 md:h-96 w-full bg-slate-200 overflow-hidden">
          {imageUrl ? (
            <>
              <img 
                src={imageUrl} 
                alt={data.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
              <span className="text-sm">Generating Concept Art...</span>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-3xl">
            <div className="inline-block px-3 py-1 bg-indigo-600 text-xs font-bold tracking-wider uppercase rounded-full mb-4">
              {data.format_suggestion} Project
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2 serif leading-tight">
              {data.title}
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 font-light italic">
              {data.subtitle}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="flex-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Concept Summary</h3>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {data.concept_summary}
                </p>
             </div>
             <div className="w-full md:w-1/3 bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Target & Core Message</h3>
                <div className="flex items-start gap-3 mb-4">
                  <Target size={18} className="text-indigo-500 mt-1 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Target Audience</span>
                    <span className="font-medium text-slate-800">{data.target_audience}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Quote size={18} className="text-indigo-500 mt-1 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Core Message</span>
                    <span className="font-medium text-slate-800">"{data.core_message}"</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Data Analysis Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Data Evidence</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-red-600">
              <Youtube size={20} />
              <h4 className="font-bold">YouTube Trends</h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{data.data_analysis.youtube_sentiment}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <Newspaper size={20} />
              <h4 className="font-bold">News & Society</h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{data.data_analysis.news_keywords}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-pink-500">
              <Share2 size={20} />
              <h4 className="font-bold">SNS Reactions</h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{data.data_analysis.sns_reaction}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3 text-amber-700">
              <BookOpen size={20} />
              <h4 className="font-bold">Historical Context</h4>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{data.data_analysis.historical_context}</p>
          </div>
        </div>

        {/* Humanities & Story Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Creative Insight</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
            <h4 className="font-serif text-2xl text-indigo-900 mb-4 flex items-center gap-2">
              <Sparkles className="text-indigo-500" size={24} />
              Humanities Insight
            </h4>
            <p className="text-slate-700 leading-relaxed italic border-l-4 border-indigo-300 pl-4">
              {data.humanities_insight}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Layout size={20} className="text-slate-400" />
              Story Structure
            </h4>
            <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-slate-100">
              {data.story_outline.map((step, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-indigo-500 bg-white z-10"></div>
                  <h5 className="text-xs font-bold text-indigo-500 uppercase mb-1">Step 0{index + 1}</h5>
                  <p className="text-slate-700 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;