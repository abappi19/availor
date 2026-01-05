# Conversation Hook Fix

## Problem

The `useConversation` hook was throwing an error:
```
Error: Cannot perform operation + on undefined values
```

This occurred because the code was calling `availorLLM.sendMessage()` which doesn't exist in the `LLMType` interface from `react-native-executorch`.

## Solution

### Changes Made

#### 1. Fixed `features/conversation/hooks/useConversation.ts`

**Before:**
```typescript
await availorLLM.sendMessage(messageContent); // ❌ Method doesn't exist
```

**After:**
```typescript
// Save user message to storage and add to state
const userMessage = await conversationHistoryService.addMessage(conversationId, {
    role: 'user',
    content: messageContent,
});

setMessages((prev) => [...prev, userMessage]);

// Generate LLM response using the correct API
await availorLLM.generate([
    {
        role: 'user',
        content: messageContent,
    }
], toolDefinitions); // ✅ Correct method with proper parameters
```

**Key Changes:**
- Replaced `sendMessage()` with `generate()` (the correct ExecuTorch API)
- Pass messages as an array of message objects
- Pass tool definitions as second parameter
- Properly save user message before generating response
- Handle AI response in a separate `useEffect` to avoid duplicates

#### 2. Added Response Handling in useEffect

```typescript
// Track if we've already processed the current response to avoid duplicates
const lastProcessedResponse = useRef<string>('');

// Watch for new responses from the LLM and add them to messages
useEffect(() => {
    if (!conversationId || !availorLLM.response) return;
    
    // Skip if we've already processed this response
    if (availorLLM.response === lastProcessedResponse.current) return;
    
    // Skip if currently generating (wait for complete response)
    if (availorLLM.isGenerating) return;

    lastProcessedResponse.current = availorLLM.response;

    // Save AI response to storage and add to state
    conversationHistoryService.addMessage(conversationId, {
        role: 'assistant',
        content: availorLLM.response,
    }).then((aiMessage) => {
        setMessages((prev) => {
            // Check if this message is already in the list to avoid duplicates
            const exists = prev.some(m => m.id === aiMessage.id);
            if (exists) return prev;
            return [...prev, aiMessage];
        });
    }).catch(console.error);

}, [availorLLM.response, availorLLM.isGenerating, conversationId]);
```

**Benefits:**
- Automatically adds AI responses to messages when they're ready
- Prevents duplicate messages
- Waits for generation to complete before adding message
- Properly tracks processed responses

#### 3. Fixed `features/llm/config/availorllm.config.ts`

**Before:**
```typescript
export { DEFAULT_SYSTEM_PROMPT } from "react-native-executorch"; // ❌ Linter error

// Later in the file:
systemPrompt: DEFAULT_SYSTEM_PROMPT, // ❌ Can't reference re-exported variable
```

**After:**
```typescript
import { ChatConfig, DEFAULT_SYSTEM_PROMPT, GenerationConfig, ToolsConfig } from "react-native-executorch";

// Re-export DEFAULT_SYSTEM_PROMPT for convenience
export { DEFAULT_SYSTEM_PROMPT }; // ✅ Properly imported and exported
```

#### 4. Fixed Message Type Issues

Removed `conversationId` property from Message objects (not part of the Message interface):

**Before:**
```typescript
const userMessage: Message = {
    id: Date.now().toString(),
    conversationId: conversationId, // ❌ Not in Message type
    role: 'user',
    content: messageContent,
    timestamp: Date.now(),
};
```

**After:**
```typescript
const userMessage = await conversationHistoryService.addMessage(conversationId, {
    role: 'user',
    content: messageContent,
}); // ✅ Let the service create the Message with correct properties
```

## How It Works Now

1. **User sends message:**
   - Message is saved to storage via `conversationHistoryService`
   - Message is added to local state immediately
   
2. **LLM generates response:**
   - Call `availorLLM.generate()` with user message and tool definitions
   - The LLM uses its configured message history (set up in useEffect)
   
3. **Response is handled:**
   - A separate `useEffect` watches `availorLLM.response`
   - When response is complete (not generating), it's saved and added to messages
   - Duplicate prevention ensures messages aren't added multiple times

## Testing

The conversation should now work correctly:

```bash
pnpm ios
```

1. Type a message and send
2. Message appears immediately in the UI
3. LLM generates a response
4. Response appears when complete
5. Both messages are persisted to storage

## API Reference

### ExecuTorch LLM Methods

- ✅ `generate(messages, tools)` - Generate response from array of messages
- ❌ `sendMessage(content)` - **Does not exist**

### Correct Usage

```typescript
// Correct way to use the LLM
await llm.generate([
    { role: 'user', content: 'Hello' }
], toolDefinitions);

// Response is available in llm.response
// Generation status in llm.isGenerating
```

