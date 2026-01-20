import { GoogleGenAI, Type } from "@google/genai";
import { ContentProposal } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateProposal = async (topic: string): Promise<ContentProposal> => {
  const ai = getClient();
  
  const systemInstruction = `
    당신은 데이터 사이언티스트이자 인문학 작가입니다. 
    사용자가 제시한 주제에 대해 데이터(유튜브 댓글, 뉴스, SNS, 역사)에 기반한 분석과, 
    그것을 관통하는 인문학적 통찰을 결합하여 창의적인 콘텐츠(영상 또는 스토리북) 기획안을 작성해야 합니다.
    
    반드시 다음 원칙을 지키세요:
    1. 분석은 구체적이고 논리적이어야 합니다. (실제 검색 도구를 사용하여 최신 트렌드 반영)
    2. 인문학적 통찰은 깊이 있고 감동적이어야 합니다.
    3. 모든 출력은 '한국어'로 작성되어야 합니다.
    4. 어조는 전문적이면서도 영감을 주는 톤으로 작성하세요.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `주제: ${topic}에 대한 창의적 콘텐츠 기획안을 작성해줘.`,
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }], // Enable grounding for accurate data
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "콘텐츠의 매력적인 제목" },
          subtitle: { type: Type.STRING, description: "제목을 보조하는 감성적인 부제" },
          concept_summary: { type: Type.STRING, description: "기획 의도 및 전체 컨셉 요약 (2-3문장)" },
          data_analysis: {
            type: Type.OBJECT,
            properties: {
              youtube_sentiment: { type: Type.STRING, description: "해당 주제 관련 유튜브 댓글 여론 및 트렌드 분석" },
              news_keywords: { type: Type.STRING, description: "최신 뉴스 기사에서 나타나는 주요 키워드 및 사회적 이슈" },
              sns_reaction: { type: Type.STRING, description: "SNS(트위터, 인스타 등)에서의 대중적 반응 및 밈(Meme) 요소" },
              historical_context: { type: Type.STRING, description: "주제와 관련된 역사적 사실, 문학적 배경 또는 고전 인용" }
            },
            required: ["youtube_sentiment", "news_keywords", "sns_reaction", "historical_context"]
          },
          humanities_insight: { type: Type.STRING, description: "데이터 너머의 인간 본성이나 사회적 의미에 대한 철학적 통찰" },
          core_message: { type: Type.STRING, description: "대중에게 전달하고자 하는 핵심 메시지 (한 문장)" },
          target_audience: { type: Type.STRING, description: "주 타겟 독자/시청자 층" },
          format_suggestion: { type: Type.STRING, enum: ["Video", "Storybook", "Hybrid"], description: "추천 포맷" },
          story_outline: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "기승전결 구조의 스토리 개요 (4-5단계)" 
          },
          visual_concept_prompt: { type: Type.STRING, description: "이 기획안의 분위기를 가장 잘 나타내는 이미지 생성을 위한 영어 프롬프트" }
        },
        required: ["title", "subtitle", "concept_summary", "data_analysis", "humanities_insight", "core_message", "format_suggestion", "story_outline", "visual_concept_prompt"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response generated");
  
  return JSON.parse(text) as ContentProposal;
};

export const generateConceptArt = async (prompt: string): Promise<string> => {
  const ai = getClient();
  
  // Use a more creative model for the image
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Create a cinematic, high-quality concept art for a storybook or movie poster. Style: Emotional, Detailed, Digital Art. Description: ${prompt}`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      }
    }
  });

  // Extract image
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Image generation failed");
};
