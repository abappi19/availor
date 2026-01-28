/**
 * OCR Service - Text extraction from images
 * TODO: Replace mock with react-native-executorch when available
 */

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
 * Extract text from image
 */
export async function extractText(imageUri: string): Promise<OCRResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));

    // Mock extracted text
    const mockTexts = [
        'Hello! This is sample text extracted from the image. It demonstrates how the OCR system would work when fully integrated.',
        'The quick brown fox jumps over the lazy dog. This is a common English pangram used for testing.',
        'English Learning Tip: Practice makes perfect! Try to read English texts every day to improve your skills.',
        'Welcome to our English class. Today we will learn about present perfect tense.',
        'Vocabulary: Persistent (adj.) - continuing to exist despite difficulties.',
    ];

    const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];

    return {
        text: randomText,
        confidence: 0.85 + Math.random() * 0.1,
        boundingBoxes: [
            {
                text: `${randomText.split('.')[0]}.`,
                x: 10,
                y: 10,
                width: 300,
                height: 50,
            },
        ],
    };
}

/**
 * Extract text from multiple images
 */
export async function extractTextBatch(imageUris: string[]): Promise<OCRResult[]> {
    return Promise.all(imageUris.map((uri) => extractText(uri)));
}
