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
import { colors, gradients, radii, shadows } from '@/constants/theme';

const benefits = [
  {
    icon: 'scan' as const,
    title: 'AI skin analysis',
    desc: 'Scans 400+ facial points to evaluate your skin',
  },
  {
    icon: 'sparkles' as const,
    title: 'Instant glow score',
    desc: 'Get your personalized score in under 10 seconds',
  },
  {
    icon: 'shield-checkmark' as const,
    title: 'Photos stay on your device',
    desc: 'Your selfies are never uploaded or stored on our servers',
  },
];

export default function CameraPrimeScreen() {
  const router = useRouter();
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, [pulseScale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleEnable = () => {
    // TODO: Request camera permission here
    // Camera.requestCameraPermissionsAsync()
    router.push('/onboarding/notif-prime');
  };

  return (
    <OnboardingScreen
      step={9}
      footer={
        <View style={styles.footerContent}>
          <Button title="Enable Camera" size="lg" onPress={handleEnable} />
          <Button
            title="Not now"
            variant="ghost"
            size="sm"
            onPress={() => router.push('/onboarding/notif-prime')}
          />
        </View>
      }
    >
      <View style={styles.content}>
        {/* Camera illustration */}
        <Animated.View entering={FadeIn.duration(800)}>
          <Animated.View style={[styles.illustrationContainer, pulseStyle]}>
            <LinearGradient
              colors={[...gradients.wide.colors]}
              start={gradients.wide.start}
              end={gradients.wide.end}
              style={[styles.illustration, shadows.glow]}
            >
              <View style={styles.cameraRing}>
                <Ionicons name="camera" size={44} color={colors.white} />
              </View>
            </LinearGradient>
          </Animated.View>
        </Animated.View>

        {/* Text */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            see your skin{'\n'}like never before
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(500).duration(600)}>
          <Text variant="sectionSub" style={styles.subtitle}>
            our AI needs your camera to analyze your skin and generate your personalized glow score
          </Text>
        </Animated.View>

        {/* Benefits */}
        <View style={styles.benefits}>
          {benefits.map((benefit, index) => (
            <Animated.View
              key={benefit.icon}
              entering={FadeInDown.delay(700 + index * 100).duration(500)}
            >
              <View style={styles.benefitRow}>
                <LinearGradient
                  colors={[...gradients.primary.colors]}
                  start={gradients.primary.start}
                  end={gradients.primary.end}
                  style={styles.benefitIcon}
                >
                  <Ionicons name={benefit.icon} size={18} color={colors.white} />
                </LinearGradient>
                <View style={styles.benefitText}>
                  <Text variant="cardTitle" style={{ fontSize: 14 }}>
                    {benefit.title}
                  </Text>
                  <Text variant="caption" style={{ color: colors.textDim, fontSize: 11 }}>
                    {benefit.desc}
                  </Text>
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
  illustrationContainer: {
    marginBottom: 32,
  },
  illustration: {
    width: 130,
    height: 130,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 32,
    lineHeight: 22,
  },
  benefits: {
    gap: 14,
    width: '100%',
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    flex: 1,
    gap: 2,
  },
  footerContent: {
    gap: 8,
  },
});
