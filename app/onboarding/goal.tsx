import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, radii } from '@/constants/theme';

const goals = [
  { id: 'clear-skin', emoji: '✨', label: 'Get clear, glowing skin', icon: 'sparkles' as const },
  { id: 'even-tone', emoji: '🎨', label: 'Even out my skin tone', icon: 'color-palette' as const },
  { id: 'anti-aging', emoji: '🌟', label: 'Prevent aging & wrinkles', icon: 'sunny' as const },
  { id: 'full-glow', emoji: '💎', label: 'Full glow-up transformation', icon: 'diamond' as const },
  { id: 'track', emoji: '📈', label: 'Track my skincare progress', icon: 'trending-up' as const },
  { id: 'curious', emoji: '🔍', label: 'Just curious about my score', icon: 'search' as const },
];

export default function GoalScreen() {
  const router = useRouter();
  const { data, setData } = useOnboarding();
  const [selected, setSelected] = useState(data.goal);

  const handleSelect = (id: string) => {
    setSelected(id);
    setData({ goal: id });
  };

  return (
    <OnboardingScreen
      step={2}
      footer={
        <Button
          title="Continue"
          size="lg"
          onPress={() => router.push('/onboarding/skin-type')}
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.4 }}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            what&apos;s your{'\n'}glow-up goal?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            pick the one that matters most to you right now
          </Text>
        </Animated.View>
      </View>

      <View style={styles.options}>
        {goals.map((goal, index) => {
          const isSelected = selected === goal.id;
          return (
            <Animated.View
              key={goal.id}
              entering={FadeInDown.delay(300 + index * 80).duration(500)}
            >
              <Pressable
                onPress={() => handleSelect(goal.id)}
                style={[
                  styles.option,
                  isSelected && styles.optionSelected,
                ]}
              >
                <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                  <Ionicons
                    name={goal.icon}
                    size={20}
                    color={isSelected ? colors.white : colors.purple}
                  />
                </View>
                <Text
                  variant="cardTitle"
                  style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected,
                  ]}
                >
                  {goal.label}
                </Text>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color={colors.white} />
                  )}
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    marginBottom: 28,
  },
  title: {
    marginBottom: 8,
    lineHeight: 40,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 14,
  },
  optionSelected: {
    borderColor: colors.hotpink,
    backgroundColor: 'rgba(236,72,153,0.06)',
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(168,85,247,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxSelected: {
    backgroundColor: colors.hotpink,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
  },
  optionLabelSelected: {
    color: colors.white,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.hotpink,
    backgroundColor: colors.hotpink,
  },
});
