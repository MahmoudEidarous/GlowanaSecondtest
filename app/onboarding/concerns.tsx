import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, gradients, radii } from '@/constants/theme';

const concerns = [
  { id: 'acne', emoji: '😣', label: 'Acne & breakouts' },
  { id: 'dark-spots', emoji: '🔵', label: 'Dark spots & marks' },
  { id: 'wrinkles', emoji: '〰️', label: 'Wrinkles & fine lines' },
  { id: 'texture', emoji: '🪨', label: 'Uneven texture' },
  { id: 'pores', emoji: '🔍', label: 'Large pores' },
  { id: 'dullness', emoji: '😶', label: 'Dullness & no glow' },
  { id: 'redness', emoji: '🔴', label: 'Redness & irritation' },
  { id: 'dark-circles', emoji: '👁️', label: 'Dark circles' },
];

export default function ConcernsScreen() {
  const router = useRouter();
  const { data, setData } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(data.concerns);

  const toggleConcern = (id: string) => {
    const updated = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id];
    setSelected(updated);
    setData({ concerns: updated });
  };

  return (
    <OnboardingScreen
      step={4}
      footer={
        <Button
          title={selected.length > 0 ? `Continue with ${selected.length} selected` : 'Select at least one'}
          size="lg"
          onPress={() => router.push('/onboarding/social-proof')}
          disabled={selected.length === 0}
          style={{ opacity: selected.length > 0 ? 1 : 0.4 }}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="heroTitle" style={styles.title}>
            what bothers you{'\n'}most?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <Text variant="sectionSub">
            select all that apply
          </Text>
        </Animated.View>
      </View>

      <View style={styles.grid}>
        {concerns.map((concern, index) => {
          const isSelected = selected.includes(concern.id);
          return (
            <Animated.View
              key={concern.id}
              entering={FadeInDown.delay(250 + index * 50).duration(450)}
              style={styles.gridItem}
            >
              <Pressable
                onPress={() => toggleConcern(concern.id)}
                style={[styles.chip, isSelected && styles.chipSelected]}
              >
                {isSelected && (
                  <LinearGradient
                    colors={['rgba(168,85,247,0.15)', 'rgba(236,72,153,0.08)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                  />
                )}
                <Text style={styles.emoji}>{concern.emoji}</Text>
                <Text
                  variant="cardTitle"
                  style={[styles.chipLabel, isSelected && { color: colors.white }]}
                >
                  {concern.label}
                </Text>
                {isSelected && (
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={gradients.primary.start}
                    end={gradients.primary.end}
                    style={styles.checkBadge}
                  >
                    <Ionicons name="checkmark" size={12} color={colors.white} />
                  </LinearGradient>
                )}
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
    marginBottom: 28,
  },
  title: {
    marginBottom: 10,
    lineHeight: 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '47%',
    flexGrow: 1,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  chipSelected: {
    borderColor: 'rgba(168,85,247,0.25)',
  },
  emoji: {
    fontSize: 20,
  },
  chipLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
  },
  checkBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
