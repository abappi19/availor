/**
 * Central Registry for Availor Tools
 * Manages all available tools for the LLM
 */

import { grammarCheckTool } from './tools/grammar-check.tool';
import { vocabularyTool } from './tools/vocabulary.tool';
import type { AvailorTool } from './types/availortools.types';

export const AVAILOR_TOOLS_REGISTRY: AvailorTool[] = [
  grammarCheckTool,
  vocabularyTool,
  // Add more tools here
];

/**
 * Convert tools to LLM tool definition format
 */
export const getToolDefinitions = () => {
  return AVAILOR_TOOLS_REGISTRY.map(tool => ({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters,
  }));
};

/**
 * Execute a tool by name
 */
export const executeToolByName = async (toolName: string, params: any): Promise<string> => {
  const tool = AVAILOR_TOOLS_REGISTRY.find(t => t.name === toolName);
  if (!tool) {
    throw new Error(`Tool not found: ${toolName}`);
  }
  return await tool.execute(params);
};

