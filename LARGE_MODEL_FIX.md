# Large Model File Fix

## Problem

When trying to bundle the app with the Hammer 2.1 0.5B model file (809MB), Metro bundler failed with:

```
ERROR  Error: Cannot create a string longer than 0x1fffffe8 characters
```

This error occurs because Metro tries to inline large files as strings, which exceeds JavaScript's maximum string length (~536MB).

## Solution

Use **Expo Asset API** to load model files as assets instead of bundling them inline.

### Changes Made

#### 1. Updated `features/llm/config/availorllm.config.ts`

Changed from direct `require()` to async `Asset.loadAsync()`:

```typescript
import { Asset } from 'expo-asset';

export const loadHammerModel = async () => {
    const [modelAsset] = await Asset.loadAsync(
        require('@/assets/models/hammer-2.1/hammer2_1_0_5B_8da4w.pte')
    );
    const [tokenizerAsset] = await Asset.loadAsync(
        require('@/assets/models/hammer-2.1/tokenizer.json')
    );
    const [tokenizerConfigAsset] = await Asset.loadAsync(
        require('@/assets/models/hammer-2.1/tokenizer_config.json')
    );

    return {
        modelSource: modelAsset.localUri || modelAsset.uri,
        tokenizerSource: tokenizerAsset.localUri || tokenizerAsset.uri,
        tokenizerConfigSource: tokenizerConfigAsset.localUri || tokenizerConfigAsset.uri,
    };
};
```

#### 2. Updated `features/llm/hooks/useAvailorLLM.ts`

Load model config asynchronously before initializing LLM:

```typescript
export const useAvailorLLM = (): LLMType => {
    const [modelConfig, setModelConfig] = useState<any>(null);

    // Load model configuration asynchronously
    useEffect(() => {
        loadHammerModel().then(setModelConfig).catch(console.error);
    }, []);

    // Initialize LLM once model config is loaded
    const llm = useLLM({
        model: modelConfig || {
            modelSource: '',
            tokenizerSource: '',
            tokenizerConfigSource: '',
        },
        preventLoad: !modelConfig,
    });

    // ... rest of the hook
};
```

#### 3. Added `expo-asset` Dependency

```json
{
  "dependencies": {
    "expo-asset": "~12.0.12"
  }
}
```

## How It Works

1. **Metro Configuration**: The `.pte` extension is registered as an asset type in `metro.config.js`
2. **Asset Loading**: `Asset.loadAsync()` loads the file reference without inlining the content
3. **File URIs**: The asset API returns file URIs (`localUri` or `uri`) that point to the actual files
4. **ExecuTorch**: The LLM hook receives file URIs instead of inline content

## Benefits

- ✅ No more string length errors
- ✅ Faster bundling (doesn't process large files)
- ✅ Smaller bundle size
- ✅ Model files stay as separate assets
- ✅ Works with files of any size

## Testing

1. Ensure model files are in `assets/models/hammer-2.1/`:
   - `hammer2_1_0_5B_8da4w.pte` (809MB)
   - `tokenizer.json` (11MB)
   - `tokenizer_config.json` (7kB)

2. Run the app:
   ```bash
   pnpm ios
   # or
   pnpm android
   ```

3. The model will load asynchronously when the hook is first used

## Notes

- The `preventLoad: !modelConfig` flag ensures the LLM doesn't try to load until the config is ready
- Model files are still excluded from git via `.gitignore`
- This approach works for any large asset files, not just models

