"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { messageSchema } from '@/lib/validations/message'
import { useToast } from '@/components/ui/use-toast'

type FormData = z.infer<typeof messageSchema>

interface MessageFormProps {
  onSubmit: (data: FormData) => Promise<void>
}

export function MessageForm({ onSubmit }: MessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmitHandler = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      reset()
      toast({
        title: "提交成功",
        description: "你的留言已经发送成功",
      })
    } catch (error) {
      console.error('提交留言失败:', error)
      toast({
        variant: "destructive",
        title: "提交失败",
        description: "提交留言时发生错误，请稍后重试",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <Input
          {...register('recipient_name')}
          placeholder="收信人名字"
          className="w-full"
        />
        {errors.recipient_name && (
          <p className="text-sm text-red-500 mt-1">{errors.recipient_name.message}</p>
        )}
      </div>
      
      <div>
        <Textarea
          {...register('content')}
          placeholder="写下你想说的话..."
          className="w-full min-h-[150px]"
        />
        {errors.content && (
          <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '提交中...' : '发送留言'}
      </Button>
    </form>
  )
} 