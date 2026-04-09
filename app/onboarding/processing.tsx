import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { colors, gradients } from '@/constants/theme';

const steps = [
  { icon: 'scan' as const, text: 'Analyzing your skin profile...' },
  { icon: 'color-palette' as const, text: 'Mapping your skin concerns...' },
  { icon: 'sparkles' as const, text: 'Building your glow plan...' },
  { icon: 'checkmark-circle' as const, text: 'Your profile is ready!' },
];

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Spinning animation
  const spinValue = useSharedValue(0);
  // Pulse
  const pulseScale = useSharedValue(1);
  // Progress ring
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    spinValue.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [spinValue, pulseScale]);

  // Step through the processing stages
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, index) => {
      if (index > 0) {
        timers.push(
          setTimeout(() => setCurrentStep(index), index * 900)
        );
      }
    });

    // Auto-advance after all steps
    timers.push(
      setTimeout(() => {
        router.replace('/onboarding/paywall');
      }, steps.length * 900 + 600)
    );

    // Animate progress bar
    progressWidth.value = withTiming(100, {
      duration: steps.length * 900,
      easing: Easing.out(Easing.quad),
    });

    return () => timers.forEach(clearTimeout);
  }, [router, progressWidth]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const isComplete = currentStep === steps.length - 1;

  return (
    <OnboardingScreen step={11} showProgress={false}>
      <View style={styles.content}>
        {/* Pulsing gradient orb */}
        <Animated.View entering={FadeIn.duration(600)} style={[styles.orbContainer, pulseStyle]}>
          <LinearGradient
            colors={[...gradients.wide.colors]}
            start={gradients.wide.start}
            end={gradients.wide.end}
            style={styles.orb}
          >
            {isComplete ? (
              <Ionicons name="checkmark" size={48} color={colors.white} />
            ) : (
              <Animated.View style={spinStyle}>
                <Ionicons name="sync" size={48} color={colors.white} />
              </Animated.View>
            )}
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            {isComplete ? 'all set!' : 'creating your\nglow profile...'}
          </Text>
        </Animated.View>

        {/* Progress bar */}
        <Animated.View entering={FadeIn.delay(500).duration(500)} style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFillWrapper, progressStyle]}>
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressFill}
              />
            </Animated.View>
          </View>
        </Animated.View>

        {/* Steps */}
        <View style={styles.stepsList}>
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep;
            return (
              <Animated.View
                key={step.text}
                entering={FadeInDown.delay(600 + index * 150).duration(400)}
              >
                <View style={[styles.stepRow, isCurrent && styles.stepRowActive]}>
                  <View style={[styles.stepIcon, isActive && styles.stepIconActive]}>
                    <Ionicons
                      name={isActive ? step.icon : 'ellipse-outline'}
                      size={16}
                      color={isActive ? colors.hotpink : colors.textDim}
                    />
                  </View>
                  <Text
                    variant="bodySmall"
                    style={[
                      styles.stepText,
                      isActive && { color: colors.text },
                      !isActive && { color: colors.textDim },
                    ]}
                  >
                    {step.text}
                  </Text>
                  {isActive && index < currentStep && (
                    <Ionicons name="checkmark-circle" size={16} color={colors.good} />
                  )}
                </View>
              </Animated.View>
            );
          })}
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  orbContainer: {
    marginBottom: 36,
  },
  orb: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.hotpink,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 40,
  },
  progressContainer: {
    width: '80%',
    marginBottom: 32,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.surface2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillWrapper: {
    height: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },
  stepsList: {
    width: '100%',
    gap: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  stepRowActive: {
    backgroundColor: 'rgba(236,72,153,0.04)',
  },
  stepIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIconActive: {
    backgroundColor: 'rgba(236,72,153,0.1)',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
  },
});
