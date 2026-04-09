import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radii } from '@/constants/theme';
import { Text } from './Text';

interface ProgressBarProps {
  label?: string;
  value: number; // 0-100 or 0-10
  maxValue?: number;
  showValue?: boolean;
  color?: 'gradient' | 'good' | 'caution' | 'alert';
  height?: number;
}

export function ProgressBar({
  label,
  value,
  maxValue = 10,
  showValue = true,
  color = 'gradient',
  height = 8,
}: ProgressBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const displayValue = maxValue === 10 ? value.toFixed(1) : `${Math.round(value)}%`;

  const solidColors: Record<string, string> = {
    good: colors.good,
    caution: colors.caution,
    alert: colors.alert,
  };

  return (
    <View style={styles.row}>
      {label && (
        <Text variant="caption" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={[styles.track, { height }]}>
        {color === 'gradient' ? (
          <LinearGradient
            colors={[...gradients.primary.colors]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.fill, { width: `${percentage}%`, height }]}
          />
        ) : (
          <View
            style={[
              styles.fill,
              { width: `${percentage}%`, height, backgroundColor: solidColors[color] },
            ]}
          />
        )}
      </View>
      {showValue && (
        <Text variant="caption" style={styles.value}>
          {displayValue}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    width: 60,
    flexShrink: 0,
  },
  track: {
    flex: 1,
    backgroundColor: 'rgba(236,72,153,0.06)',
    borderRadius: radii.sm,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radii.sm,
  },
  value: {
    width: 32,
    textAlign: 'right',
    fontWeight: '700',
  },
});
