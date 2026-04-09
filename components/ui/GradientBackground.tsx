import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '@/constants/theme';

type GradientVariant = keyof typeof gradients;

interface GradientBackgroundProps {
  variant?: GradientVariant;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function GradientBackground({
  variant = 'primary',
  style,
  children,
}: GradientBackgroundProps) {
  const g = gradients[variant];

  return (
    <LinearGradient
      colors={[...g.colors]}
      start={g.start}
      end={g.end}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
