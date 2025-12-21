# Model Setup Guide

This guide explains how to download and set up the Hammer 2.1 0.5B quantized model for local inference.

## Model Information

- **Model**: Hammer 2.1 0.5B Quantized
- **Size**: ~500MB
- **Memory Usage**: ~800MB-1GB RAM
- **Source**: [HuggingFace](https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/tree/main/hammer-2.1-0.5B/quantized)

## Download Instructions

### Step 1: Create the Models Directory

Create the following directory structure in your project:

```bash
mkdir -p assets/models/hammer-2.1
```

### Step 2: Download Model Files

Download the following files from HuggingFace to the `assets/models/hammer-2.1/` directory:

1. **Model file** (~500MB):
   - URL: https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/hammer-2.1-0.5b-instruct-q4_0_4_32.pte
   - Save as: `assets/models/hammer-2.1/hammer-2.1-0.5b-instruct-q4_0_4_32.pte`

2. **Tokenizer**:
   - URL: https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/tokenizer.json
   - Save as: `assets/models/hammer-2.1/tokenizer.json`

3. **Tokenizer Config**:
   - URL: https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/tokenizer_config.json
   - Save as: `assets/models/hammer-2.1/tokenizer_config.json`

### Step 3: Using curl or wget (Recommended)

```bash
# Navigate to the models directory
cd assets/models/hammer-2.1

# Download model file
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/hammer-2.1-0.5b-instruct-q4_0_4_32.pte

# Download tokenizer
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/tokenizer.json

# Download tokenizer config
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/tokenizer_config.json
```

### Step 4: Verify Files

After downloading, your directory structure should look like this:

```
assets/
└── models/
    └── hammer-2.1/
        ├── hammer-2.1-0.5b-instruct-q4_0_4_32.pte  (~500MB)
        ├── tokenizer.json
        └── tokenizer_config.json
```

### Step 5: Verify File Sizes

- `hammer-2.1-0.5b-instruct-q4_0_4_32.pte`: ~500MB
- `tokenizer.json`: ~2-3MB
- `tokenizer_config.json`: ~1KB

## Git Ignore

The `.gitignore` file has been updated to exclude these large model files from version control:

```gitignore
# ExecuTorch Model Files
*.pte
assets/models/
```

## Usage

Once the model files are in place, the app will automatically load them using the `useAvailorLLM` hook. The model will be ready when `isReady === true`.

## Troubleshooting

### Model Not Loading

If you encounter issues with model loading:

1. Verify all three files are present in the correct directory
2. Check file sizes match expected sizes
3. Ensure files are not corrupted (re-download if necessary)
4. Check the console for specific error messages from ExecuTorch

### Download Failed

If downloads fail:

1. Check your internet connection
2. Try downloading from HuggingFace directly in your browser
3. Use the HuggingFace CLI: `huggingface-cli download software-mansion/react-native-executorch-hammer-2.1`

## Model Configuration

The model configuration is defined in `features/llm/config/availorllm.config.ts`. You can customize the system prompt and other settings there.

## Performance

- **Inference Speed**: Fast on most devices
- **Memory Usage**: ~800MB-1GB RAM
- **Recommended**: Devices with at least 2GB RAM
- **Best For**: English learning conversations with tool calling support

