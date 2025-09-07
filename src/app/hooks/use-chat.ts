import { useEffect, useState } from "react";
import type {
  ConversationMessage,
  GenerateStoryResponse,
  Message,
} from "@/lib/types";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      startChat();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const startChat = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        body: JSON.stringify({ isStart: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = (await response.json()) as GenerateStoryResponse;

      const messageId = crypto.randomUUID();

      const newMessage: Message = {
        id: messageId,
        role: "assistant",
        content: data.text,
      };

      setMessages([newMessage]);
      // generateImage(messageId, data.imagePrompt)
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const generateImage = async (messageId: string, imagePrompt: string) => {
  //   try {
  //     const response = await fetch('/api/generate-image', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         imagePrompt: imagePrompt
  //       })
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to generate image')
  //     }

  //     const imageData = await response.json()

  //     setMessages(prevMessages => prevMessages.map(message => {
  //       if (message.id === messageId) {
  //         return { ...message, image: imageData.image, imageLoading: false }
  //       }

  //       return message
  //     }))
  //   } catch (error) {
  //     setMessages(prevMessages => prevMessages.map(message => {
  //       if (message.id === messageId) {
  //         return { ...message, imageLoading: false }
  //       }

  //       return message
  //     }))
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setIsLoading(true);
    setInput("");
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        body: JSON.stringify({
          userMessage: input,
          conversationHistory: messages,
          isStart: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = (await response.json()) as GenerateStoryResponse;

      const messageId = crypto.randomUUID();

      const assistantMessage: Message = {
        id: messageId,
        role: "assistant",
        content: data.text,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      // generateImage(messageId, data.imagePrompt)
    } catch (error) {
      console.error("Error generating story:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  return {
    messages,
    input,
    isLoading,
    startChat,
    handleSubmit,
    handleInputChange,
  };
}
