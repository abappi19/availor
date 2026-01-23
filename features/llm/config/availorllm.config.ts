/**
 * Configuration for Availor LLM feature
 */

import {
    type ChatConfig,
    DEFAULT_SYSTEM_PROMPT,
    type GenerationConfig,
    type ToolsConfig,
} from 'react-native-executorch';

// Re-export DEFAULT_SYSTEM_PROMPT for convenience
export { DEFAULT_SYSTEM_PROMPT };

// Custom system prompt for Availor (currently using default from library)
// export const AVAILOR_SYSTEM_PROMPT =
//     "You are a helpful and friendly English teacher. Help users improve their English through conversation, provide corrections when needed, and explain grammar concepts clearly.";

// /**
//  * Load Hammer model sources using Expo Asset API
//  * This prevents Metro from trying to inline the large .pte file
//  * eslint-disable-next-line @typescript-eslint/no-require-imports
//  */
// export const loadHammerModel = async () => {
//     /* eslint-disable @typescript-eslint/no-require-imports */
//     const [modelAsset] = await Asset.loadAsync(
//         require('@/assets/models/hammer-2.1/hammer2_1_0_5B_8da4w.pte')
//     );
//     const [tokenizerAsset] = await Asset.loadAsync(
//         require('@/assets/models/hammer-2.1/tokenizer.json')
//     );
//     const [tokenizerConfigAsset] = await Asset.loadAsync(
//         require('@/assets/models/hammer-2.1/tokenizer_config.json')
//     );
//     /* eslint-enable @typescript-eslint/no-require-imports */

//     return {
//         modelSource: modelAsset.localUri || modelAsset.uri,
//         tokenizerSource: tokenizerAsset.localUri || tokenizerAsset.uri,
//         tokenizerConfigSource: tokenizerConfigAsset.localUri || tokenizerConfigAsset.uri,
//     };
// };

type AvailorLLMConfiguration = {
    chatConfig?: Partial<ChatConfig>;
    toolsConfig?: ToolsConfig;
    generationConfig?: GenerationConfig;
};

export const getAvailorLLMConfiguration = ({
    chatConfig,
    toolsConfig,
    generationConfig,
}: AvailorLLMConfiguration): AvailorLLMConfiguration => {
    return {
        chatConfig: {
            systemPrompt: DEFAULT_SYSTEM_PROMPT,
            ...chatConfig,
        },
        generationConfig: generationConfig,
        toolsConfig: toolsConfig,
    };
};
