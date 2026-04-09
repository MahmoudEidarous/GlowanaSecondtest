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
  { id: 'acne', icon: 'ellipse' as const, label: 'Acne & breakouts' },
  { id: 'dark-spots', icon: 'contrast' as const, label: 'Dark spots & marks' },
  { id: 'wrinkles', icon: 'git-branch' as const, label: 'Wrinkles & fine lines' },
  { id: 'texture', icon: 'finger-print' as const, label: 'Uneven texture' },
  { id: 'pores', icon: 'scan' as const, label: 'Large pores' },
  { id: 'dullness', icon: 'moon' as const, label: 'Dullness & no glow' },
  { id: 'redness', icon: 'flame' as const, label: 'Redness & irritation' },
  { id: 'dark-circles', icon: 'eye' as const, label: 'Dark circles' },
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
        <View>
          <Button
            title={selected.length > 0 ? `Continue (${selected.length} selected)` : 'Select at least one'}
            size="lg"
            onPress={() => router.push('/onboarding/social-proof')}
            disabled={selected.length === 0}
            style={{ opacity: selected.length > 0 ? 1 : 0.4 }}
          />
        </View>
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            what bothers you{'\n'}most about your skin?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            select all that apply — we&apos;ll focus your tips on these
          </Text>
        </Animated.View>
      </View>

      <View style={styles.list}>
        {concerns.map((concern, index) => {
          const isSelected = selected.includes(concern.id);
          return (
            <Animated.View
              key={concern.id}
              entering={FadeInDown.delay(300 + index * 60).duration(500)}
            >
              <Pressable
                onPress={() => toggleConcern(concern.id)}
                style={[styles.item, isSelected && styles.itemSelected]}
              >
                <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                  {isSelected ? (
                    <LinearGradient
                      colors={[...gradients.primary.colors]}
                      start={gradients.primary.start}
                      end={gradients.primary.end}
                      style={styles.iconGradient}
                    >
                      <Ionicons name={concern.icon} size={18} color={colors.white} />
                    </LinearGradient>
                  ) : (
                    <Ionicons name={concern.icon} size={18} color={colors.textDim} />
                  )}
                </View>
                <Text
                  variant="cardTitle"
                  style={[styles.label, isSelected && { color: colors.white }]}
                >
                  {concern.label}
                </Text>
                <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
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
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    lineHeight: 40,
  },
  list: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 12,
  },
  itemSelected: {
    borderColor: colors.purple,
    backgroundColor: 'rgba(168,85,247,0.06)',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(168,85,247,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  iconBoxSelected: {
    backgroundColor: 'transparent',
  },
  iconGradient: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: colors.purple,
    backgroundColor: colors.purple,
  },
});
