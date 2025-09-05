export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratedImage {
  base64Data: string;
  mediaType: string;
  uint8ArrayData?: Uint8Array;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string
}

export interface GenerateStoryRequest {
  userMessage: string;
  conversationHistory: ConversationMessage[];
  isStart: boolean;
}

export interface GenerateImageRequest {
  imagePrompt: string;
}

export interface GenerateStoryResponse {
  text: string;
  imagePrompt: string;
}