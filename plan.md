# AI English Teacher App - Implementation Plan

## Project Overview

An offline-first AI English teacher app with **stunning gamified UI** using React Native ExecuTorch's built-in hooks. Features NativeWind (Tailwind CSS) + Gluestack UI for beautiful, consistent design with atomic component architecture.

**Key Features**:
- ✅ Offline-first with local AI (ExecuTorch)
- ✅ Conversation practice with Llama 3.2 3B
- ✅ Voice mode with real-time transcription
- ✅ OCR for image/PDF text extraction
- ✅ Beautiful gamified UI with streaks, achievements, levels
- ✅ Progress tracking with charts and analytics
- ✅ Modular architecture with lazy-loaded AI components

## Technology Stack

### Core Framework
- **React Native**: 0.81.5
- **Expo SDK**: 54
- **Expo Router**: 6 (file-based routing)
- **TypeScript**: 5.9.2

### AI Infrastructure (React Native ExecuTorch)
- **useLLM**: Llama 3.2 3B for conversation
- **useSpeechToText**: Whisper for voice input
- **useVAD**: Voice activity detection
- **useOCR**: TrOCR for text extraction from images
- **useTextToImage**: Image generation (optional)

### UI & Styling
- **NativeWind**: Tailwind CSS for React Native
- **Gluestack UI v2**: Modern component library
- **React Native Reanimated**: 60fps animations
- **React Native Gesture Handler**: Touch interactions
- **Atomic Design Pattern**: Atoms → Molecules → Organisms → Templates

### Additional Libraries
- **expo-speech**: Text-to-speech (native)
- **expo-av**: Audio recording and playback
- **expo-image-picker**: Image selection
- **expo-sqlite**: Progress data storage
- **react-native-chart-kit**: Charts and graphs
- **zustand**: Lightweight state management
- **date-fns**: Date utilities

## Architecture Principles

### 1. Lazy-Loaded AI Components
Each AI capability is a **self-contained, conditionally-rendered component**:

```
┌─────────────────────────────────────────┐
│      Conversation Screen (Main)         │
│        useLLM (always loaded)           │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┴─────────┐
        │    User Action    │
        └─────────┬─────────┘
                  │
    ┌─────────────┼─────────────┬──────────────┐
    ▼             ▼             ▼              ▼
┌────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Voice  │  │   OCR    │  │  Image   │  │  etc...  │
│  Mode  │  │ Processor│  │   Gen    │  │          │
└────────┘  └──────────┘  └──────────┘  └──────────┘
   │             │             │              │
   ▼             ▼             ▼              ▼
Load STT     Load OCR     Load Image      Load Model
  Model       Model        Model            
   │             │             │              │
   ▼             ▼             ▼              ▼
Show UI      Show UI      Show UI         Show UI
   │             │             │              │
   ▼             ▼             ▼              ▼
Unmount      Unmount      Unmount         Unmount
   │             │             │              │
   ▼             ▼             ▼              ▼
Free RAM     Free RAM     Free RAM        Free RAM
```

**Key Benefits**:
- Models load only when needed
- Automatic memory management via React hooks
- Each component has integrated UI (progress, animations)
- Clean separation of concerns

### 2. Atomic Design System

```
components/
├── atoms/           # Basic building blocks (Button, Badge, Icon)
├── molecules/       # Combinations (MessageBubble, StreakCounter)
├── organisms/       # Complex components (Dashboard, MessageList)
└── templates/       # Page layouts (ChatLayout, DashboardLayout)
```

**Benefits**:
- Consistency across the app
- Reusable components
- Easy to maintain and update
- Scalable design system

### 3. Feature-Based Architecture

```
features/
├── conversation/    # Chat with AI (useLLM)
├── voice-mode/      # Voice practice (useSpeechToText + useVAD)
├── ocr-processor/   # Image text extraction (useOCR)
├── onboarding/      # User assessment (useLLM)
├── progress/        # Progress tracking
├── gamification/    # Achievements, streaks, levels
└── shared/          # Shared utilities
```

## Project Structure

