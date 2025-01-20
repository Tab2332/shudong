import { Suspense } from 'react'
import { MessageForm } from '@/components/message-form'
import { MessageList } from '@/components/message-list'
import { SearchForm } from '@/components/search-form'
import { Pagination } from '@/components/pagination'
import { Message } from '@/types'
import { messageSchema } from '@/lib/validations/message'
import * as z from 'zod'

const MESSAGES_PER_PAGE = 10

// 临时使用模拟数据
const mockMessages: Message[] = [
  {
    id: '1',
    recipient_name: '测试用户',
    content: '这是一条测试留言',
    created_at: new Date().toISOString(),
  }
]

async function createMessage(data: z.infer<typeof messageSchema>) {
  'use server'
  console.log('收到新留言:', data)
  // TODO: 集成Supabase后实现真实的数据存储
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">树洞</h1>
      
      <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
        <div className="space-y-8">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">写留言</h2>
            <MessageForm onSubmit={createMessage} />
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">搜索</h2>
            <SearchForm />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">最新留言</h2>
          <Suspense fallback={<div>加载中...</div>}>
            <MessageList messages={mockMessages} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
