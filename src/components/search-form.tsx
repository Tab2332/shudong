"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchForm() {
  const router = useRouter()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    if (name) {
      router.push(`/search?name=${encodeURIComponent(name.toString())}`)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="text"
        name="name"
        placeholder="输入收件人姓名..."
        className="flex-1"
      />
      <Button type="submit">搜索</Button>
    </form>
  )
} 