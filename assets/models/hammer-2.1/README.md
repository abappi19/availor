# Hammer 2.1 Model Files

This directory should contain the Hammer 2.1 0.5B quantized model files.

## Required Files

Download these files from HuggingFace:

1. `hammer2_1_0_5B_8da4w.pte` (~809MB)
2. `tokenizer.json` (~11MB)
3. `tokenizer_config.json` (~7kB)

## Download Instructions

See the main [MODEL_SETUP.md](../../../MODEL_SETUP.md) file in the project root for detailed download instructions.

## Quick Download

```bash
# From this directory, run:
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/hammer2_1_0_5B_8da4w.pte
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/hammer-2.1-0.5B/quantized/config.json
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/tokenizer.json
curl -L -O https://huggingface.co/software-mansion/react-native-executorch-hammer-2.1/resolve/main/tokenizer_config.json
```

## Note

These files are excluded from git via `.gitignore` to avoid committing large binary files to the repository.

