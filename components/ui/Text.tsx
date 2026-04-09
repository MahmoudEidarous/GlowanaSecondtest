import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography } from '@/constants/theme';

type TextVariant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

export function Text({ variant = 'body', style, ...props }: TextProps) {
  return <RNText style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create(
  Object.fromEntries(
    Object.entries(typography).map(([key, value]) => [key, value])
  ) as Record<TextVariant, any>
);
