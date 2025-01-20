# 树洞 - 匿名留言板

一个简单的匿名留言板，让你说出心里话。

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui
- Supabase
- TypeScript

## 本地开发

1. 克隆项目
```bash
git clone <your-repo-url>
cd shudong
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
```
然后编辑 `.env.local` 文件，填入你的 Supabase 配置。

4. 启动开发服务器
```bash
npm run dev
```

## 部署

1. Fork 这个仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 设置环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 部署

## 数据库设置

在 Supabase SQL 编辑器中运行以下 SQL：

```sql
create table messages (
  id uuid default gen_random_uuid() primary key,
  recipient_name text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ip_address text,
  metadata jsonb
);

-- 启用 RLS (行级安全)
alter table messages enable row level security;

-- 创建策略
create policy "启用匿名插入" on messages for insert with check (true);
create policy "启用匿名读取" on messages for select using (true);
```

## 许可证

MIT
