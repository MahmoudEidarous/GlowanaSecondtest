import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from '@/components/ui';
import { colors, gradients, shadows } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Float animation for the logo
  const floatY = useSharedValue(0);
  // Pulse glow
  const glowScale = useSharedValue(1);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      true
    );
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, [floatY, glowScale]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: 0.6,
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Background radial glow */}
      <View style={styles.bgGlow}>
        <Animated.View style={[styles.bgGlowCircle, glowStyle]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          entering={FadeIn.duration(800)}
          style={[styles.logoContainer, floatStyle]}
        >
          <LinearGradient
            colors={[...gradients.wide.colors]}
            start={gradients.wide.start}
            end={gradients.wide.end}
            style={[styles.logo, shadows.glow]}
          >
            <Text variant="scoreLG" style={{ fontSize: 40 }}>G</Text>
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(300).duration(700)}>
          <Text variant="heroTitle" style={styles.title}>
            discover your{'\n'}glow score
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View entering={FadeInDown.delay(500).duration(700)}>
          <Text variant="sectionSub" style={styles.subtitle}>
            AI-powered skin analysis that shows you exactly where you shine — and how to level up.
          </Text>
        </Animated.View>

        {/* Score preview card */}
        <Animated.View entering={FadeInDown.delay(700).duration(700)}>
          <View style={styles.previewCard}>
            <LinearGradient
              colors={[...gradients.scoreRing.colors]}
              start={gradients.scoreRing.start}
              end={gradients.scoreRing.end}
              style={styles.miniRing}
            >
              <View style={styles.miniRingInner}>
                <Text variant="scoreLG" style={{ fontSize: 22 }}>8.4</Text>
              </View>
            </LinearGradient>
            <View style={styles.previewMetrics}>
              <View style={styles.metricRow}>
                <Ionicons name="sparkles" size={14} color={colors.purple} />
                <Text variant="bodySmall" style={styles.metricLabel}>Skin</Text>
                <View style={styles.metricBar}>
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.metricFill, { width: '87%' }]}
                  />
                </View>
                <Text variant="caption" style={styles.metricVal}>8.7</Text>
              </View>
              <View style={styles.metricRow}>
                <Ionicons name="eye" size={14} color={colors.purple} />
                <Text variant="bodySmall" style={styles.metricLabel}>Clarity</Text>
                <View style={styles.metricBar}>
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.metricFill, { width: '82%' }]}
                  />
                </View>
                <Text variant="caption" style={styles.metricVal}>8.2</Text>
              </View>
              <View style={styles.metricRow}>
                <Ionicons name="finger-print" size={14} color={colors.purple} />
                <Text variant="bodySmall" style={styles.metricLabel}>Texture</Text>
                <View style={styles.metricBar}>
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.metricFill, { width: '80%' }]}
                  />
                </View>
                <Text variant="caption" style={styles.metricVal}>8.0</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInDown.delay(900).duration(700)}
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}
      >
        <Button
          title="Get Started"
          size="lg"
          onPress={() => router.push('/onboarding/goal')}
        />
        <Pressable
          style={styles.loginLink}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text variant="bodySmall" style={{ color: colors.textDim }}>
            Already have an account? <Text variant="bodySmall" style={{ color: colors.purple }}>Log in</Text>
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  bgGlow: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{ translateX: -200 }],
    pointerEvents: 'none',
  },
  bgGlowCircle: {
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'transparent',
    shadowColor: colors.hotpink,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 120,
    elevation: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 50,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 320,
    marginBottom: 36,
    lineHeight: 24,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
    width: '100%',
    maxWidth: 340,
  },
  miniRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniRingInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewMetrics: {
    flex: 1,
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricLabel: {
    width: 44,
    fontSize: 11,
    color: colors.textMuted,
  },
  metricBar: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(168,85,247,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricVal: {
    width: 24,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '700',
    color: colors.text,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 12,
  },
  loginLink: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
  },
});
