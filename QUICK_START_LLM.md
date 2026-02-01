# Quick Start: LLM Integration

## ✅ What's Already Done

- [x] Installed `react-native-executorch` v0.6.0
- [x] Created `features/llm` with `useAvailorLLM` hook
- [x] Created `features/availor-tools-definition` with tool registry
- [x] Integrated LLM into conversation feature
- [x] Updated `.gitignore` to exclude model files
- [x] Created model directory structure
- [x] Deprecated old LLM service

## 📋 Next Steps (Required)

### 1. Download Model Files (~500MB)

Run these commands from the project root:

```bash
cd assets/models/hammer-2.1

# Download all 3 files
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/hammer-2.1-0.5b-instruct-q4_0_4_32.pte
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/tokenizer.json
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/tokenizer_config.json

cd ../../..
```

### 2. Rebuild Native Apps

```bash
# Clean and rebuild
npx expo prebuild --clean

# iOS
cd ios && pod install && cd ..
pnpm ios

# OR Android
pnpm android
```

### 3. Test the Implementation

1. Open the app
2. Wait for model to load (`isReady === true`)
3. Start a conversation
4. Watch for LLM responses!

## 🎯 Key Features

- **Local Inference**: All AI runs on-device
- **Tool Calling**: LLM can call grammar check and vocabulary tools
- **Streaming**: Real-time token generation
- **Offline**: Works without internet (after model download)
- **Privacy**: All data stays on device

## 📚 Documentation

- **Full Setup Guide**: [MODEL_SETUP.md](./MODEL_SETUP.md)
- **Implementation Details**: [LLM_IMPLEMENTATION_SUMMARY.md](./LLM_IMPLEMENTATION_SUMMARY.md)

## 🔧 Usage Example

```typescript
import { useAvailorLLM } from '@/features/llm';
import { getToolDefinitions } from '@/features/availor-tools-definition';

function MyComponent() {
  const llm = useAvailorLLM();
  const tools = getToolDefinitions();
  
  const handleChat = async () => {
    await llm.generateResponse([
      { role: 'user', content: 'Hello!' }
    ], tools);
    
    console.log(llm.response); // AI response
  };
  
  return (
    <View>
      {!llm.isReady && <Text>Loading model: {llm.downloadProgress}%</Text>}
      {llm.isGenerating && <Text>AI is thinking...</Text>}
      <Text>{llm.response}</Text>
    </View>
  );
}
```

## ⚠️ Important Notes

- Model files (~500MB) are excluded from git
- Requires device with at least 2GB RAM
- First launch may take time to load model
- Memory usage: ~800MB-1GB during inference

## 🐛 Troubleshooting

### Model Not Loading
- Verify all 3 files are downloaded
- Check file sizes match expected sizes
- Rebuild native apps with `npx expo prebuild --clean`

### ExecuTorch Errors
- Ensure `react-native-executorch` is installed
- Run `pod install` in iOS directory
- Clean build and rebuild

### Performance Issues
- Close other apps to free memory
- Test on device with 3GB+ RAM
- Consider using smaller conversation context

## 🚀 Ready to Go!

Download the model files and rebuild the app to start using the local LLM!

