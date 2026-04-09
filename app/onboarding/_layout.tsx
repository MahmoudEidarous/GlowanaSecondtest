import { Stack } from 'expo-router';
import { colors } from '@/constants/theme';
import { OnboardingProvider } from '@/components/onboarding/OnboardingContext';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'slide_from_right',
        }}
      />
    </OnboardingProvider>
  );
}
