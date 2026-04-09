import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/constants/theme';

interface OnboardingProgressBarProps {
  current: number;
  total: number;
}

export function OnboardingProgressBar({ current, total }: OnboardingProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <LinearGradient
          colors={[...gradients.primary.colors]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${progress}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  track: {
    height: 4,
    backgroundColor: colors.surface2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
