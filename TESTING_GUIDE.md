# Availor Testing Guide

## Overview

This guide provides instructions for testing the Availor AI English Learning app, focusing on the comprehensive onboarding flow and newly implemented features.

## Prerequisites

- Node.js and npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator set up
- Physical device with Expo Go app (optional)

## Setup

1. **Install Dependencies**
   ```bash
   cd /Users/abappi19/project/bappi/availor
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Launch App**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go on physical device

## Test Scenarios

### 1. Onboarding Flow (First Launch)

#### Step 1: Welcome Screen
- **Expected**: Beautiful gradient welcome screen with app branding
- **Actions**:
  - Enter your name in the text input
  - Tap "Begin My Journey" button
- **Verify**:
  - Button is disabled when name field is empty
  - Button enables when name is entered
  - Smooth transition to next screen

#### Step 2: Situation & Goals
- **Expected**: Screen asking about learning situation
- **Actions**:
  - Select one situation (Student, Professional, Travel, Personal, Exam Prep)
  - Review the specific goals for your situation
  - Select 1+ goals from the list
  - Tap "Continue"
- **Verify**:
  - Can navigate back to change name
  - Goals list changes based on selected situation
  - Continue button disabled until at least 1 goal selected
  - Can change situation and goals update accordingly

#### Step 3: English Level Quiz
- **Expected**: 8-question grammar/vocabulary assessment
- **Actions**:
  - Answer all 8 questions
  - Review progress bar as you advance
  - Tap "Finish" on last question
- **Verify**:
  - Progress bar updates with each question
  - Can navigate back to previous questions
  - Results screen shows score and percentage
  - Level assignment (A1-C2) displayed
  - Auto-proceeds to next step after 3 seconds

#### Step 4: Learning Preferences
- **Expected**: Screen for customizing teaching approach
- **Actions**:
  - Select teaching style (Encouraging/Balanced/Direct)
  - Choose communication style (Casual/Mixed/Formal)
  - Pick correction frequency
  - Set learning pace
  - Choose daily practice goal (minutes)
  - Select practice frequency
  - Tap "Continue"
- **Verify**:
  - All options are selectable
  - Descriptions clearly explain each option
  - Can navigate back to quiz

#### Step 5: Focus Areas & Topics
- **Expected**: Screen for selecting focus areas and interests
- **Actions**:
  - Select 1-3 primary focus areas
  - Optionally select secondary focus areas
  - Choose preferred conversation topics
  - Select learning style
  - Tap "Continue"
- **Verify**:
  - Primary focus limited to 3 selections
  - Secondary focus only shows non-primary areas
  - Topics can be selected/deselected freely
  - Continue button disabled until 1+ primary focus and 1+ topic selected

#### Step 6: Completion
- **Expected**: Success screen with personalization summary
- **Actions**:
  - Review your level, goal, and AI configuration
  - Tap "Start Learning"
- **Verify**:
  - Displays correct English level from quiz
  - Shows your primary goal
  - Explains AI personalization
  - Button shows loading state while setting up
  - Navigates to main app on completion

### 2. AI Personalization Integration

#### Test Personalized Responses
- **Expected**: AI responses reflect onboarding preferences
- **Actions**:
  - Start a conversation
  - Send message: "Hello"
  - Observe AI's teaching style in response
- **Verify**:
  - **If Encouraging**: Response is enthusiastic, uses emojis, very positive
  - **If Direct**: Response is concise, straightforward, efficiency-focused
  - **If Casual**: Response uses friendly, informal language
  - **If Formal**: Response maintains professional tone

#### Test Correction Frequency
- **Actions**:
  - Send message with intentional grammar error: "I goes to school yesterday"
- **Verify**:
  - **Every mistake**: Immediate correction of "goes" → "went"
  - **Major errors**: Focuses on significant mistakes only
  - **End summary**: No immediate correction, waits for conversation end
  - **Minimal**: Rarely corrects, prioritizes fluency

### 3. Voice Mode

#### Test STT (Speech-to-Text)
- **Expected**: Voice input converts to text
- **Actions**:
  - Tap "Voice Input" toggle in conversation screen
  - Tap microphone button
  - Speak clearly: "Hello, how are you?"
  - Tap stop button
- **Verify**:
  - Microphone permission requested (first time)
  - Recording indicator pulses/animates
  - Processing indicator shown
  - Text appears in input field
  - Message sent automatically

#### Test TTS (Text-to-Speech)
- **Expected**: AI responses are read aloud
- **Actions**:
  - Tap "Voice Output" toggle
  - Send any message
  - Wait for AI response
- **Verify**:
  - AI response plays automatically
  - Play/pause controls visible
  - Can stop playback mid-speech
  - Only latest message auto-plays

### 4. File Context

#### Test Image Upload
- **Expected**: Upload image, extract text with OCR
- **Actions**:
  - Tap attachment button (📎)
  - Select "Choose from Gallery"
  - Pick an image with text
  - Wait for processing
  - Send a message referencing the image
- **Verify**:
  - File upload button visible in input bar
  - Image preview appears in file context panel
  - Processing indicator shows during OCR
  - Extracted text displayed in preview
  - AI response includes context from extracted text

#### Test PDF Upload
- **Expected**: Upload PDF, extract text
- **Actions**:
  - Tap attachment button
  - Select "Pick PDF"
  - Choose a PDF file
  - Wait for processing
  - Send message about PDF content
- **Verify**:
  - PDF icon displayed in preview
  - Text extraction completes
  - Can remove file before sending
  - AI understands PDF context

#### Test Audio Upload
- **Expected**: Upload audio, transcribe with STT
- **Actions**:
  - Tap attachment button
  - Select "Pick Audio File"
  - Choose an audio file
  - Wait for transcription
  - Send message
- **Verify**:
  - Audio icon displayed
  - Transcription appears in file preview
  - Can attach multiple files
  - All file contexts included in AI prompt

### 5. Settings Screen

#### Test Settings Display
- **Expected**: View all onboarding preferences
- **Actions**:
  - Navigate to Settings tab
  - Review profile information
  - Review AI personalization settings
- **Verify**:
  - Name, level, daily goal displayed correctly
  - Teaching style, corrections, pace shown
  - Primary focus areas listed
  - All values match onboarding selections

#### Test Reload AI
- **Actions**:
  - Tap "Reload AI Personalization"
- **Verify**:
  - Success message appears
  - AI behavior remains personalized in next conversation

#### Test Reset Onboarding
- **Actions**:
  - Tap "Reset Onboarding"
  - Confirm in alert dialog
- **Verify**:
  - Confirmation alert appears
  - Settings cleared successfully
  - App prompts to restart
  - On restart, onboarding flow starts again

### 6. Progress Screen

#### Test Progress Display
- **Expected**: View achievements and statistics
- **Actions**:
  - Navigate to Progress tab
  - Review streak counter
  - Check level badge
  - View today's stats
  - Scroll through achievements
- **Verify**:
  - Streak counter displays current streak
  - Level and XP shown
  - Today's activity stats visible
  - Achievement cards display correctly
  - Locked vs unlocked achievements differentiated

### 7. Navigation & Persistence

#### Test Tab Navigation
- **Actions**:
  - Switch between Chat, Progress, and Settings tabs
- **Verify**:
  - Smooth transitions
  - State preserved when switching tabs
  - Conversation history maintained
  - Active tab highlighted correctly

#### Test App Restart
- **Actions**:
  - Close and reopen app
- **Verify**:
  - Skips onboarding (already completed)
  - Goes directly to main app
  - Conversation history preserved
  - Settings maintained
  - Voice/file preferences remembered

## Known Limitations (Mock Data)

Since ExecuTorch integration is not yet complete, the following features use mock data:

1. **LLM Responses**: Mock responses based on simple pattern matching
2. **STT Transcription**: Returns "This is a mock transcription..."
3. **TTS Audio**: Uses Expo Speech API as fallback
4. **OCR**: Returns "This is mock text extracted from the image..."
5. **Progress Tracking**: Uses static mock data

These will be replaced with actual ExecuTorch model inference in production.

## Reporting Issues

When reporting bugs, please include:

1. Device/simulator used
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. Console errors (if any)

## Success Criteria

Onboarding is considered successful if:

- ✅ All 6 steps complete without errors
- ✅ User preferences saved to AsyncStorage
- ✅ AI personalization generates appropriate system prompt
- ✅ Main app loads with personalized AI behavior
- ✅ Settings screen displays correct values
- ✅ Voice and file features are accessible
- ✅ Progress tracking UI is functional

## Next Steps After Testing

1. **Report any bugs found** during testing
2. **Verify UI/UX** is intuitive and polished
3. **Test on multiple devices** (iOS and Android)
4. **Test with different onboarding choices** to ensure personalization works
5. **Prepare for ExecuTorch integration** by confirming hooks work with mock data

---

**Happy Testing! 🚀**

