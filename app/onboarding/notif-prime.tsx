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

const notifItems = [
  { icon: 'flame' as const, title: 'Streak reminders', time: '9:00 AM', color: colors.hotpink },
  { icon: 'bulb' as const, title: 'Daily glow tips', time: '12:00 PM', color: colors.purple },
  { icon: 'trending-up' as const, title: 'Weekly progress', time: 'Mondays', color: colors.good },
];

export default function NotifPrimeScreen() {
  const router = useRouter();
  const bellShake = useSharedValue(0);

  useEffect(() => {
    bellShake.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 80 }),
        withTiming(-10, { duration: 80 }),
        withTiming(6, { duration: 60 }),
        withTiming(-6, { duration: 60 }),
        withTiming(0, { duration: 80 }),
        withTiming(0, { duration: 3000 })
      ),
      -1, false
    );
  }, [bellShake]);

  const bellStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bellShake.value}deg` }],
  }));

  return (
    <OnboardingScreen
      step={10}
      footer={
        <View style={{ gap: 10 }}>
          <Button title="Enable Notifications" size="lg" onPress={() => router.push('/onboarding/processing')} />
          <Button title="Not now" variant="ghost" size="sm" onPress={() => router.push('/onboarding/processing')} />
        </View>
      }
    >
      <View style={styles.content}>
        {/* Bell */}
        <Animated.View entering={FadeIn.duration(800)}>
          <View style={styles.bellWrap}>
            <LinearGradient
              colors={[...gradients.primary.colors]}
              start={gradients.primary.start}
              end={gradients.primary.end}
              style={[styles.bellBg, shadows.glowPurple]}
            >
              <Animated.View style={bellStyle}>
                <Ionicons name="notifications" size={48} color={colors.white} />
              </Animated.View>
            </LinearGradient>
            <View style={styles.badge}>
              <Text variant="tagText" style={{ fontSize: 10 }}>3</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text variant="heroTitle" style={styles.title}>
            never miss a{'\n'}glow check
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(450).duration(600)}>
          <Text variant="sectionSub" style={styles.sub}>
            gentle reminders to keep your streak alive
          </Text>
        </Animated.View>

        {/* Mock notifications */}
        <View style={styles.notifs}>
          {notifItems.map((item, i) => (
            <Animated.View key={item.icon} entering={FadeInDown.delay(600 + i * 100).duration(500)}>
              <View style={styles.notifCard}>
                <View style={[styles.notifDot, { backgroundColor: item.color }]} />
                <View style={[styles.notifIcon, { backgroundColor: `${item.color}12` }]}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <Text variant="cardTitle" style={{ flex: 1, fontSize: 13 }}>{item.title}</Text>
                <View style={styles.timePill}>
                  <Text variant="caption" style={{ fontSize: 10, color: colors.textMuted }}>{item.time}</Text>
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
  bellWrap: {
    marginBottom: 36,
    position: 'relative',
  },
  bellBg: {
    width: 120,
    height: 120,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.alert,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.bg,
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
  notifs: {
    gap: 10,
    width: '100%',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  notifDot: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    borderRadius: 2,
  },
  notifIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePill: {
    backgroundColor: colors.surface2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
});
