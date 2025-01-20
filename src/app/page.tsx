import { Suspense } from 'react'
import { MessageForm } from '@/components/message-form'
import { MessageList } from '@/components/message-list'
import { SearchForm } from '@/components/search-form'
import { Message } from '@/types'
import { messageSchema } from '@/lib/validations/message'
import * as z from 'zod'

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

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">树洞</h1>
        <p className="text-lg text-muted-foreground">
          一个安全的角落，让你说出心里话
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
        <div className="space-y-8">
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">写留言</h2>
            <p className="text-sm text-muted-foreground mb-4">
              写下你想说的话，它会被安全地保存
            </p>
            <MessageForm onSubmit={createMessage} />
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">搜索</h2>
            <p className="text-sm text-muted-foreground mb-4">
              输入收件人姓名，查找相关留言
            </p>
            <SearchForm />
          </div>
        </div>

        <div>
          <div className="p-6 rounded-lg border bg-card">
            <h2 className="text-2xl font-semibold mb-4">最新留言</h2>
            <p className="text-sm text-muted-foreground mb-4">
              这里会显示最近收到的留言
            </p>
            <Suspense fallback={<div>加载中...</div>}>
              <MessageList messages={[]} />
            </Suspense>
          </div>

          <div className="mt-8 p-6 rounded-lg border bg-muted">
            <h3 className="font-medium mb-2">关于树洞</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• 所有留言都是匿名的</li>
              <li>• 留言会被安全加密存储</li>
              <li>• 只有收件人可以通过名字搜索到留言</li>
              <li>• 我们不会收集任何个人信息</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
