export interface Message {
  id: string
  recipient_name: string
  content: string
  created_at: string
  ip_address?: string
  metadata?: Record<string, unknown>
}

export type NewMessage = Omit<Message, 'id' | 'created_at'> 