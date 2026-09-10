
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, typography } from '../../styles/theme';

const TransitionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transition Screen</Text>
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
    ...typography.h2,
    color: colors.textPrimary,
  },
});

export default TransitionScreen;
