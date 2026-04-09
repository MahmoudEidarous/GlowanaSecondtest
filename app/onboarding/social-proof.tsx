import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { colors, radii } from '@/constants/theme';

const testimonials = [
  {
    name: 'Sarah M.',
    tag: 'Skincare newbie',
    text: 'After my first scan, I changed my whole routine. Score went up 1.2 in 3 weeks.',
    score: '+1.2',
    avatar: 'S',
    gradColors: ['#A855F7', '#EC4899'] as const,
  },
  {
    name: 'Jess K.',
    tag: 'Beauty enthusiast',
    text: 'Glowana showed me what to actually focus on. My friends all downloaded it.',
    score: '+1.3',
    avatar: 'J',
    gradColors: ['#D946EF', '#EC4899'] as const,
  },
  {
    name: 'Mia L.',
    tag: 'Self-care girlie',
    text: 'The daily streak keeps me consistent for the first time ever.',
    score: '+1.5',
    avatar: 'M',
    gradColors: ['#EC4899', '#F472B6'] as const,
  },
];

export default function SocialProofScreen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      step={5}
      footer={
        <Button
          title="Continue"
          size="lg"
          onPress={() => router.push('/onboarding/pain-cards')}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="heroTitle" style={styles.title}>
            join 50,000+{'\n'}women glowing up
          </Text>
        </Animated.View>
      </View>

      {/* Stats */}
      <Animated.View entering={FadeIn.delay(300).duration(700)}>
        <LinearGradient
          colors={['rgba(168,85,247,0.06)', 'rgba(236,72,153,0.03)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.statsCard}
        >
          <View style={styles.stat}>
            <Text variant="scoreLG" style={{ fontSize: 26 }}>50K+</Text>
            <Text variant="caption" style={{ color: colors.textDim }}>Users</Text>
          </View>
          <View style={styles.statLine} />
          <View style={styles.stat}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text variant="scoreLG" style={{ fontSize: 26 }}>4.9</Text>
              <Ionicons name="star" size={16} color={colors.hotpink} />
            </View>
            <Text variant="caption" style={{ color: colors.textDim }}>Rating</Text>
          </View>
          <View style={styles.statLine} />
          <View style={styles.stat}>
            <Text variant="scoreLG" style={{ fontSize: 26 }}>87%</Text>
            <Text variant="caption" style={{ color: colors.textDim }}>See results</Text>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Testimonials */}
      <View style={styles.testimonials}>
        {testimonials.map((t, i) => (
          <Animated.View key={t.name} entering={FadeInDown.delay(500 + i * 120).duration(600)}>
            <View style={styles.tCard}>
              <View style={styles.tHeader}>
                <LinearGradient
                  colors={[...t.gradColors]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatar}
                >
                  <Text variant="buttonLabel" style={{ fontSize: 13 }}>{t.avatar}</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text variant="cardTitle" style={{ fontSize: 13 }}>{t.name}</Text>
                  <Text variant="caption" style={{ color: colors.textDim, fontSize: 10 }}>{t.tag}</Text>
                </View>
                <View style={styles.scorePill}>
                  <Ionicons name="arrow-up" size={11} color={colors.good} />
                  <Text variant="tagText" style={{ color: colors.good, fontSize: 12 }}>{t.score}</Text>
                </View>
              </View>
              <Text variant="bodySmall" style={styles.tText}>{t.text}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 36,
    marginBottom: 28,
  },
  title: {
    marginBottom: 6,
    lineHeight: 48,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: radii.xl,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.08)',
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statLine: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(168,85,247,0.1)',
  },
  testimonials: {
    gap: 12,
  },
  tCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(74,222,128,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(74,222,128,0.12)',
  },
  tText: {
    lineHeight: 20,
    color: colors.textMuted,
    fontSize: 13,
  },
});
