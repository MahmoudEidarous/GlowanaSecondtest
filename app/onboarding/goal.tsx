import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, gradients, radii } from '@/constants/theme';

const goals = [
  { id: 'clear-skin', emoji: '✨', label: 'Get clear, glowing skin' },
  { id: 'even-tone', emoji: '🎨', label: 'Even out my skin tone' },
  { id: 'anti-aging', emoji: '🌟', label: 'Prevent aging & wrinkles' },
  { id: 'full-glow', emoji: '💎', label: 'Full glow-up transformation' },
  { id: 'track', emoji: '📈', label: 'Track my skincare progress' },
  { id: 'curious', emoji: '🔍', label: 'Just curious about my score' },
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
          <Text variant="heroTitle" style={styles.title}>
            what&apos;s your{'\n'}glow-up goal?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <Text variant="sectionSub" style={styles.sub}>
            pick the one that matters most right now
          </Text>
        </Animated.View>
      </View>

      <View style={styles.options}>
        {goals.map((goal, index) => {
          const isSelected = selected === goal.id;
          return (
            <Animated.View
              key={goal.id}
              entering={FadeInDown.delay(250 + index * 70).duration(500)}
            >
              <Pressable
                onPress={() => handleSelect(goal.id)}
                style={[styles.option, isSelected && styles.optionSelected]}
              >
                {isSelected && (
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                )}
                <View style={[styles.emojiBox, isSelected && styles.emojiBoxSelected]}>
                  <Text style={styles.emoji}>{goal.emoji}</Text>
                </View>
                <Text
                  variant="cardTitle"
                  style={[styles.label, isSelected && { color: colors.white }]}
                >
                  {goal.label}
                </Text>
                <View style={[styles.check, isSelected && styles.checkSelected]}>
                  {isSelected && <View style={styles.checkDot} />}
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
    paddingTop: 36,
    marginBottom: 32,
  },
  title: {
    marginBottom: 10,
    lineHeight: 48,
  },
  sub: {
    lineHeight: 22,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.lg,
    padding: 16,
    paddingLeft: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: 14,
    overflow: 'hidden',
  },
  optionSelected: {
    borderColor: 'rgba(236,72,153,0.3)',
    backgroundColor: 'transparent',
  },
  emojiBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: 'rgba(168,85,247,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiBoxSelected: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  emoji: {
    fontSize: 20,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSelected: {
    borderColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
});
