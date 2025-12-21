# NativeWind v5 Setup - Completed ✅

This project has been properly configured with **NativeWind v5** (preview) according to the [official documentation](https://www.nativewind.dev/v5/getting-started/installation).

## ✅ Completed Setup Steps

### 1. Dependencies Installed
```json
{
  "dependencies": {
    "nativewind": "5.0.0-preview.2",
    "react-native-css": "^3.0.1",
    "react-native-reanimated": "~4.1.6",
    "react-native-safe-area-context": "~5.6.2"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.18",
    "@tailwindcss/postcss": "^4.1.18",
    "postcss": "^8.5.6"
  },
  "overrides": {
    "lightningcss": "1.30.1"
  }
}
```

### 2. PostCSS Configuration
**File:** `postcss.config.mjs`
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 3. Global CSS
**File:** `global.css`
```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";

@import "nativewind/theme";
```

### 4. Metro Configuration
**File:** `metro.config.js`
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config);
```

### 5. TypeScript Types
**File:** `nativewind-env.d.ts`
```typescript
/// <reference types="react-native-css/types" />

// NOTE: This file should not be edited and should be committed with your source code.
```

### 6. Tailwind Configuration
**File:** `tailwind.config.js`
- Custom color palette (primary, success, warning, error, secondary, tertiary)
- Custom spacing scale
- Custom border radius
- Custom font sizes with line heights
- Custom font weights

### 7. CSS Import
The `global.css` is imported in `app/_layout.tsx`:
```typescript
import '../global.css';
```

## 🎨 Custom Theme

The project includes a comprehensive custom theme:

- **Primary colors**: Blue palette (#2196F3)
- **Success colors**: Green palette (#4CAF50)
- **Warning colors**: Orange palette (#FF9800)
- **Error colors**: Red palette (#F44336)
- **Secondary colors**: Pink palette (#E91E63)
- **Tertiary colors**: Purple palette (#9C27B0)
- **Special colors**: Gold, Silver, Bronze for gamification

## 📝 Usage

Use Tailwind classes directly in your React Native components:

```tsx
import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View className="flex-1 items-center justify-center bg-primary-50">
      <Text className="text-2xl font-bold text-primary-700">
        Hello NativeWind v5!
      </Text>
    </View>
  );
}
```

## 🚀 Running the App

1. **Start Metro bundler:**
   ```bash
   pnpm start
   ```

2. **Run on iOS:**
   ```bash
   pnpm ios
   ```

3. **Run on Android:**
   ```bash
   pnpm android
   ```

## 🔄 Clear Cache (if needed)

If styles aren't updating, clear the cache:
```bash
pnpm start --clear
```

## 📚 Resources

- [NativeWind v5 Documentation](https://www.nativewind.dev/v5/getting-started/installation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Native CSS](https://github.com/nativewind/react-native-css)

## ⚠️ Important Notes

1. **LightningCSS Version**: Pinned to `1.30.1` via `overrides` to prevent deserialization errors
2. **Import Order**: The CSS imports use `@import` instead of `@tailwind` for better compatibility
3. **TypeScript**: Uses `react-native-css/types` instead of old `nativewind/types`
4. **Metro Config**: No need to specify `input` option, it's auto-detected

## ✨ Status

**NativeWind v5 setup is complete and ready for use!**

The app successfully builds and runs with the new NativeWind v5 configuration.

