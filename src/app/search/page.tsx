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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">搜索留言</h1>
          <p className="text-lg text-muted-foreground">
            输入收件人姓名，查找相关留言
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <SearchForm />
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          <p>提示: 搜索是精确匹配的，请确保输入正确的名字</p>
        </div>
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

      <Suspense fallback={<div className="text-center py-8">搜索中...</div>}>
        <MessageList messages={messages} />
      </Suspense>

      {messages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">没有找到相关留言</p>
          <p>提示: 名字需要完全匹配才能找到留言</p>
        </div>
      )}
    </main>
  )
} 