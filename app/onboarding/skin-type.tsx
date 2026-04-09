import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, radii } from '@/constants/theme';

const skinTypes = [
  { id: 'oily', emoji: '💧', label: 'Oily', desc: 'Shiny by midday' },
  { id: 'dry', emoji: '🏜️', label: 'Dry', desc: 'Tight & flaky' },
  { id: 'combination', emoji: '⚖️', label: 'Combo', desc: 'Oily T-zone' },
  { id: 'sensitive', emoji: '🌸', label: 'Sensitive', desc: 'Reacts easily' },
  { id: 'normal', emoji: '✅', label: 'Normal', desc: 'Balanced skin' },
  { id: 'not-sure', emoji: '🤷', label: 'Not sure', desc: 'Help me out' },
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
          <Text variant="heroTitle" style={styles.title}>
            what&apos;s your{'\n'}skin type?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <Text variant="sectionSub">
            helps us personalize your glow analysis
          </Text>
        </Animated.View>
      </View>

      <View style={styles.grid}>
        {skinTypes.map((type, index) => {
          const isSelected = selected === type.id;
          return (
            <Animated.View
              key={type.id}
              entering={FadeInDown.delay(250 + index * 60).duration(500)}
              style={styles.gridItem}
            >
              <Pressable
                onPress={() => handleSelect(type.id)}
                style={[styles.card, isSelected && styles.cardSelected]}
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
                <Text style={styles.emoji}>{type.emoji}</Text>
                <Text
                  variant="cardTitle"
                  style={[{ fontSize: 15 }, isSelected && { color: colors.white }]}
                >
                  {type.label}
                </Text>
                <Text
                  variant="caption"
                  style={[styles.desc, isSelected && { color: colors.softPink }]}
                >
                  {type.desc}
                </Text>
                {isSelected && (
                  <View style={styles.selectedDot} />
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
    marginBottom: 32,
  },
  title: {
    marginBottom: 10,
    lineHeight: 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 130,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  cardSelected: {
    borderColor: 'rgba(168,85,247,0.3)',
  },
  emoji: {
    fontSize: 32,
  },
  desc: {
    fontSize: 11,
    textAlign: 'center',
    color: colors.textDim,
  },
  selectedDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.hotpink,
  },
});
