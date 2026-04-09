import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Text, Button, ScoreRing, Card, Divider } from '@/components/ui';
import { gradients, spacing, shadows } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <Screen>
      {/* Hero */}
      <View style={styles.hero}>
        <LinearGradient
          colors={[...gradients.primary.colors]}
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={[styles.logo, shadows.glow]}
        >
          <Text variant="scoreLG">G</Text>
        </LinearGradient>
        <Text variant="heroTitle">glowana</Text>
        <Text variant="sectionSub" style={styles.centered}>
          your ai-powered glow-up companion. scan, score, and level up.
        </Text>
      </View>

      {/* CTA */}
      <Button title="Start Your Glow Scan" size="lg" style={{ marginVertical: spacing.xl }} />

      <Divider />

      {/* Sample Score */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={{ marginBottom: 4 }}>your glow score</Text>
        <Text variant="sectionSub" style={{ marginBottom: spacing.lg }}>
          take a selfie to get your personalized analysis
        </Text>
        <Card style={styles.centered}>
          <ScoreRing score={8.4} size={140} label="Glow Score" sublabel="skin · clarity · texture · symmetry" />
        </Card>
      </View>

      <View style={{ height: spacing['4xl'] }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  centered: {
    alignItems: 'center',
    textAlign: 'center',
  },
  section: {
    paddingVertical: spacing.xl,
  },
});
