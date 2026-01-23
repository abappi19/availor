/**
 * Type definitions for Availor LLM feature
 */

import type { ResourceSource } from 'react-native-executorch';

export interface AvailorLLMMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AvailorLLMModelSource {
    modelSource: ResourceSource | (() => ResourceSource);
    tokenizerSource: ResourceSource | (() => ResourceSource);
    tokenizerConfigSource: ResourceSource | (() => ResourceSource);
}
