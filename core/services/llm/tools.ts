/**
 * LLM Tools - Function calling tools for the AI
 */

export interface ToolParameter {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'array';
    description: string;
    required?: boolean;
}

export interface Tool {
    name: string;
    description: string;
    parameters: ToolParameter[];
    execute: (params: Record<string, unknown>) => Promise<string>;
}

/**
 * Grammar check tool
 */
export const grammarCheckTool: Tool = {
    name: 'grammar_check',
    description: 'Check text for grammar errors and provide corrections',
    parameters: [
        {
            name: 'text',
            type: 'string',
            description: 'The text to check for grammar errors',
            required: true,
        },
    ],
    execute: async (params) => {
        const text = params.text as string;
        // Mock grammar check
        return `Grammar check for: "${text}"\n\nNo major errors found. The sentence structure is correct.`;
    },
};

/**
 * Vocabulary lookup tool
 */
export const vocabularyTool: Tool = {
    name: 'vocabulary_lookup',
    description: 'Look up word definitions, synonyms, and example sentences',
    parameters: [
        {
            name: 'word',
            type: 'string',
            description: 'The word to look up',
            required: true,
        },
    ],
    execute: async (params) => {
        const word = params.word as string;
        // Mock vocabulary lookup
        return `Word: ${word}\nDefinition: A commonly used English word.\nSynonyms: similar word, alternate word\nExample: "I used the word ${word} in a sentence."`;
    },
};

/**
 * Tool registry
 */
export const tools: Tool[] = [grammarCheckTool, vocabularyTool];

/**
 * Get tool definitions for LLM
 */
export function getToolDefinitions(): Array<{ name: string; description: string; parameters: ToolParameter[] }> {
    return tools.map(({ name, description, parameters }) => ({
        name,
        description,
        parameters,
    }));
}

/**
 * Execute a tool by name
 */
export async function executeTool(
    toolName: string,
    params: Record<string, unknown>
): Promise<string | null> {
    const tool = tools.find((t) => t.name === toolName);
    if (!tool) return null;
    return tool.execute(params);
}
