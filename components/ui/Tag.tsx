import { View, StyleSheet } from 'react-native';
import { colors, radii } from '@/constants/theme';
import { Text } from './Text';

type TagVariant = 'purple' | 'pink' | 'good' | 'caution' | 'alert' | 'info';

interface TagProps {
  label: string;
  variant?: TagVariant;
}

const variantStyles: Record<TagVariant, { bg: string; text: string }> = {
  purple: { bg: 'rgba(168,85,247,0.15)', text: colors.purple },
  pink: { bg: 'rgba(236,72,153,0.15)', text: colors.hotpink },
  good: { bg: 'rgba(74,222,128,0.15)', text: colors.good },
  caution: { bg: 'rgba(251,146,60,0.15)', text: colors.caution },
  alert: { bg: 'rgba(248,113,113,0.15)', text: colors.alert },
  info: { bg: 'rgba(103,232,249,0.15)', text: colors.info },
};

export function Tag({ label, variant = 'purple' }: TagProps) {
  const v = variantStyles[variant];

  return (
    <View style={[styles.tag, { backgroundColor: v.bg }]}>
      <Text variant="tagText" style={{ color: v.text }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
});
