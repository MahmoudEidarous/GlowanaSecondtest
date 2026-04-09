import { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Button } from '@/components/ui';
import { colors, gradients, radii } from '@/constants/theme';

const ONBOARDING_COMPLETE_KEY = 'glowana_onboarding_complete';

const features = [
  { icon: 'scan' as const, text: 'Unlimited AI skin scans' },
  { icon: 'sparkles' as const, text: 'Full glow score breakdown' },
  { icon: 'bulb' as const, text: 'Personalized skincare tips' },
  { icon: 'trending-up' as const, text: 'Progress tracking over time' },
  { icon: 'share-social' as const, text: 'Shareable score cards' },
  { icon: 'flame' as const, text: 'Daily streak & challenges' },
];

type Plan = 'weekly' | 'annual';

export default function PaywallScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('annual');

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    router.replace('/(tabs)');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.topBar}>
          <LinearGradient
            colors={[...gradients.primary.colors]}
            start={gradients.primary.start}
            end={gradients.primary.end}
            style={styles.logoMini}
          >
            <Text variant="buttonLabel" style={{ fontSize: 16 }}>G</Text>
          </LinearGradient>
          <Pressable style={styles.closeBtn} onPress={completeOnboarding}>
            <Ionicons name="close" size={20} color={colors.textDim} />
          </Pressable>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <Text variant="heroTitle" style={styles.title}>
            unlock your{'\n'}full glow-up
          </Text>
          <Text variant="sectionSub" style={styles.sub}>
            your glow profile is ready — start your free trial to see everything
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View entering={FadeInDown.delay(250).duration(600)}>
          <View style={styles.features}>
            {features.map((f) => (
              <View key={f.text} style={styles.featureRow}>
                <LinearGradient
                  colors={[...gradients.primary.colors]}
                  start={gradients.primary.start}
                  end={gradients.primary.end}
                  style={styles.featureIcon}
                >
                  <Ionicons name={f.icon} size={13} color={colors.white} />
                </LinearGradient>
                <Text variant="bodySmall" style={{ color: colors.text, fontSize: 13, flex: 1 }}>
                  {f.text}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Plans */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.plans}>
          {/* Annual */}
          <Pressable
            style={[styles.planCard, selectedPlan === 'annual' && styles.planSelected]}
            onPress={() => setSelectedPlan('annual')}
          >
            {selectedPlan === 'annual' && (
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
            )}
            {selectedPlan === 'annual' && (
              <View style={styles.bestBadge}>
                <Text variant="tagText" style={{ fontSize: 9 }}>BEST VALUE</Text>
              </View>
            )}
            <View style={styles.planRow}>
              <View style={[styles.planRadio, selectedPlan === 'annual' && styles.planRadioOn]}>
                {selectedPlan === 'annual' && <View style={styles.planRadioDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="cardTitle" style={selectedPlan === 'annual' ? { color: colors.white } : {}}>
                  Annual
                </Text>
                <Text variant="caption" style={{ color: selectedPlan === 'annual' ? 'rgba(255,255,255,0.6)' : colors.textDim, fontSize: 10 }}>
                  3-day free trial
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="cardTitle" style={[{ fontSize: 22 }, selectedPlan === 'annual' ? { color: colors.white } : { color: colors.hotpink }]}>
                  $29.99
                </Text>
                <Text variant="caption" style={{ color: selectedPlan === 'annual' ? 'rgba(255,255,255,0.6)' : colors.textDim, fontSize: 10 }}>
                  /year — just $2.50/mo
                </Text>
              </View>
            </View>
          </Pressable>

          {/* Weekly */}
          <Pressable
            style={[styles.planCard, selectedPlan === 'weekly' && styles.planSelected]}
            onPress={() => setSelectedPlan('weekly')}
          >
            {selectedPlan === 'weekly' && (
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
            )}
            <View style={styles.planRow}>
              <View style={[styles.planRadio, selectedPlan === 'weekly' && styles.planRadioOn]}>
                {selectedPlan === 'weekly' && <View style={styles.planRadioDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="cardTitle" style={selectedPlan === 'weekly' ? { color: colors.white } : {}}>
                  Weekly
                </Text>
                <Text variant="caption" style={{ color: selectedPlan === 'weekly' ? 'rgba(255,255,255,0.6)' : colors.textDim, fontSize: 10 }}>
                  3-day free trial
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text variant="cardTitle" style={[{ fontSize: 22 }, selectedPlan === 'weekly' ? { color: colors.white } : {}]}>
                  $4.99
                </Text>
                <Text variant="caption" style={{ color: selectedPlan === 'weekly' ? 'rgba(255,255,255,0.6)' : colors.textDim, fontSize: 10 }}>
                  /week
                </Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {/* Testimonial */}
        <Animated.View entering={FadeInDown.delay(550).duration(600)}>
          <View style={styles.testimonial}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={14} color={colors.hotpink} />
              ))}
            </View>
            <Text variant="bodySmall" style={styles.tText}>
              &ldquo;Best skincare investment I&apos;ve made. My skin has never been better.&rdquo;
            </Text>
            <Text variant="caption" style={{ color: colors.textDim, fontSize: 11 }}>
              — Emma R.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Sticky footer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 8, 24) }]}>
        <Button title="Start Free Trial" size="lg" onPress={completeOnboarding} />
        <Pressable style={styles.skipLink} onPress={completeOnboarding}>
          <Text variant="caption" style={{ color: colors.textDim }}>Continue with limited access</Text>
        </Pressable>
        <Text variant="caption" style={styles.legal}>
          Cancel anytime. No charge during trial.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    paddingHorizontal: 28,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    marginBottom: 24,
  },
  logoMini: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    lineHeight: 48,
  },
  sub: {
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 320,
  },
  features: {
    gap: 12,
    marginBottom: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plans: {
    gap: 10,
    marginBottom: 20,
  },
  planCard: {
    borderRadius: radii.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    position: 'relative',
  },
  planSelected: {
    borderColor: 'rgba(168,85,247,0.3)',
    backgroundColor: 'transparent',
  },
  bestBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  planRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planRadioOn: {
    borderColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  planRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  testimonial: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  tText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 20,
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  skipLink: {
    alignItems: 'center',
    paddingTop: 12,
  },
  legal: {
    textAlign: 'center',
    color: colors.textDim,
    fontSize: 10,
    paddingTop: 8,
  },
});
