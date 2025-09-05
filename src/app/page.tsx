'use client'

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/conversation";
import { ChatInput } from "./componentes/chat-input";
import { ChatLoader } from "./componentes/chat-loader";
import { ChatMessage } from "./componentes/chat-message";
import { useChat } from "./hooks/use-zombie-game";

export default function Home() {
  const { messages, input, isLoading, startChat, handleSubmit, handleInputChange } = useChat()

  return (
    <div className="font-sans h-dvh mx-auto overflow-hidden ">
      
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent className="max-w-xl mx-auto">
            {
              messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))
            }
            {isLoading && <ChatLoader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="max-w-2xl w-full mx-auto pb-4">
          <ChatInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
