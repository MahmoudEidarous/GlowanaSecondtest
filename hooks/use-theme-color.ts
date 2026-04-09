import { colors } from '@/constants/theme';

type ColorKey = keyof typeof colors;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorKey
) {
  // Dark mode only — always use dark/props.dark
  const colorFromProps = props.dark;
  if (colorFromProps) {
    return colorFromProps;
  }
  return colors[colorName];
}
