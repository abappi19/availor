/**
 * Theme Configuration
 * Manages light/dark mode and theme switching
 */

import { tokens } from './tokens';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: '#FFFFFF',
    foreground: tokens.colors.gray[900],
    card: '#FFFFFF',
    cardForeground: tokens.colors.gray[900],
    primary: tokens.colors.primary[500],
    primaryForeground: '#FFFFFF',
    secondary: tokens.colors.gray[100],
    secondaryForeground: tokens.colors.gray[900],
    muted: tokens.colors.gray[100],
    mutedForeground: tokens.colors.gray[600],
    accent: tokens.colors.primary[100],
    accentForeground: tokens.colors.primary[900],
    border: tokens.colors.gray[200],
    success: tokens.colors.success[500],
    warning: tokens.colors.warning[500],
    error: tokens.colors.error[500],
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: tokens.colors.gray[900],
    foreground: tokens.colors.gray[50],
    card: tokens.colors.gray[800],
    cardForeground: tokens.colors.gray[50],
    primary: tokens.colors.primary[400],
    primaryForeground: tokens.colors.gray[900],
    secondary: tokens.colors.gray[700],
    secondaryForeground: tokens.colors.gray[50],
    muted: tokens.colors.gray[700],
    mutedForeground: tokens.colors.gray[400],
    accent: tokens.colors.primary[900],
    accentForeground: tokens.colors.primary[100],
    border: tokens.colors.gray[700],
    success: tokens.colors.success[400],
    warning: tokens.colors.warning[400],
    error: tokens.colors.error[400],
  },
};

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

