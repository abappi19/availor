/**
 * Type definitions for Availor Tools
 */

export interface AvailorToolParameter {
  type: string;
  description: string;
}

export interface AvailorTool {
  name: string;
  description: string;
  parameters: {
    type: 'dict';
    properties: Record<string, AvailorToolParameter>;
    required: string[];
  };
  execute: (params: any) => Promise<string>;
}

