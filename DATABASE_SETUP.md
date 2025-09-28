# 🗄️ Database Setup Guide

## Step 1: Create .env.local File

Create a `.env.local` file in your project root with the following content:

```env
# Supabase Database (Replace [YOUR-PASSWORD] with your actual password)
DATABASE_URL=postgresql://postgres.tcazvqlqqwdqoryawzdc:[YOUR-PASSWORD]@aws-1-eu-central-1.pooler.supabase.com:6543/postgres

# NextAuth (Generate a random secret)
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# OpenAI API (Get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase (Optional - for direct API access)
NEXT_PUBLIC_SUPABASE_URL=https://tcazvqlqqwdqoryawzdc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 2: Replace Placeholders

1. **Replace `[YOUR-PASSWORD]`** with your actual Supabase database password
2. **Generate NEXTAUTH_SECRET**: Run `openssl rand -base64 32` or use any random string generator
3. **Get OpenAI API Key**: Visit https://platform.openai.com/api-keys
4. **Get Supabase Anon Key**: From your Supabase dashboard → Settings → API

## Step 3: Run Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init

# (Optional) View your database in Prisma Studio
npx prisma studio
```

## Step 4: Seed Initial Data (Optional)

Create a seed file to populate your database with initial learning content:

```bash
# Create seed file
touch prisma/seed.ts
```

## Step 5: Test Database Connection

Create a test API route to verify your database connection:

```typescript
// app/api/test-db/route.ts
import { db } from '@/lib/db'

export async function GET() {
  try {
    const userCount = await db.user.count()
    return Response.json({ 
      success: true, 
      message: 'Database connected successfully',
      userCount 
    })
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Database connection failed' 
    }, { status: 500 })
  }
}
```

## Database Schema Overview

Your database includes the following tables:

- **users** - User accounts and profiles
- **user_progress** - Learning progress tracking
- **sections** - Learning content sections
- **code_examples** - Interactive code examples
- **questions** - Community Q&A
- **answers** - Answers to questions
- **discussions** - Community discussions
- **replies** - Discussion replies
- **achievements** - User achievements
- **learning_interactions** - AI learning interactions

## Next Steps

1. ✅ Set up environment variables
2. ✅ Run database migration
3. 🔄 Create seed data for learning content
4. 🔄 Set up API routes for data access
5. 🔄 Integrate with your React learning platform

## Troubleshooting

### Common Issues:

1. **Connection refused**: Check your database password and connection string
2. **Migration fails**: Ensure your database is accessible and has proper permissions
3. **Prisma client not found**: Run `npx prisma generate` after schema changes

### Useful Commands:

```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# View database in browser
npx prisma studio

# Check database connection
npx prisma db pull

# Generate new migration
npx prisma migrate dev --name your_migration_name
```
