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
import { colors, gradients, radii } from '@/constants/theme';

const notifBenefits = [
  {
    icon: 'flame' as const,
    title: 'Streak reminders',
    desc: 'Stay consistent and never break your glow streak',
    time: '9:00 AM',
  },
  {
    icon: 'bulb' as const,
    title: 'Personalized tips',
    desc: 'Get daily tips tailored to your skin concerns',
    time: '12:00 PM',
  },
  {
    icon: 'trending-up' as const,
    title: 'Progress updates',
    desc: 'See how your glow score changes week over week',
    time: 'Weekly',
  },
];

export default function NotifPrimeScreen() {
  const router = useRouter();
  const bellShake = useSharedValue(0);

  useEffect(() => {
    bellShake.value = withRepeat(
      withSequence(
        withTiming(12, { duration: 100 }),
        withTiming(-12, { duration: 100 }),
        withTiming(8, { duration: 80 }),
        withTiming(-8, { duration: 80 }),
        withTiming(0, { duration: 100 }),
        withTiming(0, { duration: 2500 })
      ),
      -1,
      false
    );
  }, [bellShake]);

  const bellStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${bellShake.value}deg` }],
  }));

  const handleEnable = () => {
    // TODO: Request notification permission
    // Notifications.requestPermissionsAsync()
    router.push('/onboarding/processing');
  };

  return (
    <OnboardingScreen
      step={10}
      footer={
        <View style={styles.footerContent}>
          <Button title="Enable Notifications" size="lg" onPress={handleEnable} />
          <Button
            title="Not now"
            variant="ghost"
            size="sm"
            onPress={() => router.push('/onboarding/processing')}
          />
        </View>
      }
    >
      <View style={styles.content}>
        {/* Bell illustration */}
        <Animated.View entering={FadeIn.duration(800)}>
          <View style={styles.bellContainer}>
            <LinearGradient
              colors={[...gradients.primary.colors]}
              start={gradients.primary.start}
              end={gradients.primary.end}
              style={styles.bellBg}
            >
              <Animated.View style={bellStyle}>
                <Ionicons name="notifications" size={44} color={colors.white} />
              </Animated.View>
            </LinearGradient>
            {/* Notification dot */}
            <View style={styles.notifDot}>
              <Text variant="tagText" style={{ fontSize: 10 }}>3</Text>
            </View>
          </View>
        </Animated.View>

        {/* Text */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            never miss a{'\n'}glow check
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(500).duration(600)}>
          <Text variant="sectionSub" style={styles.subtitle}>
            gentle reminders to keep your skincare streak alive
          </Text>
        </Animated.View>

        {/* Mock notifications */}
        <View style={styles.notifList}>
          {notifBenefits.map((item, index) => (
            <Animated.View
              key={item.icon}
              entering={FadeInDown.delay(700 + index * 120).duration(500)}
            >
              <View style={styles.notifCard}>
                <View style={styles.notifIcon}>
                  <Ionicons name={item.icon} size={18} color={colors.hotpink} />
                </View>
                <View style={styles.notifText}>
                  <Text variant="cardTitle" style={{ fontSize: 13 }}>
                    {item.title}
                  </Text>
                  <Text variant="caption" style={{ color: colors.textDim, fontSize: 10 }}>
                    {item.desc}
                  </Text>
                </View>
                <View style={styles.timeBadge}>
                  <Text variant="caption" style={{ fontSize: 9, color: colors.textMuted }}>
                    {item.time}
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
  bellContainer: {
    marginBottom: 32,
    position: 'relative',
  },
  bellBg: {
    width: 110,
    height: 110,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.alert,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.bg,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 28,
    lineHeight: 22,
  },
  notifList: {
    gap: 10,
    width: '100%',
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(236,72,153,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifText: {
    flex: 1,
    gap: 2,
  },
  timeBadge: {
    backgroundColor: colors.surface2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
  },
  footerContent: {
    gap: 8,
  },
});
