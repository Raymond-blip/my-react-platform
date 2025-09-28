# Database Setup Instructions

## 1. Create .env.local file

Create a `.env.local` file in your project root with the following content:

```env
# Supabase Database
DATABASE_URL=postgresql://postgres.tcazvqlqqwdqoryawzdc:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:6543/postgres

# NextAuth (Already configured)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# OpenAI API (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase (Optional - for direct API access)
NEXT_PUBLIC_SUPABASE_URL=https://tcazvqlqqwdqoryawzdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 2. Replace [YOUR-PASSWORD] with your actual database password

## 3. Get your Supabase anon key from your Supabase dashboard

## 4. Install Prisma for database management

```bash
npm install prisma @prisma/client
npx prisma init
```

## 5. Update prisma/schema.prisma with your database URL

## 6. Create and run migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```
