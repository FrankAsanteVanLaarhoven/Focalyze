
import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: typography.body1.fontSize,
    lineHeight: typography.body1.lineHeight,
    fontWeight: typography.body1.fontWeight,
    letterSpacing: typography.body1.letterSpacing,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});

export default LoadingScreen;
