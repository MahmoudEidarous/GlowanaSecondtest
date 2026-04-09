import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, gradients, radii } from '@/constants/theme';

const timesOfDay = [
  { id: 'morning', emoji: '🌅', label: 'Morning' },
  { id: 'evening', emoji: '🌙', label: 'Evening' },
  { id: 'both', emoji: '✨', label: 'Both' },
  { id: 'whenever', emoji: '🤷', label: 'Whenever' },
];

const durations = [
  { id: 'under5', label: 'Under 5 min', desc: 'Quick & simple' },
  { id: '5to10', label: '5\u201310 min', desc: 'Balanced routine' },
  { id: '10to20', label: '10\u201320 min', desc: 'Dedicated care' },
  { id: '20plus', label: '20+ min', desc: 'Full ritual' },
];

export default function RoutineScreen() {
  const router = useRouter();
  const { data, setData } = useOnboarding();
  const [time, setTime] = useState(data.routineTime);
  const [duration, setDuration] = useState(data.routineDuration);

  const canContinue = time && duration;

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
          <Text variant="heroTitle" style={styles.title}>
            tell us about{'\n'}your routine
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <Text variant="sectionSub">
            we&apos;ll tailor tips to fit your schedule
          </Text>
        </Animated.View>
      </View>

      {/* Time of day */}
      <Animated.View entering={FadeInDown.delay(250).duration(600)}>
        <Text variant="label" style={styles.sectionLabel}>WHEN DO YOU DO SKINCARE?</Text>
        <View style={styles.timeGrid}>
          {timesOfDay.map((item) => {
            const isSelected = time === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.timeCard, isSelected && styles.timeCardSelected]}
                onPress={() => { setTime(item.id); setData({ routineTime: item.id }); }}
              >
                {isSelected && (
                  <LinearGradient
                    colors={['rgba(168,85,247,0.12)', 'rgba(236,72,153,0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                )}
                <Text style={{ fontSize: 28 }}>{item.emoji}</Text>
                <Text variant="cardTitle" style={[{ fontSize: 13 }, isSelected && { color: colors.white }]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </Animated.View>

      {/* Duration */}
      <Animated.View entering={FadeInDown.delay(400).duration(600)}>
        <Text variant="label" style={styles.sectionLabel}>HOW MUCH TIME DO YOU SPEND?</Text>
        <View style={styles.durList}>
          {durations.map((item) => {
            const isSelected = duration === item.id;
            return (
              <Pressable
                key={item.id}
                style={[styles.durItem, isSelected && styles.durItemSelected]}
                onPress={() => { setDuration(item.id); setData({ routineDuration: item.id }); }}
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
                <View style={{ flex: 1 }}>
                  <Text variant="cardTitle" style={[{ fontSize: 14 }, isSelected && { color: colors.white }]}>
                    {item.label}
                  </Text>
                  <Text variant="caption" style={[{ fontSize: 10 }, isSelected ? { color: 'rgba(255,255,255,0.7)' } : { color: colors.textDim }]}>
                    {item.desc}
                  </Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
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
    paddingTop: 36,
    marginBottom: 28,
  },
  title: {
    marginBottom: 10,
    lineHeight: 48,
  },
  sectionLabel: {
    marginBottom: 14,
  },
  timeGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  timeCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  timeCardSelected: {
    borderColor: 'rgba(168,85,247,0.3)',
  },
  durList: {
    gap: 10,
  },
  durItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  durItemSelected: {
    borderColor: 'rgba(236,72,153,0.3)',
    backgroundColor: 'transparent',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
});
