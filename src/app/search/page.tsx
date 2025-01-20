import { Suspense } from 'react'
import Link from 'next/link'
import { MessageList } from '@/components/message-list'
import { SearchForm } from '@/components/search-form'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

async function getMessages(name: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .ilike('recipient_name', `%${name}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('获取留言失败:', error)
    return []
  }

  return data
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ name: string }>
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

  const messages = await getMessages(name)

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
        <MessageList messages={messages} />
      </Suspense>
    </main>
  )
} 