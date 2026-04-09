import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, radii } from '@/constants/theme';

const timesOfDay = [
  { id: 'morning', icon: 'sunny' as const, label: 'Morning', emoji: '🌅' },
  { id: 'evening', icon: 'moon' as const, label: 'Evening', emoji: '🌙' },
  { id: 'both', icon: 'sync' as const, label: 'Both', emoji: '✨' },
  { id: 'whenever', icon: 'shuffle' as const, label: 'Whenever', emoji: '🤷' },
];

const durations = [
  { id: 'under5', label: 'Under 5 min', desc: 'Quick & simple' },
  { id: '5to10', label: '5–10 min', desc: 'Balanced routine' },
  { id: '10to20', label: '10–20 min', desc: 'Dedicated care' },
  { id: '20plus', label: '20+ min', desc: 'Full ritual' },
];

export default function RoutineScreen() {
  const router = useRouter();
  const { data, setData } = useOnboarding();
  const [time, setTime] = useState(data.routineTime);
  const [duration, setDuration] = useState(data.routineDuration);

  const canContinue = time && duration;

  const handleTimeSelect = (id: string) => {
    setTime(id);
    setData({ routineTime: id });
  };

  const handleDurationSelect = (id: string) => {
    setDuration(id);
    setData({ routineDuration: id });
  };

  return (
    <OnboardingScreen
      step={8}
      footer={
        <Button
          title="Continue"
          size="lg"
          onPress={() => router.push('/onboarding/camera-prime')}
          disabled={!canContinue}
          style={{ opacity: canContinue ? 1 : 0.4 }}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            tell us about{'\n'}your routine
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            we&apos;ll tailor your glow tips to fit your schedule
          </Text>
        </Animated.View>
      </View>

      {/* Time of day */}
      <Animated.View entering={FadeInDown.delay(300).duration(600)}>
        <Text variant="label" style={styles.sectionLabel}>WHEN DO YOU DO SKINCARE?</Text>
        <View style={styles.timeGrid}>
          {timesOfDay.map((item) => {
            const isSelected = time === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.timeCard, isSelected && styles.timeCardSelected]}
                onPress={() => handleTimeSelect(item.id)}
              >
                <Text style={styles.timeEmoji}>{item.emoji}</Text>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isSelected ? colors.hotpink : colors.textDim}
                />
                <Text
                  variant="cardTitle"
                  style={[styles.timeLabel, isSelected && { color: colors.white }]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>

      {/* Duration */}
      <Animated.View entering={FadeInDown.delay(500).duration(600)}>
        <Text variant="label" style={styles.sectionLabel}>HOW MUCH TIME DO YOU SPEND?</Text>
        <View style={styles.durationList}>
          {durations.map((item) => {
            const isSelected = duration === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.durationItem, isSelected && styles.durationItemSelected]}
                onPress={() => handleDurationSelect(item.id)}
              >
                <View style={styles.durationText}>
                  <Text
                    variant="cardTitle"
                    style={[{ fontSize: 14 }, isSelected && { color: colors.white }]}
                  >
                    {item.label}
                  </Text>
                  <Text variant="caption" style={{ color: colors.textDim, fontSize: 10 }}>
                    {item.desc}
                  </Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && (
                    <Ionicons name="checkmark" size={14} color={colors.white} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    lineHeight: 40,
  },
  sectionLabel: {
    marginBottom: 12,
    marginTop: 8,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  timeCard: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  timeCardSelected: {
    borderColor: colors.hotpink,
    backgroundColor: 'rgba(236,72,153,0.06)',
  },
  timeEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },
  timeLabel: {
    fontSize: 13,
  },
  durationList: {
    gap: 8,
  },
  durationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  durationItemSelected: {
    borderColor: colors.hotpink,
    backgroundColor: 'rgba(236,72,153,0.06)',
  },
  durationText: {
    flex: 1,
    gap: 2,
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
