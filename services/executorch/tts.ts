/**
 * Text-to-Speech Service - Using expo-speech (native)
 * This uses platform TTS, not ExecuTorch models
 */

import * as Speech from 'expo-speech';

export interface TTSConfig {
  language?: string;
  pitch?: number;
  rate?: number;
}

class TTSService {
  private config: TTSConfig;

  constructor(config: TTSConfig = {}) {
    this.config = {
      language: config.language || 'en',
      pitch: config.pitch || 1.0,
      rate: config.rate || 0.9,
    };
  }

  /**
   * Speak text using native TTS
   */
  async speak(text: string, options?: Partial<TTSConfig>): Promise<void> {
    const speakOptions = {
      language: options?.language || this.config.language,
      pitch: options?.pitch || this.config.pitch,
      rate: options?.rate || this.config.rate,
    };

    await Speech.speak(text, speakOptions);
  }

  /**
   * Stop speaking
   */
  async stop(): Promise<void> {
    await Speech.stop();
  }

  /**
   * Check if currently speaking
   */
  async isSpeaking(): Promise<boolean> {
    return await Speech.isSpeakingAsync();
  }

  /**
   * Set configuration
   */
  setConfig(config: Partial<TTSConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export const ttsService = new TTSService();

