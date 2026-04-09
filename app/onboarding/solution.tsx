import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { colors, gradients, radii } from '@/constants/theme';

const solutions = [
  {
    pain: 'Spending money on products that don\u2019t work',
    solution: 'AI-powered scan tells you exactly what your skin needs',
    stat: 'Save an avg of $340/year on wrong products',
    icon: 'scan' as const,
  },
  {
    pain: 'Not knowing if your routine is working',
    solution: 'Track your glow score daily and see real progress',
    stat: '87% of users see improvement in 30 days',
    icon: 'trending-up' as const,
  },
  {
    pain: 'No idea where you actually stand',
    solution: 'Get your personalized glow score out of 10',
    stat: 'Scored across skin, clarity, texture & symmetry',
    icon: 'sparkles' as const,
  },
  {
    pain: 'Generic advice that doesn\u2019t help',
    solution: 'Tips tailored to YOUR specific skin concerns',
    stat: 'Personalized from 200+ skincare recommendations',
    icon: 'bulb' as const,
  },
];

export default function SolutionScreen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      step={7}
      footer={
        <Button
          title="Sounds perfect"
          size="lg"
          onPress={() => router.push('/onboarding/routine')}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            your glow-up{'\n'}plan is ready
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            here&apos;s how glowana solves what you told us
          </Text>
        </Animated.View>
      </View>

      <View style={styles.solutions}>
        {solutions.map((item, index) => (
          <Animated.View
            key={item.icon}
            entering={FadeInDown.delay(400 + index * 120).duration(600)}
          >
            <View style={styles.solutionCard}>
              {/* Pain point */}
              <View style={styles.painRow}>
                <Ionicons name="close-circle" size={14} color={colors.textDim} />
                <Text variant="caption" style={styles.painText}>
                  {item.pain}
                </Text>
              </View>

              {/* Arrow */}
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-down" size={14} color={colors.purple} />
              </View>

              {/* Solution */}
              <View style={styles.solutionRow}>
                <LinearGradient
                  colors={[...gradients.primary.colors]}
                  start={gradients.primary.start}
                  end={gradients.primary.end}
                  style={styles.solutionIcon}
                >
                  <Ionicons name={item.icon} size={20} color={colors.white} />
                </LinearGradient>
                <View style={styles.solutionText}>
                  <Text variant="cardTitle" style={{ fontSize: 14, marginBottom: 2 }}>
                    {item.solution}
                  </Text>
                  <Text variant="caption" style={{ color: colors.hotpink, fontSize: 10 }}>
                    {item.stat}
                  </Text>
                </View>
              </View>
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
  solutions: {
    gap: 12,
  },
  solutionCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  painRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  painText: {
    flex: 1,
    color: colors.textDim,
    fontSize: 11,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.textDim,
  },
  arrowContainer: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  solutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  solutionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  solutionText: {
    flex: 1,
  },
});
