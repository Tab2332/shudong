import { Message } from '@/types'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">
              致 {message.recipient_name}
            </h3>
            <time className="text-sm text-muted-foreground">
              {new Date(message.created_at).toLocaleString('zh-CN')}
            </time>
          </div>
          <p className="text-base whitespace-pre-wrap">{message.content}</p>
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          还没有留言...
        </div>
      )}
    </div>
  )
} 