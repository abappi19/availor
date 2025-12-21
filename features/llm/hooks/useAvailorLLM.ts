/**
 * useAvailorLLM Hook
 * Main LLM hook wrapping React Native ExecuTorch useLLM
 */

import { useEffect } from 'react';
import { DEFAULT_SYSTEM_PROMPT, LLMType, SMOLLM2_1_135M_QUANTIZED, useLLM } from 'react-native-executorch';
// import { DEFAULT_SYSTEM_PROMPT, loadHammerModel } from '../config/availorllm.config';

export const useAvailorLLM = (): LLMType => {
    // const [modelConfig, setModelConfig] = useState<any>(null);

    // Load model configuration asynchronously
    // useEffect(() => {
    //     loadHammerModel().then(setModelConfig).catch(console.error);
    // }, []);

    // Initialize LLM once model config is loaded
    // Use preventLoad to avoid loading until config is ready
    const llm = useLLM({
        model: SMOLLM2_1_135M_QUANTIZED
    });

    // Configure on mount with default system prompt
    useEffect(() => {
        if (llm.isReady) {
            llm.configure({
                chatConfig: {
                    systemPrompt: DEFAULT_SYSTEM_PROMPT,
                }
            });
        }
    }, [llm.isReady, llm]);

    return llm;
};

