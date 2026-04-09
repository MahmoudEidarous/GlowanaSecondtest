import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { colors, gradients, radii } from '@/constants/theme';

const testimonials = [
  {
    name: 'Sarah M.',
    tag: 'Skincare newbie',
    text: 'I had no idea what my skin actually needed. After my first scan, I changed my whole routine and my score went up 1.2 points in 3 weeks.',
    score: '7.2 → 8.4',
    avatar: 'S',
  },
  {
    name: 'Jess K.',
    tag: 'Beauty enthusiast',
    text: 'I was spending so much on products that didn\u2019t work for me. Glowana showed me exactly what to focus on. My friends all downloaded it after seeing my score.',
    score: '6.8 → 8.1',
    avatar: 'J',
  },
  {
    name: 'Mia L.',
    tag: 'Self-care girlie',
    text: 'The daily streak keeps me consistent with my routine for the first time ever. Watching my glow score climb is so satisfying.',
    score: '7.5 → 9.0',
    avatar: 'M',
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
          <Text variant="sectionTitle" style={styles.title}>
            join 50,000+{'\n'}women glowing up
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            real stories from women who leveled up their skin
          </Text>
        </Animated.View>
      </View>

      {/* Stats row */}
      <Animated.View entering={FadeIn.delay(400).duration(700)} style={styles.statsRow}>
        <View style={styles.stat}>
          <Text variant="scoreLG" style={styles.statNumber}>50K+</Text>
          <Text variant="caption">Active users</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text variant="scoreLG" style={styles.statNumber}>4.9</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons key={i} name="star" size={12} color={colors.hotpink} />
            ))}
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text variant="scoreLG" style={styles.statNumber}>87%</Text>
          <Text variant="caption">See results</Text>
        </View>
      </Animated.View>

      {/* Testimonials */}
      <View style={styles.testimonials}>
        {testimonials.map((t, index) => (
          <Animated.View
            key={t.name}
            entering={FadeInDown.delay(600 + index * 150).duration(600)}
          >
            <View style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <LinearGradient
                  colors={[...gradients.primary.colors]}
                  start={gradients.primary.start}
                  end={gradients.primary.end}
                  style={styles.avatar}
                >
                  <Text variant="buttonLabel" style={{ fontSize: 14 }}>{t.avatar}</Text>
                </LinearGradient>
                <View style={styles.nameBlock}>
                  <Text variant="cardTitle" style={{ fontSize: 14 }}>{t.name}</Text>
                  <Text variant="caption" style={{ color: colors.textDim, fontSize: 10 }}>{t.tag}</Text>
                </View>
                <View style={styles.scoreBadge}>
                  <Ionicons name="trending-up" size={12} color={colors.good} />
                  <Text variant="tagText" style={{ color: colors.good, fontSize: 10 }}>
                    {t.score}
                  </Text>
                </View>
              </View>
              <Text variant="bodySmall" style={styles.testimonialText}>
                {t.text}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    lineHeight: 40,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stat: {
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    color: colors.white,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.border,
  },
  testimonials: {
    gap: 12,
  },
  testimonialCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameBlock: {
    flex: 1,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(74,222,128,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  testimonialText: {
    lineHeight: 20,
    color: colors.textMuted,
    fontSize: 13,
  },
});
