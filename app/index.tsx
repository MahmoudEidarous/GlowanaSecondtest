import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@/constants/theme';

const ONBOARDING_COMPLETE_KEY = 'glowana_onboarding_complete';

export default function RootIndex() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      if (completed === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
      setChecking(false);
    };
    check();
  }, [router]);

  if (checking) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.hotpink} size="large" />
      </View>
    );
  }

  return null;
}
