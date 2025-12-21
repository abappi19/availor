# Availor - AI English Teacher App

An offline-first, privacy-focused AI English teacher app built with React Native, Expo, and ExecuTorch (planned).

## 🎯 Project Overview

Availor is a mobile application that helps users improve their English skills through:
- 💬 **AI-powered conversations** with personalized feedback
- 🎤 **Voice mode** for pronunciation practice
- 📸 **OCR support** for learning from images and PDFs
- 🎮 **Gamification** with streaks, achievements, and levels
- 📊 **Progress tracking** with detailed analytics

## ✨ Features Implemented

### ✅ Phase 1: UI Foundation & Design System
- **NativeWind** (Tailwind CSS) integration
- **Atomic Design System** with tokens, theme, and animations
- **Reusable components**:
  - Atoms: Button, Badge, Text, Input, Avatar, Icon, Spinner, Divider
  - Molecules: MessageBubble, ProgressBar, StreakCounter, LevelBadge, AchievementCard, StatCard, InputBar
- Light/Dark theme support
- Responsive design with consistent styling

### ✅ Phase 2: Core Conversation
- Beautiful conversation interface with animated message bubbles
- Mock LLM integration (placeholder for ExecuTorch)
- Real-time typing indicators
- Message persistence with AsyncStorage
- Smooth animations with React Native Reanimated
- Context-aware AI responses

### ✅ Phase 3: Onboarding
- **3-step onboarding flow**:
  1. Welcome & name input
  2. English level assessment (A1-C2)
  3. Personalization (interests, goals, learning style)
- Animated transitions between steps
- User profile creation and storage
- Skip logic for returning users

### ✅ Phase 4: Gamification System
- **Achievements** with categories:
  - Streak achievements (3, 7, 30, 100 days)
  - Conversation milestones (10, 50, 100)
  - Practice time goals (1hr, 5hrs, 1000min)
  - Level milestones (5, 10, 25)
- **Points & Leveling** system with XP
- **Streak tracking** with daily updates
- Unlock animations and notifications

### ✅ Phase 7: Progress Dashboard
- **Real-time statistics**:
  - Current level and XP progress
  - Streak counter with flame animation
  - Total conversations and practice time
  - English proficiency level
- **Weekly progress chart** with line graph
- **Quick stats** panel
- Pull-to-refresh functionality
- Beautiful gradient cards

## 🏗️ Architecture

### Design Patterns
- **Atomic Design** for UI components
- **Feature-based** modular architecture
- **Service layer** for business logic
- **Lazy loading** for AI models (when integrated)

### Project Structure
```
availor/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Conversation
│   │   └── progress.tsx   # Progress dashboard
│   ├── onboarding/        # Onboarding flow
│   └── _layout.tsx        # Root layout
├── components/            # Atomic design components
│   ├── atoms/            # Basic components
│   └── molecules/        # Composite components
├── features/             # Feature modules
│   ├── conversation/     # Chat feature
│   ├── onboarding/       # Onboarding
│   ├── progress/         # Progress tracking
│   └── gamification/     # Achievements
├── services/             # Business logic
│   ├── executorch/       # AI services (mock)
│   ├── storage/          # Data persistence
│   ├── gamification/     # Achievement logic
│   └── progress/         # Progress tracking
├── design-system/        # Design tokens
│   ├── tokens.ts         # Colors, spacing, typography
│   ├── theme.ts          # Theme configuration
│   └── animations.ts     # Reusable animations
└── plan.md              # Implementation plan
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

1. **Clone the repository**
   ```bash
   cd availor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on a device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

## 📦 Dependencies

### Core
- `react-native` 0.81.5
- `expo` ~54.0.30
- `expo-router` ~6.0.21
- `typescript` ~5.9.2

### UI & Styling
- `nativewind` ^4.0.0 - Tailwind CSS for React Native
- `react-native-reanimated` ~4.1.1 - Smooth animations
- `react-native-gesture-handler` ~2.28.0 - Touch interactions
- `expo-linear-gradient` - Gradient backgrounds
- `@expo/vector-icons` ^15.0.3 - Icon library

### State & Storage
- `@react-native-async-storage/async-storage` - Local storage
- `zustand` ^4.5.0 - State management

### Utilities
- `date-fns` ^3.0.0 - Date utilities
- `react-native-chart-kit` ^6.12.0 - Charts and graphs
- `expo-speech` - Text-to-speech (native)

