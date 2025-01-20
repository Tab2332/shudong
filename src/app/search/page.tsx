import { Suspense } from 'react'
import Link from 'next/link'
import { MessageList } from '@/components/message-list'
import { SearchForm } from '@/components/search-form'
import { Button } from '@/components/ui/button'
import { Message } from '@/types'

// 临时使用模拟数据
const mockMessages: Message[] = [
  {
    id: '1',
    recipient_name: '测试用户',
    content: '这是一条测试留言',
    created_at: new Date().toISOString(),
  }
]

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ name: string; page: string }>
}) {
  const params = await searchParams
  const { name } = params

  if (!name) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-8">搜索留言</h1>
        <SearchForm />
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline">返回首页</Button>
        </Link>
        <h1 className="text-2xl font-bold">搜索结果: {name}</h1>
      </div>

      <div className="mb-8">
        <SearchForm />
      </div>

      <Suspense fallback={<div>搜索中...</div>}>
        <MessageList messages={mockMessages} />
      </Suspense>
    </main>
  )
} 