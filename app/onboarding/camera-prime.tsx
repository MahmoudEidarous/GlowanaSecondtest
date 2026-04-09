import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { colors, gradients, shadows } from '@/constants/theme';

const benefits = [
  { icon: 'scan' as const, title: 'AI skin analysis', desc: '400+ facial points analyzed' },
  { icon: 'sparkles' as const, title: 'Instant glow score', desc: 'Results in under 10 seconds' },
  { icon: 'shield-checkmark' as const, title: 'Private & secure', desc: 'Photos never leave your device' },
];

export default function CameraPrimeScreen() {
  const router = useRouter();
  const pulseScale = useSharedValue(1);
  const ringRotate = useSharedValue(0);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(withTiming(1.06, { duration: 1800 }), withTiming(1, { duration: 1800 })),
      -1, true
    );
    ringRotate.value = withRepeat(
      withTiming(360, { duration: 8000 }),
      -1, false
    );
  }, [pulseScale, ringRotate]);

  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulseScale.value }] }));
  const ringStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${ringRotate.value}deg` }] }));

  return (
    <OnboardingScreen
      step={9}
      footer={
        <View style={{ gap: 10 }}>
          <Button title="Enable Camera" size="lg" onPress={() => router.push('/onboarding/notif-prime')} />
          <Button title="Not now" variant="ghost" size="sm" onPress={() => router.push('/onboarding/notif-prime')} />
        </View>
      }
    >
      <View style={styles.content}>
        {/* Illustration */}
        <Animated.View entering={FadeIn.duration(800)}>
          <Animated.View style={[styles.orbWrap, pulseStyle]}>
            {/* Rotating ring */}
            <Animated.View style={[styles.rotatingRing, ringStyle]}>
              <View style={[styles.ringDot, { top: -4, left: '50%', marginLeft: -4 }]} />
              <View style={[styles.ringDot, { bottom: -4, left: '50%', marginLeft: -4 }]} />
              <View style={[styles.ringDot, { left: -4, top: '50%', marginTop: -4 }]} />
              <View style={[styles.ringDot, { right: -4, top: '50%', marginTop: -4 }]} />
            </Animated.View>
            <LinearGradient
              colors={[...gradients.wide.colors]}
              start={gradients.wide.start}
              end={gradients.wide.end}
              style={[styles.orb, shadows.glow]}
            >
              <Ionicons name="camera" size={48} color={colors.white} />
            </LinearGradient>
          </Animated.View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text variant="heroTitle" style={styles.title}>
            see your skin{'\n'}like never before
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(450).duration(600)}>
          <Text variant="sectionSub" style={styles.sub}>
            our AI needs your camera to analyze your skin and create your glow score
          </Text>
        </Animated.View>

        {/* Benefits */}
        <View style={styles.benefits}>
          {benefits.map((b, i) => (
            <Animated.View key={b.icon} entering={FadeInDown.delay(600 + i * 100).duration(500)}>
              <View style={styles.benefitRow}>
                <LinearGradient
                  colors={[...gradients.primary.colors]}
                  start={gradients.primary.start}
                  end={gradients.primary.end}
                  style={styles.benefitIcon}
                >
                  <Ionicons name={b.icon} size={18} color={colors.white} />
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text variant="cardTitle" style={{ fontSize: 14 }}>{b.title}</Text>
                  <Text variant="caption" style={{ color: colors.textDim, fontSize: 11 }}>{b.desc}</Text>
                </View>
              </View>
            </Animated.View>
          ))}
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
  },
  orbWrap: {
    marginBottom: 36,
    position: 'relative',
  },
  rotatingRing: {
    position: 'absolute',
    top: -12,
    left: -12,
    right: -12,
    bottom: -12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.15)',
    borderStyle: 'dashed',
  },
  ringDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.hotpink,
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 48,
  },
  sub: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 36,
    lineHeight: 22,
  },
  benefits: {
    gap: 16,
    width: '100%',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  benefitIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
