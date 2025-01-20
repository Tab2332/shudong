import { NextRequest, NextResponse } from 'next/server'
import { messageSchema } from '@/lib/validations/message'
import { supabase } from '@/lib/supabase'

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for')
  const vercelIp = request.headers.get('x-vercel-ip')
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }
  
  if (vercelForwardedFor) {
    return vercelForwardedFor
  }
  
  if (vercelIp) {
    return vercelIp
  }
  
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = messageSchema.parse(body)
    
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        ...validatedData,
        ip_address: getClientIp(request),
        metadata: {
          user_agent: request.headers.get('user-agent'),
        },
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('创建留言失败:', error)
    return NextResponse.json(
      { error: '创建留言失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const name = searchParams.get('name')
    const limit = 10
    const start = (page - 1) * limit
    const end = start + limit - 1

    let query = supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, end)

    if (name) {
      query = query.ilike('recipient_name', `%${name}%`)
    }

    const { data: messages, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      messages,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error('获取留言失败:', error)
    return NextResponse.json(
      { error: '获取留言失败' },
      { status: 500 }
    )
  }
} 