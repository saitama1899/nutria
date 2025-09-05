import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { GAME_PROMPTS } from '@/lib/prompts'
import { GAME_CONFIG } from '@/lib/consts'
import { GenerateStoryRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationHistory, isStart }: GenerateStoryRequest = await request.json();

    let prompt: string = GAME_PROMPTS.INITIAL_CHAT;

    if (!isStart) {
      const historyText = conversationHistory.map(
        (message) => `${message.role}: ${message.content}`
      ).join('\n');

      prompt = GAME_PROMPTS.CONTINUE_CHAT(historyText, userMessage);
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt
    })

    console.log('Generated text:', text);

    return NextResponse.json({ text });
    
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Error generating story' }, { status: 500 });
  }
}