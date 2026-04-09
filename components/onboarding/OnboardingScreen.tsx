import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { OnboardingProgressBar } from './ProgressBar';

const TOTAL_SCREENS = 12;

interface OnboardingScreenProps {
  step: number;
  showProgress?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  footer?: React.ReactNode;
}

export function OnboardingScreen({
  step,
  showProgress = true,
  children,
  style,
  footer,
}: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {showProgress && <OnboardingProgressBar current={step} total={TOTAL_SCREENS} />}
      <View style={[styles.content, style]}>{children}</View>
      {footer && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          {footer}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
});
