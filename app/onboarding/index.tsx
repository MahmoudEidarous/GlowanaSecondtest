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
  FadeInUp,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from '@/components/ui';
import { colors, gradients, shadows } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const floatY = useSharedValue(0);
  const glowScale = useSharedValue(1);
  const orbFloat1 = useSharedValue(0);
  const orbFloat2 = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-12, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ),
      -1, true
    );
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1, true
    );
    orbFloat1.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 3000 }),
        withTiming(-15, { duration: 3000 })
      ),
      -1, true
    );
    orbFloat2.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3500 }),
        withTiming(20, { duration: 3500 })
      ),
      -1, true
    );
  }, [floatY, glowScale, orbFloat1, orbFloat2]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
  }));
  const orb1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: orbFloat1.value }, { translateX: orbFloat1.value * 0.5 }],
  }));
  const orb2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: orbFloat2.value }, { translateX: orbFloat2.value * -0.3 }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Ambient background orbs */}
      <Animated.View style={[styles.bgOrb1, glowStyle]} />
      <Animated.View style={[styles.bgOrb2, orb1Style]} />
      <Animated.View style={[styles.bgOrb3, orb2Style]} />

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} style={floatStyle}>
          <LinearGradient
            colors={[...gradients.wide.colors]}
            start={gradients.wide.start}
            end={gradients.wide.end}
            style={[styles.logo, shadows.glow]}
          >
            <Text variant="scoreLG" style={{ fontSize: 44 }}>G</Text>
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(500).duration(800)}>
          <Text variant="heroTitle" style={styles.title}>
            discover your{'\n'}glow score
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View entering={FadeInDown.delay(700).duration(800)}>
          <Text variant="sectionSub" style={styles.subtitle}>
            AI-powered skin analysis that shows{'\n'}exactly where you shine
          </Text>
        </Animated.View>

        {/* Score preview */}
        <Animated.View entering={FadeInDown.delay(900).duration(800)} style={{ width: '100%' }}>
          <LinearGradient
            colors={['rgba(168,85,247,0.06)', 'rgba(236,72,153,0.03)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.previewCard}
          >
            {/* Score ring */}
            <LinearGradient
              colors={[...gradients.scoreRing.colors]}
              start={gradients.scoreRing.start}
              end={gradients.scoreRing.end}
              style={styles.scoreRing}
            >
              <View style={styles.scoreRingInner}>
                <Text variant="scoreLG" style={{ fontSize: 26 }}>8.4</Text>
              </View>
            </LinearGradient>

            {/* Metrics */}
            <View style={styles.metrics}>
              {[
                { icon: 'sparkles' as const, label: 'Skin', val: '8.7', pct: 87 },
                { icon: 'eye' as const, label: 'Clarity', val: '8.2', pct: 82 },
                { icon: 'finger-print' as const, label: 'Texture', val: '8.0', pct: 80 },
                { icon: 'apps' as const, label: 'Symmetry', val: '8.5', pct: 85 },
              ].map((m) => (
                <View key={m.label} style={styles.metricRow}>
                  <Ionicons name={m.icon} size={13} color={colors.mediumPink} />
                  <Text variant="caption" style={styles.metricLabel}>{m.label}</Text>
                  <View style={styles.metricTrack}>
                    <LinearGradient
                      colors={[...gradients.soft.colors]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.metricFill, { width: `${m.pct}%` }]}
                    />
                  </View>
                  <Text variant="caption" style={styles.metricVal}>{m.val}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* Footer */}
      <Animated.View
        entering={FadeInUp.delay(1100).duration(800)}
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 8, 28) }]}
      >
        <Button
          title="Get Started"
          size="lg"
          onPress={() => router.push('/onboarding/goal')}
        />
        <Pressable style={styles.loginLink} onPress={() => router.replace('/(tabs)')}>
          <Text variant="caption" style={{ color: colors.textDim }}>
            Already have an account?{' '}
            <Text variant="caption" style={{ color: colors.purple }}>Log in</Text>
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
  bgOrb1: {
    position: 'absolute',
    top: '15%',
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(168,85,247,0.06)',
  },
  bgOrb2: {
    position: 'absolute',
    top: '40%',
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(236,72,153,0.05)',
  },
  bgOrb3: {
    position: 'absolute',
    bottom: '10%',
    left: '20%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(168,85,247,0.04)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  title: {
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 50,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 20,
    gap: 18,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.1)',
  },
  scoreRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreRingInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metrics: {
    flex: 1,
    gap: 10,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  metricLabel: {
    width: 52,
    fontSize: 11,
    color: colors.textMuted,
  },
  metricTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(168,85,247,0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: 2,
  },
  metricVal: {
    width: 24,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '700',
    color: colors.softPink,
  },
  footer: {
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  loginLink: {
    alignItems: 'center',
    paddingTop: 18,
  },
});
