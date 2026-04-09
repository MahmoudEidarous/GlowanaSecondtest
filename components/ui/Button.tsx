import {
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, radii, shadows } from '@/constants/theme';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
}

const sizeStyles = {
  sm: { paddingVertical: 8, paddingHorizontal: 18, fontSize: 12 },
  md: { paddingVertical: 13, paddingHorizontal: 26, fontSize: 14 },
  lg: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 16 },
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}: ButtonProps) {
  const sizeStyle = sizeStyles[size];

  if (variant === 'primary') {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.base,
          { opacity: pressed ? 0.85 : 1, transform: [{ translateY: pressed ? 1 : 0 }] },
          shadows.glow,
          style,
        ]}
        {...props}
      >
        <LinearGradient
          colors={[...gradients.button.colors]}
          start={gradients.button.start}
          end={gradients.button.end}
          style={[
            styles.gradient,
            { paddingVertical: sizeStyle.paddingVertical, paddingHorizontal: sizeStyle.paddingHorizontal },
          ]}
        >
          <Text
            variant="buttonLabel"
            style={{ fontSize: sizeStyle.fontSize }}
          >
            {title}
          </Text>
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === 'secondary') {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.base,
          styles.secondary,
          { paddingVertical: sizeStyle.paddingVertical, paddingHorizontal: sizeStyle.paddingHorizontal },
          { opacity: pressed ? 0.7 : 1 },
          style,
        ]}
        {...props}
      >
        <Text
          variant="buttonLabel"
          style={{ fontSize: sizeStyle.fontSize, color: colors.purple }}
        >
          {title}
        </Text>
      </Pressable>
    );
  }

  // ghost
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        { paddingVertical: sizeStyle.paddingVertical, paddingHorizontal: sizeStyle.paddingHorizontal },
        { opacity: pressed ? 0.5 : 1 },
        style,
      ]}
      {...props}
    >
      <Text
        variant="buttonLabel"
        style={{ fontSize: sizeStyle.fontSize, color: colors.textMuted }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.pill,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondary: {
    borderWidth: 1.5,
    borderColor: colors.purple,
    backgroundColor: 'transparent',
  },
});
