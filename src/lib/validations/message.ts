import * as z from "zod"

export const messageSchema = z.object({
  recipient_name: z.string().min(1, "收信人名字不能为空").max(50, "名字最多50个字符"),
  content: z.string().min(1, "留言内容不能为空").max(1000, "留言内容最多1000个字符"),
}) 