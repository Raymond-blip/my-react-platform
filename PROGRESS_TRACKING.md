# Progress Tracking System

The React Learning Platform now includes a comprehensive progress tracking system that monitors each user's learning journey through the React curriculum.

## 🎯 Features

### Real-time Progress Monitoring
- **Lesson Completion Tracking**: Automatically tracks which lessons each user has completed
- **Time Spent Analytics**: Records time spent on each lesson for detailed analytics
- **Progress Persistence**: User progress is saved both locally and in the database
- **Cross-device Sync**: Progress syncs across devices when users log in

### User Authentication
- **Simple Login System**: Users can log in with just their name (email optional)
- **Anonymous Mode**: Works without login using local storage
- **Progress Continuity**: Seamless transition from anonymous to authenticated user

### Visual Progress Indicators
- **Progress Bars**: Real-time progress visualization for each learning path
- **Completion Badges**: Visual indicators for completed lessons
- **Streak Tracking**: Daily learning streak counter
- **Time Analytics**: Total time spent learning

## 🏗️ Architecture

### Database Schema
```sql
-- User progress tracking
model UserProgress {
  id          String   @id @default(cuid())
  userId      String
  sectionId   String
  completedAt DateTime @default(now())
  timeSpent   Int      @default(0) // in minutes
  lastAccessed DateTime @default(now())
  
  @@unique([userId, sectionId])
}

-- Learning sections
model Section {
  id            String   @id @default(cuid())
  title         String
  content       String
  category      String   // fundamentals, hooks, advanced, etc.
  difficulty    String   // beginner, intermediate, advanced
  estimatedTime Int      // in minutes
  prerequisites String[] // array of prerequisite section IDs
  order         Int      @default(0)
  isPublished   Boolean  @default(true)
}
```

### API Endpoints

#### Progress API (`/api/progress`)
- `GET /api/progress?userId={id}` - Get user's complete progress
- `POST /api/progress` - Update lesson completion
- `GET /api/progress/stats?userId={id}` - Get progress statistics
- `GET /api/progress/section?userId={id}&sectionId={id}` - Get specific section progress

### React Hooks

#### `useProgress(userId)`
```typescript
const { progress, stats, loading, markComplete, isCompleted } = useProgress(userId)
```

#### `useSectionProgress(userId, sectionId)`
```typescript
const { sectionProgress, loading, markComplete } = useSectionProgress(userId, sectionId)
```

## 🚀 Getting Started

### 1. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Setup learning sections
npm run db:setup
```

### 2. Environment Variables
Create a `.env.local` file:
```env
# Database
DATABASE_URL="your_database_connection_string"

# NextAuth (optional)
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Start Development Server
```bash
npm run dev
```

## 📊 Usage

### For Users
1. **Visit the Docs**: Go to `/docs` to see all learning paths
2. **Login**: Click "Login" in the navigation to track progress
3. **Start Learning**: Click on any lesson to begin
4. **Mark Complete**: Use the "Mark as Complete" button when finished
5. **Track Progress**: See your progress in the sidebar and overview pages

### For Developers

#### Adding Progress Tracking to a Lesson
```typescript
import { useSectionProgress } from '@/lib/hooks/useProgress'
import { useAuth } from '@/lib/auth-context'

export default function MyLesson() {
  const { user } = useAuth()
  const userId = user?.id || "anonymous"
  const { sectionProgress, markComplete } = useSectionProgress(userId, "lesson-id")
  
  const handleComplete = async () => {
    const timeSpent = Math.round((Date.now() - startTime) / 60000)
    await markComplete(timeSpent)
  }
  
  return (
    <div>
      {/* Lesson content */}
      <Button onClick={handleComplete}>
        {sectionProgress?.completed ? "Completed" : "Mark as Complete"}
      </Button>
    </div>
  )
}
```

#### Using Progress in Components
```typescript
import { useProgress } from '@/lib/hooks/useProgress'
import { useAuth } from '@/lib/auth-context'

export default function ProgressDisplay() {
  const { user } = useAuth()
  const userId = user?.id || "anonymous"
  const { progress, stats, isCompleted } = useProgress(userId)
  
  return (
    <div>
      <p>Completed: {progress?.completedSections.length} lessons</p>
      <p>Total Time: {stats?.timeSpent} minutes</p>
      <p>Streak: {stats?.streak} days</p>
    </div>
  )
}
```

## 🔧 Configuration

### Learning Sections
Sections are defined in the database and can be managed through:
- **Database directly**: Using Prisma Studio (`npm run db:studio`)
- **Setup script**: Modify `scripts/setup-database.js` and run `npm run db:setup`

### Progress Calculation
- **Completion Percentage**: `(completedSections / totalSections) * 100`
- **Time Tracking**: Automatically calculated from lesson start to completion
- **Streak Calculation**: Consecutive days with learning activity

## 🎨 UI Components

### ProgressTracker
Shows lesson progress with visual indicators:
```typescript
<ProgressTracker 
  currentLesson={1}
  totalLessons={8}
  completedLessons={completedLessons}
  currentPath="first-component"
  userId={userId}
/>
```

### LoginModal
Simple authentication modal:
```typescript
<LoginModal />
```

## 🔄 Data Flow

1. **User Action**: User clicks "Mark as Complete"
2. **Hook Update**: `useSectionProgress` calls `markComplete()`
3. **API Call**: Progress API updates database
4. **State Update**: Local state updates immediately
5. **UI Refresh**: Components re-render with new progress
6. **Persistence**: Data saved to database and local storage

## 🛡️ Error Handling

- **Network Failures**: Falls back to local storage
- **Database Errors**: Graceful degradation with error messages
- **Invalid Data**: Validation and sanitization
- **Offline Mode**: Works with local storage when offline

## 📈 Analytics

The system tracks:
- **Lesson Completion Rates**: Which lessons are most/least completed
- **Time Analytics**: Average time spent per lesson
- **User Engagement**: Daily active users and streaks
- **Learning Paths**: Most popular learning sequences

## 🔮 Future Enhancements

- **Achievements System**: Badges and rewards for milestones
- **Social Features**: Share progress with friends
- **Advanced Analytics**: Detailed learning insights
- **Gamification**: Points, levels, and challenges
- **Export Progress**: Download learning certificates

## 🐛 Troubleshooting

### Common Issues

1. **Progress Not Saving**
   - Check database connection
   - Verify API endpoints are working
   - Check browser console for errors

2. **Login Issues**
   - Clear browser localStorage
   - Check AuthProvider is wrapping the app

3. **Database Errors**
   - Run `npm run db:generate`
   - Check DATABASE_URL in .env.local
   - Run `npm run db:migrate`

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` and checking browser console for detailed progress tracking logs.

---

The progress tracking system is designed to be robust, user-friendly, and scalable. It provides a solid foundation for monitoring and encouraging user engagement in the React learning journey.
