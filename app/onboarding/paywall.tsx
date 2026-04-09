import { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { colors, gradients, radii, shadows } from '@/constants/theme';

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
  const [selectedPlan, setSelectedPlan] = useState<Plan>('annual');

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    router.replace('/(tabs)');
  };

  const handleSubscribe = () => {
    // TODO: Integrate RevenueCat / subscription logic
    completeOnboarding();
  };

  return (
    <OnboardingScreen step={12} showProgress={false}>
      <View style={styles.content}>
        {/* Header */}
        <Animated.View entering={FadeIn.duration(600)} style={styles.headerRow}>
          <LinearGradient
            colors={[...gradients.primary.colors]}
            start={gradients.primary.start}
            end={gradients.primary.end}
            style={styles.logoMini}
          >
            <Text variant="buttonLabel" style={{ fontSize: 18 }}>G</Text>
          </LinearGradient>
          <Pressable
            style={styles.closeBtn}
            onPress={completeOnboarding}
          >
            <Ionicons name="close" size={22} color={colors.textDim} />
          </Pressable>
        </Animated.View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            unlock your{'\n'}full glow-up
          </Text>
          <Text variant="sectionSub" style={styles.subtitle}>
            your personalized glow profile is ready — start your free trial to unlock everything
          </Text>
        </Animated.View>

        {/* Features */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.featuresList}>
          {features.map((feature) => (
            <View key={feature.text} style={styles.featureRow}>
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={gradients.primary.start}
                end={gradients.primary.end}
                style={styles.featureCheck}
              >
                <Ionicons name={feature.icon} size={14} color={colors.white} />
              </LinearGradient>
              <Text variant="bodySmall" style={{ color: colors.text, fontSize: 13, flex: 1 }}>
                {feature.text}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/* Plan selector */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.plans}>
          {/* Annual plan */}
          <Pressable
            style={[styles.planCard, selectedPlan === 'annual' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('annual')}
          >
            {selectedPlan === 'annual' && (
              <LinearGradient
                colors={[...gradients.button.colors]}
                start={gradients.button.start}
                end={gradients.button.end}
                style={styles.bestValueBadge}
              >
                <Text variant="tagText" style={{ fontSize: 9 }}>BEST VALUE</Text>
              </LinearGradient>
            )}
            <View style={styles.planHeader}>
              <View style={[styles.planRadio, selectedPlan === 'annual' && styles.planRadioSelected]}>
                {selectedPlan === 'annual' && (
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                )}
              </View>
              <View style={styles.planInfo}>
                <Text variant="cardTitle">Annual</Text>
                <Text variant="caption" style={{ color: colors.textDim }}>
                  3-day free trial, then
                </Text>
              </View>
              <View style={styles.planPrice}>
                <Text variant="cardTitle" style={{ color: colors.hotpink, fontSize: 20 }}>
                  $29.99
                </Text>
                <Text variant="caption" style={{ color: colors.textDim }}>/year</Text>
              </View>
            </View>
            <View style={styles.planSaving}>
              <Ionicons name="pricetag" size={12} color={colors.good} />
              <Text variant="caption" style={{ color: colors.good, fontSize: 10 }}>
                Save 88% vs weekly — just $2.50/month
              </Text>
            </View>
          </Pressable>

          {/* Weekly plan */}
          <Pressable
            style={[styles.planCard, selectedPlan === 'weekly' && styles.planCardSelected]}
            onPress={() => setSelectedPlan('weekly')}
          >
            <View style={styles.planHeader}>
              <View style={[styles.planRadio, selectedPlan === 'weekly' && styles.planRadioSelected]}>
                {selectedPlan === 'weekly' && (
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                )}
              </View>
              <View style={styles.planInfo}>
                <Text variant="cardTitle">Weekly</Text>
                <Text variant="caption" style={{ color: colors.textDim }}>
                  3-day free trial, then
                </Text>
              </View>
              <View style={styles.planPrice}>
                <Text variant="cardTitle" style={{ fontSize: 20 }}>$4.99</Text>
                <Text variant="caption" style={{ color: colors.textDim }}>/week</Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {/* Testimonial */}
        <Animated.View entering={FadeInDown.delay(800).duration(600)}>
          <View style={styles.testimonial}>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={14} color={colors.hotpink} />
              ))}
            </View>
            <Text variant="bodySmall" style={styles.testimonialText}>
              &ldquo;Best skincare investment I&apos;ve ever made. My skin has never been better and I actually know why.&rdquo;
            </Text>
            <Text variant="caption" style={{ color: colors.textDim }}>
              — Emma R., using Glowana for 3 months
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <Button
          title={`Start Free Trial`}
          size="lg"
          onPress={handleSubscribe}
        />
        <View style={styles.footerLinks}>
          <Pressable onPress={completeOnboarding}>
            <Text variant="caption" style={{ color: colors.textDim }}>
              Continue with limited access
            </Text>
          </Pressable>
        </View>
        <Text variant="caption" style={styles.legalText}>
          Cancel anytime. No charge during trial period.
        </Text>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoMini: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    marginBottom: 20,
    lineHeight: 22,
    maxWidth: 320,
  },
  featuresList: {
    marginBottom: 20,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureCheck: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plans: {
    gap: 10,
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardSelected: {
    borderColor: colors.hotpink,
    backgroundColor: 'rgba(236,72,153,0.04)',
  },
  bestValueBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 10,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  planRadioSelected: {
    borderColor: colors.hotpink,
    backgroundColor: colors.hotpink,
  },
  planInfo: {
    flex: 1,
    gap: 1,
  },
  planPrice: {
    alignItems: 'flex-end',
  },
  planSaving: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(74,222,128,0.1)',
  },
  testimonial: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 20,
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: 0,
    paddingBottom: 8,
    gap: 10,
  },
  footerLinks: {
    alignItems: 'center',
  },
  legalText: {
    textAlign: 'center',
    color: colors.textDim,
    fontSize: 10,
  },
});
