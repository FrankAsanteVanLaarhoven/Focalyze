
// Theme configuration for ADHD-friendly UI

// Define valid React Native fontWeight types
type FontWeightType = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// ADHD-friendly color palette with high contrast and reduced visual stress
export const colors = {
  // Primary colors
  primary: '#2E7DF7', // Accessible blue
  primaryLight: '#75A8FF',
  primaryDark: '#0055D4',
  
  // Secondary colors
  secondary: '#6B4CE6', // Purple
  secondaryLight: '#9B7DFF',
  secondaryDark: '#4527A0',
  
  // Accent colors
  accent: '#00C49A', // Teal
  accentLight: '#5FFFD0',
  accentDark: '#00916D',
  
  // Semantic colors
  success: '#2E9D4C', // Green
  warning: '#F9A825', // Amber
  error: '#D93636', // Red
  info: '#2196F3', // Blue
  
  // Neutral colors
  background: '#FFFFFF',
  surface: '#F5F7FA',
  surfaceVariant: '#E8ECF4',
  
  // Text colors
  textPrimary: '#202124', // Near black
  textSecondary: '#5F6368', // Dark gray
  textDisabled: '#9AA0A6', // Medium gray
  textOnPrimary: '#FFFFFF', // White
  textOnSecondary: '#FFFFFF', // White
  
  // Border colors
  border: '#DADCE0',
  divider: '#EEEEEE',
  
  // Dark mode colors
  darkBackground: '#121212',
  darkSurface: '#1E1E1E',
  darkSurfaceVariant: '#2D2D2D',
  darkTextPrimary: '#E8EAED',
  darkTextSecondary: '#9AA0A6',
  darkBorder: '#5F6368',
  darkDivider: '#3C4043',
};

// ADHD-specific UI customizations
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 'bold' as FontWeightType,
    letterSpacing: 0.25,
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold' as FontWeightType,
    letterSpacing: 0,
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold' as FontWeightType,
    letterSpacing: 0.15,
  },
  subtitle1: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500' as FontWeightType,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500' as FontWeightType,
    letterSpacing: 0.1,
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal' as FontWeightType,
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal' as FontWeightType,
    letterSpacing: 0.25,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as FontWeightType,
    letterSpacing: 1.25,
    textTransform: 'uppercase' as 'uppercase', // Fix: Specify exact type
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'normal' as FontWeightType,
    letterSpacing: 0.4,
  },
  overline: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'normal' as FontWeightType,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as 'uppercase', // Fix: Specify exact type
  },
};

// Accessibility settings
export const accessibility = {
  focusIndicatorColor: colors.primary,
  focusIndicatorSize: 3,
  touchTargetMinSize: 44, // Minimum touch target size in pixels
  animationDurationScale: 1.0, // Default animation duration scale
};

// Theme configuration for web (can be extended for React Native later)
export const theme = {
  colors,
  spacing,
  typography,
  accessibility,
};

export default theme;