## 🎨 Design System

### Color Palette
```typescript
primary: {
  500: '#2196F3',  // Main brand color
  600: '#1E88E5',  // Hover state
}
success: {
  500: '#4CAF50',  // Achievements, streaks
}
warning: {
  500: '#FF9800',  // Reminders
}
gold: '#FFD700',   // Premium badges
```

### Typography
- Font sizes: xs (12px) → xxxl (48px)
- Weights: regular (400), medium (500), semibold (600), bold (700)
- Line heights optimized for readability

### Spacing
- Base unit: 4px
- Scale: xs (4px), sm (8px), md (16px), lg (24px), xl (32px), xxl (48px)

## 🔮 Planned Features

### Phase 5: Voice Mode (In Progress)
- Real-time speech-to-text with Whisper (via ExecuTorch)
- Animated waveform visualization
- Voice activity detection
- Text-to-speech responses
- Pronunciation feedback

### Phase 6: OCR Processor
- Image text extraction with TrOCR (via ExecuTorch)
- PDF document parsing
- Bounding box animations
- Context integration with conversation

### Phase 8: Polish & Animations
- Micro-interactions (haptic feedback, sounds)
- Page transitions
- Loading skeletons
- Empty states
- Confetti animations for achievements

### Phase 9: Testing & Launch
- Unit and integration tests
- E2E testing
- Performance profiling
- App store assets
- Beta testing
- Production release

## 🤖 AI Integration (Planned)

### ExecuTorch Integration
The app is designed to use **React Native ExecuTorch** for all AI inference:

```typescript
// Planned hooks (currently using mock implementations)
import { useLLM } from 'react-native-executorch';
import { useSpeechToText } from 'react-native-executorch';
import { useOCR } from 'react-native-executorch';
import { useTextToImage } from 'react-native-executorch';
```

### Models (Planned)
- **LLM**: Llama 3.2 3B (quantized to INT4) - Conversation AI
- **STT**: Whisper-tiny (quantized) - Speech-to-text
- **OCR**: TrOCR (quantized) - Text extraction from images
- **TTS**: Using native platform TTS (expo-speech)

**Note**: ExecuTorch integration is pending library availability. Current implementation uses mock services that can be easily replaced.

## 📱 Screens

### 1. Onboarding (3 screens)
- Welcome screen with name input
- Skill assessment (A1-C2 levels)
- Personalization (interests, goals, style)

### 2. Conversation (Tab 1)
- Chat interface with AI teacher
- Message bubbles with animations
- Typing indicators
- Input bar with send button

### 3. Progress (Tab 2)
- Level badge with XP progress
- Streak counter with flame animation
- Statistics cards (conversations, time, level, points)
- Weekly practice chart
- Quick stats panel

### 4. Profile (Tab 3)
- User information
- Settings
- Data management

## 🔐 Privacy & Security

- **Offline-first**: All AI processing happens on-device (when ExecuTorch is integrated)
- **Local storage**: User data stored locally with AsyncStorage
- **No tracking**: Zero analytics or tracking
- **Data control**: Users can export or delete their data

## 🧪 Testing

```bash
# Run linter
npm run lint

# Run tests (when implemented)
npm test
```

## 📝 Development Notes

### Current State
- **Phase 1-4**: ✅ Complete
- **Phase 7**: ✅ Complete
- **Phase 5**: 🔄 In progress (Voice mode placeholders)
- **Phase 6**: 📋 Pending (OCR)
- **Phase 8-9**: 📋 Pending

### Known Limitations
1. **LLM responses** are mocked - awaiting ExecuTorch integration
2. **Voice features** use placeholders - STT/TTS to be integrated
3. **OCR** not yet implemented
4. **Onboarding skip logic** not yet implemented in root layout

### Next Steps
1. Create comprehensive achievement unlock modal
2. Add haptic feedback to interactions
3. Implement voice mode UI components
4. Create OCR processor with animations
5. Add more unit tests
6. Optimize performance for low-end devices

## 🤝 Contributing

This is a private project, but feedback and suggestions are welcome!

## 📄 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

- **React Native** team for the amazing framework
- **Expo** for the development platform
- **NativeWind** for Tailwind CSS integration
- **PyTorch** team for ExecuTorch (planned)

---

**Built with ❤️ for English learners worldwide**
