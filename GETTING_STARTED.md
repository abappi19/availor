# Getting Started with Availor

Welcome to the Availor AI English Teacher app! This guide will help you get the project running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Expo CLI** (will be installed with dependencies)
- **iOS Simulator** (Mac only) or **Android Emulator**
- **Xcode** (Mac only, for iOS development)
- **Android Studio** (for Android development)

## 🚀 Installation

### 1. Navigate to Project Directory

```bash
cd /Users/abappi19/project/bappi/availor
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native and Expo
- NativeWind (Tailwind CSS)
- React Native Reanimated
- All UI and utility libraries

### 3. Start the Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

## 📱 Running on Devices

### Option 1: iOS Simulator (Mac only)

```bash
npm run ios
```

Or press `i` in the Expo terminal.

**Requirements**:
- Xcode installed
- iOS Simulator set up

### Option 2: Android Emulator

```bash
npm run android
```

Or press `a` in the Expo terminal.

**Requirements**:
- Android Studio installed
- Android emulator running

### Option 3: Physical Device (Expo Go)

1. Install **Expo Go** app on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code displayed in the terminal with:
   - iOS: Camera app
   - Android: Expo Go app

## 🧪 Testing the App

### Basic Flow

1. **First Launch**: You'll see the onboarding flow
   - Enter your name
   - Select your English level (A1-C2)
   - Choose your interests and learning preferences

2. **Main Conversation**: After onboarding, you'll land on the conversation screen
   - Type a message and send
   - The AI will respond (mock responses for now)
   - Try phrases like "hello", "help with grammar", "practice conversation"

3. **Progress Tab**: Tap the progress icon to view:
   - Your level and XP
   - Streak counter
   - Statistics (conversations, practice time)
   - Weekly progress chart

### Testing Features

#### Conversation
- ✅ Send messages
- ✅ View AI responses
- ✅ See typing indicators
- ✅ Scroll through history

#### Onboarding
- Clear app data and restart to see onboarding again:
  - iOS Simulator: `Device` > `Erase All Content and Settings`
  - Android Emulator: `Settings` > `Apps` > `Expo Go` > `Clear Data`

#### Progress Dashboard
- ✅ View statistics
- ✅ Check level progress
- ✅ See streak counter
- ✅ View weekly chart
- ✅ Pull to refresh

## 🎨 Design System

The app uses a custom design system built with:
- **NativeWind** for Tailwind CSS styling
- **Atomic Design** pattern
- **React Native Reanimated** for smooth 60fps animations

### Theme Colors
- Primary: Blue (#2196F3)
- Success: Green (#4CAF50)
- Warning: Orange (#FF9800)
- Error: Red (#F44336)
- Gold: #FFD700 (for achievements)

## 📁 Project Structure

```
availor/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   ├── onboarding/        # Onboarding flow
│   └── _layout.tsx        # Root layout
├── components/            # Atomic design components
│   ├── atoms/            # Basic UI elements
│   └── molecules/        # Composite components
├── features/             # Feature modules
│   ├── conversation/     # Chat functionality
│   ├── onboarding/       # User onboarding
│   ├── progress/         # Progress tracking
│   └── gamification/     # Achievements & rewards
├── services/             # Business logic
│   ├── executorch/       # AI services (mock)
│   ├── storage/          # Data persistence
│   └── progress/         # Progress tracking
├── design-system/        # Design tokens
└── plan.md              # Implementation plan
```

## 🔧 Development Commands

### Start Development Server
```bash
npm start
```

### Run on iOS
```bash
npm run ios
```

### Run on Android
```bash
npm run android
```

### Run Linter
```bash
npm run lint
```

### Clear Cache
```bash
npx expo start -c
```

## 🐛 Troubleshooting

### Metro Bundler Issues

If you encounter metro bundler errors:

```bash
# Clear all caches
npx expo start -c

# Or manually clear
rm -rf node_modules
rm -rf .expo
npm install
```

### iOS Simulator Not Opening

```bash
# Reset iOS Simulator
xcrun simctl erase all

# Reinstall pods (if using bare workflow)
cd ios && pod install && cd ..
```

### Android Build Errors

```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

### NativeWind Not Working

1. Ensure `global.css` is imported in `app/_layout.tsx`
2. Check `tailwind.config.js` is properly configured
3. Restart the development server

## 📝 Common Issues

### Issue: "Metro bundler failed to start"
**Solution**: Clear cache with `npx expo start -c`

### Issue: "Cannot find module '@/components/...'"
**Solution**: Check `tsconfig.json` has correct path aliases

### Issue: "Reanimated 2 failed to create a worklet"
**Solution**: Restart the development server

### Issue: "Network request failed"
**Solution**: This is expected - the app is offline-first with mock AI services

## 🔮 What's Next?

### Current State
- ✅ Beautiful UI with atomic design system
- ✅ Conversation interface with mock AI
- ✅ Onboarding flow
- ✅ Progress tracking and gamification
- ✅ OCR image text extraction (mock)

### Pending Integration
- 🔄 ExecuTorch for local AI inference
- 🔄 Real Llama 3.2 3B model
- 🔄 Whisper for speech-to-text
- 🔄 TrOCR for optical character recognition

### See Also
- `README.md` - Project overview and features
- `IMPLEMENTATION_STATUS.md` - Detailed phase completion status
- `plan.md` - Full implementation plan

## 💡 Tips

1. **Use Chrome DevTools**: Shake device and select "Debug Remote JS" to use Chrome debugger

2. **Hot Reload**: Press `r` in terminal to reload, or shake device and select "Reload"

3. **Component Inspector**: Shake device and select "Toggle Element Inspector" to inspect UI

4. **Performance Monitor**: Shake device and select "Toggle Performance Monitor"

5. **Test Different Devices**: Use Expo's device selection to test on different screen sizes

## 📞 Support

For issues or questions:
1. Check `IMPLEMENTATION_STATUS.md` for known issues
2. Review `README.md` for architecture details
3. Check Expo documentation: https://docs.expo.dev/

---

**Happy coding!** 🚀

Built with ❤️ for English learners worldwide.

