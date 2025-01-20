import { Message } from '@/types'

export function MessageList({ messages }: { messages: Message[] }) {
  if (!messages.length) {
    return <div className="text-center text-muted-foreground">暂无留言</div>
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-4 rounded-lg border bg-card"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium">
              给 {message.recipient_name} 的留言
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(message.created_at).toLocaleString()}
            </div>
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  )
} 