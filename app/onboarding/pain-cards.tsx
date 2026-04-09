import { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, gradients, radii } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

const painStatements = [
  {
    id: 'products',
    text: 'I\u2019ve spent hundreds on skincare products that didn\u2019t work for me',
    emoji: '💸',
  },
  {
    id: 'routine',
    text: 'I never know if my skincare routine is actually helping my skin',
    emoji: '🤔',
  },
  {
    id: 'progress',
    text: 'I wish I had a simple way to track my skin progress over time',
    emoji: '📊',
  },
  {
    id: 'compare',
    text: 'I compare myself to influencers but have no idea where I actually stand',
    emoji: '📱',
  },
];

function SwipeCard({
  statement,
  onSwipe,
}: {
  statement: (typeof painStatements)[0];
  onSwipe: (id: string, agreed: boolean) => void;
}) {
  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleSwipe = (agreed: boolean) => {
    onSwipe(statement.id, agreed);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      rotateZ.value = e.translationX / 20;
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH + 100, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(handleSwipe)(true);
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH - 100, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        runOnJS(handleSwipe)(false);
      } else {
        translateX.value = withSpring(0);
        rotateZ.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotateZ.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <LinearGradient
          colors={['rgba(168,85,247,0.08)', 'rgba(236,72,153,0.04)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardInner}
        >
          <Text style={styles.cardEmoji}>{statement.emoji}</Text>
          <Text variant="sectionTitle" style={styles.cardText}>
            &ldquo;{statement.text}&rdquo;
          </Text>
          <View style={styles.swipeHints}>
            <View style={styles.hintLeft}>
              <Ionicons name="close" size={18} color={colors.alert} />
              <Text variant="caption" style={{ color: colors.alert }}>nope</Text>
            </View>
            <View style={styles.hintRight}>
              <Text variant="caption" style={{ color: colors.good }}>me</Text>
              <Ionicons name="checkmark" size={18} color={colors.good} />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </GestureDetector>
  );
}

export default function PainCardsScreen() {
  const router = useRouter();
  const { setData } = useOnboarding();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleSwipe = (id: string, agreed: boolean) => {
    const updated = { ...results, [id]: agreed };
    setResults(updated);

    setTimeout(() => {
      if (currentIndex < painStatements.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setData({ swipedCards: updated });
        router.push('/onboarding/solution');
      }
    }, 350);
  };

  const remaining = painStatements.length - currentIndex;

  return (
    <OnboardingScreen step={6}>
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="sectionTitle" style={styles.title}>
            do you relate?
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text variant="sectionSub">
            swipe right if it&apos;s you, left if it&apos;s not
          </Text>
        </Animated.View>
      </View>

      {/* Card counter */}
      <Animated.View entering={FadeIn.delay(400).duration(500)}>
        <View style={styles.counter}>
          {painStatements.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && styles.dotActive,
                i < currentIndex && styles.dotDone,
              ]}
            />
          ))}
        </View>
      </Animated.View>

      {/* Cards stack */}
      <View style={styles.cardContainer}>
        {currentIndex < painStatements.length ? (
          <SwipeCard
            key={painStatements[currentIndex].id}
            statement={painStatements[currentIndex]}
            onSwipe={handleSwipe}
          />
        ) : null}
      </View>

      {/* Tap buttons for accessibility */}
      {currentIndex < painStatements.length && (
        <Animated.View entering={FadeIn.delay(600).duration(500)}>
          <View style={styles.tapButtons}>
            <Pressable
              style={styles.tapBtnNo}
              onPress={() => handleSwipe(painStatements[currentIndex].id, false)}
            >
              <Ionicons name="close" size={28} color={colors.alert} />
            </Pressable>
            <Text variant="caption" style={{ color: colors.textDim }}>
              {remaining} left
            </Text>
            <Pressable
              style={styles.tapBtnYes}
              onPress={() => handleSwipe(painStatements[currentIndex].id, true)}
            >
              <Ionicons name="checkmark" size={28} color={colors.good} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 32,
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    lineHeight: 40,
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface2,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.hotpink,
  },
  dotDone: {
    backgroundColor: colors.purple,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardInner: {
    padding: 32,
    alignItems: 'center',
    minHeight: 280,
    justifyContent: 'center',
    gap: 20,
  },
  cardEmoji: {
    fontSize: 48,
  },
  cardText: {
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.text,
  },
  swipeHints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 16,
  },
  hintLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hintRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tapButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    paddingBottom: 20,
  },
  tapBtnNo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(248,113,113,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(248,113,113,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapBtnYes: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(74,222,128,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
