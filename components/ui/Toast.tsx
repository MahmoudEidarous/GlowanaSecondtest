import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '@/constants/theme';
import { Text } from './Text';

type ToastVariant = 'good' | 'caution' | 'alert' | 'info';

interface ToastProps {
  message: string;
  variant?: ToastVariant;
}

const config: Record<ToastVariant, { bg: string; border: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  good: {
    bg: 'rgba(74,222,128,0.08)',
    border: 'rgba(74,222,128,0.2)',
    color: colors.good,
    icon: 'checkmark-circle',
  },
  caution: {
    bg: 'rgba(251,146,60,0.08)',
    border: 'rgba(251,146,60,0.2)',
    color: colors.caution,
    icon: 'alert-circle',
  },
  alert: {
    bg: 'rgba(248,113,113,0.08)',
    border: 'rgba(248,113,113,0.2)',
    color: colors.alert,
    icon: 'close-circle',
  },
  info: {
    bg: 'rgba(103,232,249,0.08)',
    border: 'rgba(103,232,249,0.2)',
    color: colors.info,
    icon: 'information-circle',
  },
};

export function Toast({ message, variant = 'info' }: ToastProps) {
  const c = config[variant];

  return (
    <View style={[styles.toast, { backgroundColor: c.bg, borderColor: c.border }]}>
      <Ionicons name={c.icon} size={20} color={c.color} />
      <Text variant="bodySmall" style={{ color: c.color, flex: 1 }}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: radii.md,
    borderWidth: 1,
  },
});
