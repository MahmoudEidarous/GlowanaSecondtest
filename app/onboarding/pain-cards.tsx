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
import { Text } from '@/components/ui';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';
import { colors, radii } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

const painStatements = [
  { id: 'products', text: 'I\u2019ve spent so much on products that didn\u2019t work', emoji: '💸' },
  { id: 'routine', text: 'I never know if my routine is actually helping', emoji: '🤔' },
  { id: 'progress', text: 'I wish I could track my skin progress', emoji: '📊' },
  { id: 'compare', text: 'I have no idea where I actually stand', emoji: '📱' },
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
  const leftOpacity = useSharedValue(0);
  const rightOpacity = useSharedValue(0);

  const handleSwipe = (agreed: boolean) => {
    onSwipe(statement.id, agreed);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      rotateZ.value = e.translationX / 25;
      leftOpacity.value = Math.max(0, -e.translationX / SWIPE_THRESHOLD);
      rightOpacity.value = Math.max(0, e.translationX / SWIPE_THRESHOLD);
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
        leftOpacity.value = withTiming(0);
        rightOpacity.value = withTiming(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotateZ.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const leftBadgeStyle = useAnimatedStyle(() => ({
    opacity: leftOpacity.value,
  }));
  const rightBadgeStyle = useAnimatedStyle(() => ({
    opacity: rightOpacity.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, cardStyle]}>
        <LinearGradient
          colors={['rgba(168,85,247,0.1)', 'rgba(236,72,153,0.06)', 'rgba(168,85,247,0.04)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardInner}
        >
          {/* Swipe feedback badges */}
          <Animated.View style={[styles.swipeBadge, styles.swipeBadgeLeft, leftBadgeStyle]}>
            <Ionicons name="close" size={24} color={colors.alert} />
          </Animated.View>
          <Animated.View style={[styles.swipeBadge, styles.swipeBadgeRight, rightBadgeStyle]}>
            <Ionicons name="checkmark" size={24} color={colors.good} />
          </Animated.View>

          <Text style={styles.cardEmoji}>{statement.emoji}</Text>
          <Text variant="sectionTitle" style={styles.cardText}>
            &ldquo;{statement.text}&rdquo;
          </Text>
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

  return (
    <OnboardingScreen step={6}>
      <View style={styles.header}>
        <Animated.View entering={FadeInDown.duration(600)}>
          <Text variant="heroTitle" style={styles.title}>do you relate?</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <Text variant="sectionSub">swipe right if yes, left if no</Text>
        </Animated.View>
      </View>

      {/* Dots */}
      <Animated.View entering={FadeIn.delay(300).duration(500)}>
        <View style={styles.dots}>
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

      {/* Card */}
      <View style={styles.cardContainer}>
        {currentIndex < painStatements.length && (
          <SwipeCard
            key={painStatements[currentIndex].id}
            statement={painStatements[currentIndex]}
            onSwipe={handleSwipe}
          />
        )}
      </View>

      {/* Tap buttons */}
      {currentIndex < painStatements.length && (
        <Animated.View entering={FadeIn.delay(500).duration(500)}>
          <View style={styles.tapRow}>
            <Pressable
              style={styles.tapNo}
              onPress={() => handleSwipe(painStatements[currentIndex].id, false)}
            >
              <Ionicons name="close" size={28} color={colors.alert} />
            </Pressable>
            <Text variant="caption" style={{ color: colors.textDim }}>
              {painStatements.length - currentIndex} left
            </Text>
            <Pressable
              style={styles.tapYes}
              onPress={() => handleSwipe(painStatements[currentIndex].id, true)}
            >
              <Ionicons name="heart" size={24} color={colors.good} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 36,
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    lineHeight: 48,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface2,
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.hotpink,
    borderRadius: 4,
  },
  dotDone: {
    backgroundColor: colors.purple,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    borderRadius: radii['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,0.12)',
  },
  cardInner: {
    padding: 36,
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
    gap: 24,
    position: 'relative',
  },
  swipeBadge: {
    position: 'absolute',
    top: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeBadgeLeft: {
    left: 20,
    backgroundColor: 'rgba(248,113,113,0.12)',
    borderWidth: 2,
    borderColor: 'rgba(248,113,113,0.3)',
  },
  swipeBadgeRight: {
    right: 20,
    backgroundColor: 'rgba(74,222,128,0.12)',
    borderWidth: 2,
    borderColor: 'rgba(74,222,128,0.3)',
  },
  cardEmoji: {
    fontSize: 56,
  },
  cardText: {
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.text,
  },
  tapRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 44,
    paddingBottom: 24,
    paddingTop: 8,
  },
  tapNo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(248,113,113,0.06)',
    borderWidth: 2,
    borderColor: 'rgba(248,113,113,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapYes: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(74,222,128,0.06)',
    borderWidth: 2,
    borderColor: 'rgba(74,222,128,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
