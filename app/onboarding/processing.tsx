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
  { icon: 'scan' as const, text: 'Analyzing your skin profile' },
  { icon: 'color-palette' as const, text: 'Mapping your concerns' },
  { icon: 'sparkles' as const, text: 'Building your glow plan' },
  { icon: 'checkmark-circle' as const, text: 'Your profile is ready!' },
];

export default function ProcessingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const spinValue = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);
  const ring1 = useSharedValue(0);
  const ring2 = useSharedValue(0);

  useEffect(() => {
    spinValue.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), -1, false);
    pulseScale.value = withRepeat(
      withSequence(withTiming(1.1, { duration: 1200 }), withTiming(1, { duration: 1200 })),
      -1, true
    );
    ring1.value = withRepeat(withTiming(360, { duration: 6000, easing: Easing.linear }), -1, false);
    ring2.value = withRepeat(withTiming(-360, { duration: 8000, easing: Easing.linear }), -1, false);
  }, [spinValue, pulseScale, ring1, ring2]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    steps.forEach((_, i) => {
      if (i > 0) timers.push(setTimeout(() => setCurrentStep(i), i * 1000));
    });
    timers.push(setTimeout(() => router.replace('/onboarding/paywall'), steps.length * 1000 + 500));
    progressWidth.value = withTiming(100, { duration: steps.length * 1000, easing: Easing.out(Easing.quad) });
    return () => timers.forEach(clearTimeout);
  }, [router, progressWidth]);

  const spinStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spinValue.value}deg` }] }));
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseScale.value }] }));
  const progressStyle = useAnimatedStyle(() => ({ width: `${progressWidth.value}%` }));
  const ring1Style = useAnimatedStyle(() => ({ transform: [{ rotate: `${ring1.value}deg` }] }));
  const ring2Style = useAnimatedStyle(() => ({ transform: [{ rotate: `${ring2.value}deg` }] }));

  const isComplete = currentStep === steps.length - 1;

  return (
    <OnboardingScreen step={11} showProgress={false}>
      <View style={styles.content}>
        {/* Animated orb with rings */}
        <Animated.View entering={FadeIn.duration(600)}>
          <Animated.View style={[styles.orbContainer, pulseStyle]}>
            {/* Outer ring */}
            <Animated.View style={[styles.ring, styles.ringOuter, ring1Style]}>
              <View style={[styles.ringOrbit, { top: -3 }]} />
            </Animated.View>
            {/* Inner ring */}
            <Animated.View style={[styles.ring, styles.ringInner, ring2Style]}>
              <View style={[styles.ringOrbit, { bottom: -3, backgroundColor: colors.purple }]} />
            </Animated.View>
            {/* Core */}
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
                  <Ionicons name="sync" size={44} color={colors.white} />
                </Animated.View>
              )}
            </LinearGradient>
          </Animated.View>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text variant="heroTitle" style={styles.title}>
            {isComplete ? 'all set!' : 'creating your\nglow profile'}
          </Text>
        </Animated.View>

        {/* Progress bar */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFillWrap, progressStyle]}>
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressFill}
              />
            </Animated.View>
          </View>
        </View>

        {/* Steps */}
        <View style={styles.steps}>
          {steps.map((step, i) => {
            const active = i <= currentStep;
            const done = i < currentStep;
            return (
              <Animated.View key={step.text} entering={FadeInDown.delay(500 + i * 120).duration(400)}>
                <View style={[styles.stepRow, i === currentStep && styles.stepRowCurrent]}>
                  <View style={[styles.stepDot, active && styles.stepDotActive]}>
                    {done ? (
                      <Ionicons name="checkmark" size={12} color={colors.white} />
                    ) : (
                      <Ionicons name={step.icon} size={12} color={active ? colors.hotpink : colors.textDim} />
                    )}
                  </View>
                  <Text variant="bodySmall" style={{ flex: 1, color: active ? colors.text : colors.textDim, fontSize: 13 }}>
                    {step.text}
                  </Text>
                  {done && <Ionicons name="checkmark-circle" size={16} color={colors.good} />}
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
    paddingBottom: 60,
  },
  orbContainer: {
    marginBottom: 40,
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  ringOuter: {
    width: 160,
    height: 160,
    borderColor: 'rgba(236,72,153,0.15)',
  },
  ringInner: {
    width: 140,
    height: 140,
    borderColor: 'rgba(168,85,247,0.12)',
  },
  ringOrbit: {
    position: 'absolute',
    left: '50%',
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.hotpink,
  },
  orb: {
    width: 110,
    height: 110,
    borderRadius: 55,
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
    lineHeight: 48,
  },
  progressWrap: {
    width: '75%',
    marginBottom: 36,
  },
  progressTrack: {
    height: 5,
    backgroundColor: colors.surface2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillWrap: {
    height: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
  },
  steps: {
    width: '100%',
    gap: 6,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  stepRowCurrent: {
    backgroundColor: 'rgba(236,72,153,0.04)',
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: 'rgba(236,72,153,0.1)',
  },
});
