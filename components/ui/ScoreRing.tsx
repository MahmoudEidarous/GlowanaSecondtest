import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, colors, shadows } from '@/constants/theme';
import { Text } from './Text';

interface ScoreRingProps {
  score: number; // 0-10
  size?: number;
  label?: string;
  sublabel?: string;
}

export function ScoreRing({
  score,
  size = 120,
  label,
  sublabel,
}: ScoreRingProps) {
  const borderWidth = size * 0.04;
  const innerSize = size - borderWidth * 2;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[...gradients.scoreRing.colors]}
        start={gradients.scoreRing.start}
        end={gradients.scoreRing.end}
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          shadows.glow,
        ]}
      >
        <View
          style={[
            styles.inner,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
            },
          ]}
        >
          <Text variant="scoreLG" style={{ fontSize: size * 0.3 }}>
            {score.toFixed(1)}
          </Text>
        </View>
      </LinearGradient>
      {label && (
        <Text variant="cardTitle" style={styles.label}>
          {label}
        </Text>
      )}
      {sublabel && (
        <Text variant="caption" style={styles.sublabel}>
          {sublabel}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 12,
    textAlign: 'center',
  },
  sublabel: {
    marginTop: 2,
    textAlign: 'center',
  },
});
