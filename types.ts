export interface DataAnalysis {
  youtube_sentiment: string;
  news_keywords: string;
  sns_reaction: string;
  historical_context: string;
}

export interface ContentProposal {
  title: string;
  subtitle: string;
  concept_summary: string;
  data_analysis: DataAnalysis;
  humanities_insight: string;
  core_message: string;
  target_audience: string;
  format_suggestion: "Video" | "Storybook" | "Hybrid";
  story_outline: string[];
  visual_concept_prompt: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface GeneratedImage {
  url: string;
  alt: string;
}