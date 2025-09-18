import DOMPurify from "dompurify";
import { Image } from "@/components/image";
import { Loader } from "@/components/loader";
import { Message, MessageContent } from "@/components/message";
import { Response } from "@/components/response";
import { UI_MESSAGES } from "@/lib/consts";
import type { Message as MessageType } from "@/lib/types";

export function ChatMessage({ message }: { message: MessageType }) {
  const { role, content } = message;

  return (
    <Message from={role}>
      <MessageContent>
        {/* {
          role === 'assistant' && (
            <picture className="w-full max-w-2xl aspect-video overflow-hidden rounded-md">
              {
                imageLoading && (
                  <div className="w-full h-full flex items-center justify-center bg-black/10">
                    <div className="flex mb-4 space-x-2">
                      <Loader />
                      <span>{UI_MESSAGES.LOADING.IMAGE}</span>
                    </div>
                  </div>
                )
              }

              {image && (
                <Image
                  base64={image.base64Data}
                  mediaType={image.mediaType}
                  uint8Array={new Uint8Array()}
                  alt="zombie apocalypse pixel art image"
                  className="w-full h-full object-cover object-center"
                />
                
              )}
            </picture>
          )
        }
       */}
        <Response>{content}</Response>
        {/* <Response>{DOMPurify.sanitize(content)}</Response> */}
      </MessageContent>
    </Message>
  );
}