```
eba/
├── app/                            # Expo Router screens
│   ├── (tabs)/
│   │   ├── index.tsx              # Conversation screen
│   │   ├── progress.tsx           # Progress dashboard
│   │   ├── achievements.tsx       # Achievements screen
│   │   └── profile.tsx            # Profile & settings
│   ├── onboarding/
│   │   └── index.tsx              # Onboarding flow
│   └── _layout.tsx                # Root layout
│
├── components/                     # Atomic design components
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── IconButton.tsx
│   │   ├── Badge/
│   │   │   └── Badge.tsx
│   │   ├── Text/
│   │   │   ├── Text.tsx
│   │   │   └── Heading.tsx
│   │   ├── Input/
│   │   │   └── TextInput.tsx
│   │   └── Avatar/
│   │       └── Avatar.tsx
│   │
│   ├── molecules/
│   │   ├── MessageBubble/
│   │   │   ├── UserMessage.tsx
│   │   │   └── AIMessage.tsx
│   │   ├── StreakCounter/
│   │   │   └── StreakCounter.tsx
│   │   ├── LevelBadge/
│   │   │   └── LevelBadge.tsx
│   │   ├── AchievementCard/
│   │   │   └── AchievementCard.tsx
│   │   ├── ProgressBar/
│   │   │   └── ProgressBar.tsx
│   │   └── VoiceWaveform/
│   │       └── VoiceWaveform.tsx
│   │
│   ├── organisms/
│   │   ├── MessageList/
│   │   │   └── MessageList.tsx
│   │   ├── ProgressDashboard/
│   │   │   └── ProgressDashboard.tsx
│   │   ├── AchievementGrid/
│   │   │   └── AchievementGrid.tsx
│   │   ├── VoiceInterface/
│   │   │   └── VoiceInterface.tsx
│   │   └── OCRPreview/
│   │       └── OCRPreview.tsx
│   │
│   └── templates/
│       ├── ChatLayout/
│       │   └── ChatLayout.tsx
│       └── DashboardLayout/
│           └── DashboardLayout.tsx
│
├── features/                       # Feature modules
│   ├── conversation/
│   │   ├── components/
│   │   │   ├── ConversationScreen.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── hooks/
│   │   │   └── useConversation.ts
│   │   └── index.ts
│   │
│   ├── voice-mode/
│   │   ├── components/
│   │   │   ├── VoiceModeComponent.tsx    # useSpeechToText + useVAD
│   │   │   ├── RecordButton.tsx
│   │   │   └── TranscriptionDisplay.tsx
│   │   ├── hooks/
│   │   │   └── useVoiceMode.ts
│   │   └── index.ts
│   │
│   ├── ocr-processor/
│   │   ├── components/
│   │   │   ├── OCRProcessorComponent.tsx  # useOCR
│   │   │   ├── BoundingBoxAnimation.tsx
│   │   │   └── ExtractedTextPreview.tsx
│   │   └── index.ts
│   │
│   ├── onboarding/
│   │   ├── components/
│   │   │   ├── OnboardingFlow.tsx         # useLLM
│   │   │   ├── SkillAssessment.tsx
│   │   │   └── PersonalizationForm.tsx
│   │   └── index.ts
│   │
│   ├── progress/
│   │   ├── components/
│   │   │   ├── ProgressChart.tsx
│   │   │   └── StatCard.tsx
│   │   ├── services/
│   │   │   └── progressService.ts
│   │   └── index.ts
│   │
│   ├── gamification/
│   │   ├── components/
│   │   │   ├── AchievementList.tsx
│   │   │   └── LevelProgress.tsx
│   │   ├── services/
│   │   │   └── gamificationService.ts
│   │   └── index.ts
│   │
│   └── shared/
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── design-system/                  # Design tokens & theme
│   ├── tokens.ts                   # Colors, spacing, typography
│   ├── theme.ts                    # Theme configuration
│   └── animations.ts               # Reusable animations
│
├── services/                       # Core services
│   ├── executorch/
│   │   ├── llm.ts                 # LLM service wrapper
│   │   ├── stt.ts                 # STT service wrapper
│   │   └── ocr.ts                 # OCR service wrapper
│   ├── storage/
│   │   ├── database.ts            # SQLite setup
│   │   ├── userProfile.ts         # User data
│   │   └── conversationHistory.ts # Chat history
│   └── analytics/
│       └── progressTracking.ts    # Usage analytics
│
├── assets/                         # Static assets
│   ├── images/
│   ├── icons/
│   └── models/                    # AI models (downloaded on first launch)
│       ├── llama-3.2-3b.pte
│       ├── whisper-base.pte
│       └── trocr-small.pte
│
├── plan.md                         # This file
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Implementation Phases

### Phase 1: UI Foundation & Design System (1 week)

**Goals**: Set up beautiful, consistent UI foundation

**Tasks**:
1. Install and configure NativeWind + Gluestack UI
2. Set up Tailwind CSS configuration
3. Create design tokens (colors, spacing, typography)
4. Build atomic components:
   - Atoms: Button, Badge, Icon, Text, Input, Avatar
   - Molecules: MessageBubble, ProgressBar, StreakCounter
5. Set up theme with light/dark mode
6. Create example screens for component testing

**Deliverables**:
- ✅ Complete design system
- ✅ Reusable atomic components
- ✅ Theme configuration
- ✅ Component documentation

**Files to Create**:
- `design-system/tokens.ts`
- `design-system/theme.ts`
- `components/atoms/**/*`
- `components/molecules/**/*`
- `tailwind.config.js`

---

### Phase 2: Core Conversation with Beautiful UI (1.5 weeks)

**Goals**: Implement working text-based conversation with AI

**Tasks**:
1. Install React Native ExecuTorch
2. Set up Llama 3.2 3B model
3. Create conversation screen with `useLLM` hook
4. Build beautiful message bubbles (user + AI) with animations
5. Implement animated input bar
6. Add typing indicators
7. Create message list with smooth scrolling
8. Set up SQLite for message persistence
9. Add haptic feedback for interactions

**Deliverables**:
- ✅ Working text conversation with LLM
- ✅ Beautiful message UI with animations
- ✅ Message persistence
- ✅ Smooth user experience

**Files to Create**:
- `features/conversation/components/ConversationScreen.tsx`
- `features/conversation/components/MessageInput.tsx`
- `components/molecules/MessageBubble/UserMessage.tsx`
- `components/molecules/MessageBubble/AIMessage.tsx`
- `components/organisms/MessageList/MessageList.tsx`
- `services/executorch/llm.ts`
- `services/storage/conversationHistory.ts`

---

### Phase 3: Onboarding with Gamified UI (1 week)

**Goals**: Create engaging onboarding experience

**Tasks**:
1. Design onboarding screens with illustrations
2. Build multi-step wizard with progress indicator
3. Create skill assessment component
4. Implement multiple-choice questions
5. Use `useLLM` for text-based level assessment
6. Create personalization form (interests, goals)
7. Add celebration animations
8. Store user profile in SQLite

**Deliverables**:
- ✅ Beautiful onboarding flow
- ✅ AI-powered skill assessment
- ✅ User profile creation
- ✅ Smooth transitions

**Files to Create**:
- `app/onboarding/index.tsx`
- `features/onboarding/components/OnboardingFlow.tsx`
- `features/onboarding/components/SkillAssessment.tsx`
- `features/onboarding/components/PersonalizationForm.tsx`
- `services/storage/userProfile.ts`

---

### Phase 4: Gamification Components (1.5 weeks)

**Goals**: Build all gamification UI elements

**Tasks**:
1. Create streak counter with animated flame icon
2. Build level badge with XP progress bar
3. Design achievement cards with unlock animations
4. Implement stats dashboard
5. Create progress charts (weekly, monthly)
6. Build points/XP system
7. Add achievement unlock modal with confetti
8. Implement daily streak tracking
9. Create leaderboard (optional)

**Deliverables**:
- ✅ Complete gamification UI
- ✅ Achievement system
- ✅ Progress tracking
- ✅ Beautiful animations

**Files to Create**:
- `components/molecules/StreakCounter/StreakCounter.tsx`
- `components/molecules/LevelBadge/LevelBadge.tsx`
- `components/molecules/AchievementCard/AchievementCard.tsx`
- `components/molecules/StatCard/StatCard.tsx`
- `components/organisms/ProgressDashboard/ProgressDashboard.tsx`
- `features/gamification/services/gamificationService.ts`
- `features/progress/services/progressService.ts`

---

### Phase 5: Voice Mode with Beautiful UI (1.5 weeks)

**Goals**: Implement voice conversation mode

**Tasks**:
1. Create voice mode interface
2. Build animated waveform visualizer
3. Implement `useSpeechToText` hook integration
4. Add `useVAD` hook for voice activity detection
5. Create glowing record button with ripple effect
6. Build live transcription display
7. Integrate TTS with `expo-speech`
8. Add voice controls (toggle STT/TTS, exit)
9. Implement audio recording with `expo-av`

**Deliverables**:
- ✅ Beautiful voice mode interface
- ✅ Real-time transcription
- ✅ Voice activity detection
- ✅ TTS responses
- ✅ Smooth animations

**Files to Create**:
- `features/voice-mode/components/VoiceModeComponent.tsx`
- `components/molecules/VoiceWaveform/VoiceWaveform.tsx`
- `features/voice-mode/components/RecordButton.tsx`
- `features/voice-mode/components/TranscriptionDisplay.tsx`
- `features/voice-mode/components/VoiceControls.tsx`
- `features/voice-mode/hooks/useVoiceMode.ts`

---

### Phase 6: OCR with Processing UI (1 week)

**Goals**: Add image text extraction capability

**Tasks**:
1. Build image picker UI
2. Create OCR processing animation (bounding boxes)
3. Implement `useOCR` hook integration
4. Build progress indicator during processing
5. Create extracted text preview component
6. Add confirmation/edit flow
7. Integrate with conversation context
8. Add PDF support (optional)

**Deliverables**:
- ✅ Image upload with OCR
- ✅ Beautiful processing animation
- ✅ Text extraction and preview
- ✅ Context integration

**Files to Create**:
- `features/ocr-processor/components/OCRProcessorComponent.tsx`
- `features/ocr-processor/components/BoundingBoxAnimation.tsx`
- `features/ocr-processor/components/ExtractedTextPreview.tsx`
- `features/ocr-processor/hooks/useOCR.ts`

---

### Phase 7: Progress Dashboard (1 week)

**Goals**: Build complete progress tracking interface

**Tasks**:
1. Design dashboard layout
2. Build statistics cards (conversations, time, level)
3. Add weekly/monthly charts
4. Create achievement grid
5. Implement streak calendar view
6. Add animations and transitions
7. Build reports (weekly summary)
8. Add export functionality (optional)

**Deliverables**:
- ✅ Complete progress dashboard
- ✅ Interactive charts
- ✅ Beautiful visualizations
- ✅ Achievement showcase

**Files to Create**:
- `app/(tabs)/progress.tsx`
- `components/organisms/ProgressDashboard/ProgressDashboard.tsx`
- `features/progress/components/ProgressChart.tsx`
- `features/progress/components/WeeklyReport.tsx`
- `features/progress/components/StreakCalendar.tsx`

---

### Phase 8: Polish & Animations (1 week)

**Goals**: Perfect the user experience

**Tasks**:
1. Add micro-interactions (haptics, sounds)
2. Implement smooth page transitions
3. Add loading skeletons
4. Create empty states
5. Add confetti animations for achievements
6. Implement error boundaries
7. Optimize performance (memoization, lazy loading)
8. Refine dark mode
9. Add accessibility features (screen reader support)

**Deliverables**:
- ✅ Polished UI with micro-interactions
- ✅ Smooth animations throughout
- ✅ Optimized performance
- ✅ Accessibility support

---

### Phase 9: Testing & Launch (1 week)

**Goals**: Prepare for app store launch

**Tasks**:
1. Unit tests for key components
2. Integration tests for features
3. E2E testing
4. Performance profiling
5. Design app icon and splash screen
6. Create onboarding tutorial
7. Write user documentation
8. Prepare App Store assets (screenshots, descriptions)
9. Set up TestFlight / Google Play beta
10. Conduct accessibility audit
11. Final QA pass
12. Submit to app stores

**Deliverables**:
- ✅ Comprehensive test coverage
- ✅ App store ready assets
- ✅ Beta testing completed
- ✅ App submitted to stores

---

## Data Models

### User Profile
```typescript
interface UserProfile {
  id: string;
  name: string;
  englishLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  interests: string[];
  goals: string[];
  learningStyle: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  dailyGoalMinutes: number;
  createdAt: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: number;
  totalPoints: number;
  level: number;
  nextLevelXP: number;
}
```

### Conversation & Messages
```typescript
interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
  startedAt: number;
  endedAt?: number;
  mode: 'text' | 'voice';
}

interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  audioUri?: string;
  imageContext?: {
    uri: string;
    extractedText: string;
  };
  corrections?: Correction[];
}

interface Correction {
  original: string;
  corrected: string;
  explanation: string;
  category: 'grammar' | 'vocabulary' | 'pronunciation';
}
```

### Progress & Gamification
```typescript
interface DailyProgress {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  minutesPracticed: number;
  messagesCount: number;
  voiceModeUsed: boolean;
  pointsEarned: number;
  topicsCovered: string[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'conversation' | 'pronunciation' | 'vocabulary' | 'milestone';
  requirement: number;
  rewardPoints: number;
  unlockedAt?: number;
}

interface GamificationState {
  userId: string;
  totalPoints: number;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
}
```

## Dependencies

### Install Commands

```bash
# Core dependencies
npm install react-native-executorch

# UI & Styling
npm install nativewind
npm install @gluestack-ui/themed
npm install tailwindcss --save-dev

# Already installed (from existing package.json)
# react-native-reanimated@~4.1.1
# react-native-gesture-handler@~2.28.0
# @expo/vector-icons@^15.0.3

# Additional libraries
npm install expo-speech
npm install expo-av
npm install expo-image-picker
npm install expo-sqlite
npm install expo-file-system
npm install zustand
npm install react-native-chart-kit
npm install react-native-svg
npm install date-fns
```

### package.json (Updated)
```json
{
  "dependencies": {
    "react-native-executorch": "latest",
    "nativewind": "^4.0.0",
    "@gluestack-ui/themed": "^1.0.0",
    "react-native-reanimated": "~4.1.1",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-svg": "^15.0.0",
    "expo-speech": "~12.0.0",
    "expo-av": "~15.0.0",
    "expo-image-picker": "~16.0.0",
    "expo-sqlite": "~15.0.0",
    "expo-file-system": "~18.0.0",
    "zustand": "^4.5.0",
    "react-native-chart-kit": "^6.12.0",
    "date-fns": "^3.0.0",
    "@expo/vector-icons": "^15.0.3"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0"
  }
}
```

## Configuration Files

### tailwind.config.js
```javascript
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1976D2',
        },
        success: {
          50: '#E8F5E9',
          500: '#4CAF50',
          600: '#43A047',
        },
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32',
      },
    },
  },
  plugins: [],
};
```

## Memory Budget

| Model | Size (Quantized) | When Loaded | Auto-Unloaded |
|-------|------------------|-------------|---------------|
| Llama 3.2 3B | 2-3GB | App start | Never (core feature) |
| Whisper (STT) | ~70MB | Voice mode active | On voice mode exit |
| VAD | ~10MB | Voice mode active | On voice mode exit |
| TrOCR (OCR) | ~100MB | Image upload | After text extraction |
| Image Gen | ~500MB | Image request | After generation (optional) |

**Peak Memory Usage**: ~3.5GB (LLM + one auxiliary model)

## Key Success Metrics

1. **User Engagement**: Daily active users, streak retention
2. **Learning Outcomes**: English level progression
3. **Feature Adoption**: Voice mode usage, OCR usage
4. **Performance**: < 3s LLM response time, 60fps animations
5. **Retention**: 7-day retention > 40%, 30-day retention > 20%

## Next Steps

1. ✅ Set up NativeWind + Gluestack UI
2. ✅ Create design system and atomic components
3. ✅ Install React Native ExecuTorch
4. ✅ Implement core conversation with useLLM
5. ✅ Build gamification UI components
6. ✅ Add voice mode with useSpeechToText
7. ✅ Implement OCR with useOCR
8. ✅ Create progress dashboard
9. ✅ Polish and optimize
10. ✅ Launch on app stores

---

**Last Updated**: December 21, 2025
**Version**: 1.0
**Status**: Ready for Implementation 🚀

