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
    pain: 'Wasting money on wrong products',
    solution: 'AI tells you exactly what your skin needs',
    stat: 'Save ~$340/year',
    icon: 'scan' as const,
  },
  {
    pain: 'Not knowing if routine works',
    solution: 'Track your glow score daily',
    stat: '87% see improvement in 30 days',
    icon: 'trending-up' as const,
  },
  {
    pain: 'No idea where you stand',
    solution: 'Personalized score out of 10',
    stat: 'Skin, clarity, texture & symmetry',
    icon: 'sparkles' as const,
  },
  {
    pain: 'Generic advice everywhere',
    solution: 'Tips tailored to YOUR skin',
    stat: '200+ personalized recommendations',
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
          <Text variant="heroTitle" style={styles.title}>
            your glow plan{'\n'}is ready
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <Text variant="sectionSub">
            here&apos;s how glowana fixes what you told us
          </Text>
        </Animated.View>
      </View>

      <View style={styles.cards}>
        {solutions.map((item, i) => (
          <Animated.View key={item.icon} entering={FadeInDown.delay(300 + i * 100).duration(600)}>
            <View style={styles.card}>
              {/* Left accent */}
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.accent}
              />
              <View style={styles.cardBody}>
                {/* Pain crossed out */}
                <Text variant="caption" style={styles.painText}>
                  {item.pain}
                </Text>
                {/* Solution */}
                <View style={styles.solutionRow}>
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={gradients.primary.start}
                    end={gradients.primary.end}
                    style={styles.solutionIcon}
                  >
                    <Ionicons name={item.icon} size={18} color={colors.white} />
                  </LinearGradient>
                  <View style={{ flex: 1 }}>
                    <Text variant="cardTitle" style={{ fontSize: 14, marginBottom: 3 }}>
                      {item.solution}
                    </Text>
                    <Text variant="caption" style={{ color: colors.hotpink, fontSize: 11 }}>
                      {item.stat}
                    </Text>
                  </View>
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
    paddingTop: 36,
    marginBottom: 28,
  },
  title: {
    marginBottom: 10,
    lineHeight: 48,
  },
  cards: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  accent: {
    width: 4,
  },
  cardBody: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  painText: {
    color: colors.textDim,
    fontSize: 11,
    textDecorationLine: 'line-through',
    textDecorationColor: colors.textDim,
  },
  solutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  solutionIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
