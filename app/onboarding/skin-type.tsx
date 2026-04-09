import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, radii } from '@/constants/theme';

const skinTypes = [
  {
    id: 'oily',
    emoji: '💧',
    label: 'Oily',
    desc: 'Shiny by midday, visible pores',
  },
  {
    id: 'dry',
    emoji: '🏜️',
    label: 'Dry',
    desc: 'Tight, flaky, needs moisture',
  },
  {
    id: 'combination',
    emoji: '⚖️',
    label: 'Combination',
    desc: 'Oily T-zone, dry cheeks',
  },
  {
    id: 'sensitive',
    emoji: '🌸',
    label: 'Sensitive',
    desc: 'Reacts easily, redness prone',
  },
  {
    id: 'normal',
    emoji: '✅',
    label: 'Normal',
    desc: 'Balanced, few issues',
  },
  {
    id: 'not-sure',
    emoji: '🤷',
    label: 'Not sure',
    desc: 'Help me figure it out',
  },
];

export default function SkinTypeScreen() {
  const router = useRouter();
  const { data, setData } = useOnboarding();
  const [selected, setSelected] = useState(data.skinType);

  const handleSelect = (id: string) => {
    setSelected(id);
    setData({ skinType: id });
  };

  return (
    <OnboardingScreen
      step={3}
      footer={
        <Button
          title="Continue"
          size="lg"
          onPress={() => router.push('/onboarding/concerns')}
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.4 }}
        />
      }
    >
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            what&apos;s your{'\n'}skin type?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            this helps us personalize your glow analysis
          </Text>
        </Animated.View>
      </View>

      <View style={styles.grid}>
        {skinTypes.map((type, index) => {
          const isSelected = selected === type.id;
          return (
            <Animated.View
              key={type.id}
              entering={FadeInDown.delay(300 + index * 70).duration(500)}
              style={styles.gridItem}
            >
              <Pressable
                onPress={() => handleSelect(type.id)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}
              >
                <Text style={styles.emoji}>{type.emoji}</Text>
                <Text
                  variant="cardTitle"
                  style={[styles.label, isSelected && { color: colors.white }]}
                >
                  {type.label}
                </Text>
                <Text
                  variant="caption"
                  style={[styles.desc, isSelected && { color: colors.softPink }]}
                >
                  {type.desc}
                </Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  gridItem: {
    width: '48%',
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 18,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    gap: 6,
    minHeight: 120,
    justifyContent: 'center',
  },
  cardSelected: {
    borderColor: colors.hotpink,
    backgroundColor: 'rgba(236,72,153,0.06)',
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
  },
  desc: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.textDim,
    lineHeight: 14,
  },
});
