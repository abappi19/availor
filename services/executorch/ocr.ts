/**
 * OCR Service - Placeholder for React Native ExecuTorch useOCR
 * This is a mock implementation that will be replaced with actual ExecuTorch integration
 */

export interface OCRConfig {
  language?: string;
}

export interface OCRResult {
  text: string;
  confidence: number;
  boundingBoxes?: Array<{
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
}

/**
 * Placeholder OCR service
 * TODO: Replace with actual react-native-executorch useOCR hook when available
 */
class OCRService {
  private config: OCRConfig;

  constructor(config: OCRConfig = {}) {
    this.config = {
      language: config.language || 'en',
    };
  }

  /**
   * Extract text from image
   * This is a mock implementation
   */
  async extractText(imageUri: string): Promise<OCRResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

    // Mock extracted text
    const mockTexts = [
      "Hello! This is sample text extracted from the image. It demonstrates how the OCR system would work when fully integrated with ExecuTorch.",
      "The quick brown fox jumps over the lazy dog. This is a common English pangram used for testing.",
      "English Learning Tip: Practice makes perfect! Try to read English texts every day to improve your skills.",
      "Welcome to our English class. Today we will learn about present perfect tense and its usage in daily conversations.",
      "Vocabulary: Persistent (adj.) - continuing to exist despite difficulties. Example: She was persistent in her studies.",
    ];

    const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];

    return {
      text: randomText,
      confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
      boundingBoxes: [
        {
          text: randomText.split('.')[0] + '.',
          x: 10,
          y: 10,
          width: 300,
          height: 50,
        },
      ],
    };
  }

  /**
   * Process batch of images
   */
  async extractTextBatch(imageUris: string[]): Promise<OCRResult[]> {
    return Promise.all(imageUris.map((uri) => this.extractText(uri)));
  }
}

export const ocrService = new OCRService();

// Export hook-like interface for future ExecuTorch integration
export const useOCR = () => {
  return {
    recognizeText: (imageUri: string) => ocrService.extractText(imageUri),
    isProcessing: false,
    progress: 0,
    error: null,
  };
};

