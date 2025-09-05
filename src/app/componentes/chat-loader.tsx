import { Message, MessageContent } from "@/components/message";
import { Loader } from '@/components/loader';


export function ChatLoader() {
  return (
    <Message from="assistant">
      <MessageContent>
        <div className="flex items-center gap-2">
          <Loader />
          Cargando...
        </div>
      </MessageContent>
    </Message>
  )
}