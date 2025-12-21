/**
 * AI Personalization Storage
 * Stores user preferences that configure AI behavior
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export type TeachingStyle = 'encouraging' | 'direct' | 'balanced';
export type CorrectionFrequency = 'every_mistake' | 'major_errors' | 'end_of_conversation' | 'minimal';
export type LearningPace = 'intensive' | 'moderate' | 'relaxed';
export type FocusArea = 'grammar' | 'vocabulary' | 'pronunciation' | 'fluency' | 'writing' | 'listening';

export interface AIPersonalization {
  // Teaching approach
  teachingStyle: TeachingStyle;
  formality: 'casual' | 'formal' | 'mixed';
  
  // Correction preferences
  correctionFrequency: CorrectionFrequency;
  explainCorrections: boolean;
  
  // Content difficulty
  vocabularyLevel: 'simple' | 'intermediate' | 'advanced';
  sentenceComplexity: 'simple' | 'moderate' | 'complex';
  
  // Focus areas (what to emphasize)
  primaryFocusAreas: FocusArea[];
  secondaryFocusAreas: FocusArea[];
  
  // Learning preferences
  learningPace: LearningPace;
  sessionDuration: number; // minutes
  practiceFrequency: 'daily' | 'few_times_week' | 'weekly';
  
  // Conversation preferences
  preferredTopics: string[];
  avoidTopics: string[];
  realWorldContexts: string[]; // e.g., "work meetings", "travel", "shopping"
  
  // Additional preferences
  useExamples: boolean;
  providePracticeExercises: boolean;
  culturalContext: boolean; // explain cultural nuances
}

const STORAGE_KEY = '@availor:ai_personalization';

class AIPersonalizationService {
  /**
   * Get AI personalization settings
   */
  async getSettings(): Promise<AIPersonalization | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading AI personalization:', error);
      return null;
    }
  }

  /**
   * Save AI personalization settings
   */
  async saveSettings(settings: Partial<AIPersonalization>): Promise<AIPersonalization> {
    try {
      const existing = await this.getSettings();
      
      const updated: AIPersonalization = {
        teachingStyle: settings.teachingStyle || existing?.teachingStyle || 'balanced',
        formality: settings.formality || existing?.formality || 'mixed',
        correctionFrequency: settings.correctionFrequency || existing?.correctionFrequency || 'major_errors',
        explainCorrections: settings.explainCorrections ?? existing?.explainCorrections ?? true,
        vocabularyLevel: settings.vocabularyLevel || existing?.vocabularyLevel || 'intermediate',
        sentenceComplexity: settings.sentenceComplexity || existing?.sentenceComplexity || 'moderate',
        primaryFocusAreas: settings.primaryFocusAreas || existing?.primaryFocusAreas || ['fluency'],
        secondaryFocusAreas: settings.secondaryFocusAreas || existing?.secondaryFocusAreas || [],
        learningPace: settings.learningPace || existing?.learningPace || 'moderate',
        sessionDuration: settings.sessionDuration || existing?.sessionDuration || 15,
        practiceFrequency: settings.practiceFrequency || existing?.practiceFrequency || 'daily',
        preferredTopics: settings.preferredTopics || existing?.preferredTopics || [],
        avoidTopics: settings.avoidTopics || existing?.avoidTopics || [],
        realWorldContexts: settings.realWorldContexts || existing?.realWorldContexts || [],
        useExamples: settings.useExamples ?? existing?.useExamples ?? true,
        providePracticeExercises: settings.providePracticeExercises ?? existing?.providePracticeExercises ?? true,
        culturalContext: settings.culturalContext ?? existing?.culturalContext ?? true,
      };

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error saving AI personalization:', error);
      throw error;
    }
  }

  /**
   * Generate system prompt based on personalization
   */
  async generateSystemPrompt(): Promise<string> {
    const settings = await this.getSettings();
    if (!settings) {
      return 'You are a helpful English teacher.';
    }

    let prompt = 'You are an English teacher. ';

    // Teaching style
    switch (settings.teachingStyle) {
      case 'encouraging':
        prompt += 'Be very encouraging, positive, and supportive. Celebrate every success. ';
        break;
      case 'direct':
        prompt += 'Be direct and straightforward. Focus on efficiency and clear feedback. ';
        break;
      case 'balanced':
        prompt += 'Balance encouragement with constructive feedback. ';
        break;
    }

    // Formality
    switch (settings.formality) {
      case 'casual':
        prompt += 'Use casual, friendly language. ';
        break;
      case 'formal':
        prompt += 'Maintain a professional, formal tone. ';
        break;
      case 'mixed':
        prompt += 'Adapt formality based on the context. ';
        break;
    }

    // Corrections
    switch (settings.correctionFrequency) {
      case 'every_mistake':
        prompt += 'Correct every grammatical or vocabulary mistake immediately. ';
        break;
      case 'major_errors':
        prompt += 'Only correct significant errors that affect understanding. ';
        break;
      case 'end_of_conversation':
        prompt += 'Make notes of errors and provide a summary at the end. ';
        break;
      case 'minimal':
        prompt += 'Rarely correct unless critical. Focus on fluency over accuracy. ';
        break;
    }

    if (settings.explainCorrections) {
      prompt += 'Always explain why corrections are needed. ';
    }

    // Focus areas
    if (settings.primaryFocusAreas.length > 0) {
      prompt += `Primary focus: ${settings.primaryFocusAreas.join(', ')}. `;
    }

    // Vocabulary level
    const vocabMap = {
      simple: 'Use simple, common words. Avoid complex vocabulary.',
      intermediate: 'Use a mix of common and intermediate vocabulary.',
      advanced: 'Feel free to use advanced vocabulary and explain new words.',
    };
    prompt += vocabMap[settings.vocabularyLevel] + ' ';

    // Learning pace
    if (settings.learningPace === 'intensive') {
      prompt += 'Introduce new concepts frequently. Challenge the student. ';
    } else if (settings.learningPace === 'relaxed') {
      prompt += 'Take time to reinforce concepts. Don\'t rush. ';
    }

    // Additional preferences
    if (settings.useExamples) {
      prompt += 'Provide examples to illustrate points. ';
    }

    if (settings.providePracticeExercises) {
      prompt += 'Suggest practice exercises when appropriate. ';
    }

    if (settings.culturalContext) {
      prompt += 'Explain cultural context and nuances when relevant. ';
    }

    // Topics
    if (settings.preferredTopics.length > 0) {
      prompt += `Preferred conversation topics: ${settings.preferredTopics.join(', ')}. `;
    }

    if (settings.realWorldContexts.length > 0) {
      prompt += `Focus on real-world contexts: ${settings.realWorldContexts.join(', ')}. `;
    }

    prompt += 'Keep responses concise and conversational.';

    return prompt;
  }

  /**
   * Clear personalization settings
   */
  async clear(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export const aiPersonalizationService = new AIPersonalizationService();

