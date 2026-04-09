import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
  Screen,
  Text,
  Button,
  Card,
  ProgressBar,
  Tag,
  Toast,
  ScoreRing,
  Divider,
} from '@/components/ui';
import { colors, gradients, spacing, shadows } from '@/constants/theme';

// ── Icon set for the entire app ──
const appIcons: { name: keyof typeof Ionicons.glyphMap; label: string; section: string }[] = [
  // Navigation
  { name: 'home', label: 'Home', section: 'Navigation' },
  { name: 'scan', label: 'Scan', section: 'Navigation' },
  { name: 'time', label: 'History', section: 'Navigation' },
  { name: 'person', label: 'Profile', section: 'Navigation' },
  { name: 'settings-outline', label: 'Settings', section: 'Navigation' },
  // Scan & Camera
  { name: 'camera', label: 'Camera', section: 'Scan & Camera' },
  { name: 'flash', label: 'Flash', section: 'Scan & Camera' },
  { name: 'sync', label: 'Flip', section: 'Scan & Camera' },
  { name: 'image', label: 'Gallery', section: 'Scan & Camera' },
  { name: 'qr-code', label: 'QR Code', section: 'Scan & Camera' },
  // Scoring & Metrics
  { name: 'sparkles', label: 'Glow', section: 'Scoring' },
  { name: 'star', label: 'Score', section: 'Scoring' },
  { name: 'trending-up', label: 'Improving', section: 'Scoring' },
  { name: 'trending-down', label: 'Declining', section: 'Scoring' },
  { name: 'analytics', label: 'Analytics', section: 'Scoring' },
  { name: 'podium', label: 'Ranking', section: 'Scoring' },
  // Skin & Beauty
  { name: 'water', label: 'Hydration', section: 'Skin & Beauty' },
  { name: 'sunny', label: 'SPF / UV', section: 'Skin & Beauty' },
  { name: 'moon', label: 'Night', section: 'Skin & Beauty' },
  { name: 'leaf', label: 'Natural', section: 'Skin & Beauty' },
  { name: 'flower', label: 'Beauty', section: 'Skin & Beauty' },
  { name: 'eye', label: 'Eyes', section: 'Skin & Beauty' },
  { name: 'color-palette', label: 'Skin Tone', section: 'Skin & Beauty' },
  { name: 'fitness', label: 'Wellness', section: 'Skin & Beauty' },
  // Tips & Content
  { name: 'bulb', label: 'Tip', section: 'Tips & Content' },
  { name: 'book', label: 'Guide', section: 'Tips & Content' },
  { name: 'newspaper', label: 'Article', section: 'Tips & Content' },
  { name: 'videocam', label: 'Video', section: 'Tips & Content' },
  { name: 'play-circle', label: 'Play', section: 'Tips & Content' },
  // Social & Sharing
  { name: 'share-social', label: 'Share', section: 'Social' },
  { name: 'heart', label: 'Like', section: 'Social' },
  { name: 'chatbubble', label: 'Comment', section: 'Social' },
  { name: 'people', label: 'Friends', section: 'Social' },
  { name: 'trophy', label: 'Challenge', section: 'Social' },
  { name: 'ribbon', label: 'Badge', section: 'Social' },
  // Streaks & Gamification
  { name: 'flame', label: 'Streak', section: 'Gamification' },
  { name: 'calendar', label: 'Calendar', section: 'Gamification' },
  { name: 'checkmark-circle', label: 'Complete', section: 'Gamification' },
  { name: 'lock-closed', label: 'Locked', section: 'Gamification' },
  { name: 'lock-open', label: 'Unlocked', section: 'Gamification' },
  { name: 'gift', label: 'Reward', section: 'Gamification' },
  { name: 'diamond', label: 'Premium', section: 'Gamification' },
  // System & Utility
  { name: 'notifications', label: 'Notifs', section: 'System' },
  { name: 'close', label: 'Close', section: 'System' },
  { name: 'chevron-back', label: 'Back', section: 'System' },
  { name: 'chevron-forward', label: 'Forward', section: 'System' },
  { name: 'add', label: 'Add', section: 'System' },
  { name: 'remove', label: 'Remove', section: 'System' },
  { name: 'ellipsis-horizontal', label: 'More', section: 'System' },
  { name: 'search', label: 'Search', section: 'System' },
  { name: 'filter', label: 'Filter', section: 'System' },
  { name: 'download', label: 'Download', section: 'System' },
  { name: 'trash', label: 'Delete', section: 'System' },
  { name: 'create', label: 'Edit', section: 'System' },
  { name: 'information-circle', label: 'Info', section: 'System' },
  { name: 'help-circle', label: 'Help', section: 'System' },
  { name: 'shield-checkmark', label: 'Privacy', section: 'System' },
  { name: 'log-out', label: 'Logout', section: 'System' },
];

// Group icons by section
const iconSections = appIcons.reduce<Record<string, typeof appIcons>>((acc, icon) => {
  if (!acc[icon.section]) acc[icon.section] = [];
  acc[icon.section].push(icon);
  return acc;
}, {});

export default function DesignSystemScreen() {
  return (
    <Screen>
      {/* ═══════════ HERO ═══════════ */}
      <View style={styles.hero}>
        <LinearGradient
          colors={[...gradients.primary.colors]}
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={[styles.logo, shadows.glow]}
        >
          <Text variant="scoreLG">G</Text>
        </LinearGradient>
        <Text variant="heroTitle">glowana</Text>
        <Text variant="sectionSub" style={{ textAlign: 'center' }}>
          complete design system. every color, font, component, and icon.
        </Text>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ COLORS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>colors</Text>

        <Text variant="label">PRIMARY SPECTRUM</Text>
        <View style={styles.colorRow}>
          {[
            { name: 'Purple', hex: '#A855F7', color: colors.purple },
            { name: 'Fuchsia', hex: '#C026D3', color: colors.fuchsia },
            { name: 'Hot Pink', hex: '#EC4899', color: colors.hotpink },
            { name: 'Med Pink', hex: '#F472B6', color: colors.mediumPink },
            { name: 'Soft Pink', hex: '#F9A8D4', color: colors.softPink },
          ].map((c) => (
            <View key={c.name} style={styles.colorCard}>
              <View style={[styles.colorSwatch, { backgroundColor: c.color }]} />
              <Text variant="caption" style={styles.colorName}>{c.name}</Text>
              <Text variant="caption" style={{ fontSize: 9 }}>{c.hex}</Text>
            </View>
          ))}
        </View>

        <Text variant="label" style={styles.subLabel}>BACKGROUNDS & SURFACES</Text>
        <View style={styles.colorRow}>
          {[
            { name: 'BG', hex: '#0F0B1A', color: colors.bg },
            { name: 'Surface', hex: '#1A1428', color: colors.surface },
            { name: 'Surface 2', hex: '#221A33', color: colors.surface2 },
          ].map((c) => (
            <View key={c.name} style={styles.colorCard}>
              <View style={[styles.colorSwatch, { backgroundColor: c.color, borderWidth: 1, borderColor: colors.border }]} />
              <Text variant="caption" style={styles.colorName}>{c.name}</Text>
              <Text variant="caption" style={{ fontSize: 9 }}>{c.hex}</Text>
            </View>
          ))}
        </View>

        <Text variant="label" style={styles.subLabel}>TEXT HIERARCHY</Text>
        <View style={styles.colorRow}>
          {[
            { name: 'Primary', hex: '#F5EEF8', color: colors.text },
            { name: 'Muted', hex: '#B49CC8', color: colors.textMuted },
            { name: 'Dim', hex: '#7B6890', color: colors.textDim },
          ].map((c) => (
            <View key={c.name} style={styles.colorCard}>
              <View style={[styles.colorSwatch, { backgroundColor: c.color }]} />
              <Text variant="caption" style={styles.colorName}>{c.name}</Text>
              <Text variant="caption" style={{ fontSize: 9 }}>{c.hex}</Text>
            </View>
          ))}
        </View>

        <Text variant="label" style={styles.subLabel}>SEMANTIC</Text>
        <View style={styles.colorRow}>
          {[
            { name: 'Good', hex: '#4ADE80', color: colors.good },
            { name: 'Caution', hex: '#FB923C', color: colors.caution },
            { name: 'Alert', hex: '#F87171', color: colors.alert },
            { name: 'Info', hex: '#67E8F9', color: colors.info },
          ].map((c) => (
            <View key={c.name} style={styles.colorCard}>
              <View style={[styles.colorSwatch, { backgroundColor: c.color }]} />
              <Text variant="caption" style={styles.colorName}>{c.name}</Text>
              <Text variant="caption" style={{ fontSize: 9 }}>{c.hex}</Text>
            </View>
          ))}
        </View>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ GRADIENTS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>gradients</Text>
        <View style={styles.gradientGrid}>
          {([
            { name: 'Primary', sub: '#A855F7 → #EC4899', key: 'primary' as const },
            { name: 'Button / CTA', sub: '#C026D3 → #EC4899', key: 'button' as const },
            { name: 'Wide Spectrum', sub: '#A855F7 → #D946EF → #EC4899', key: 'wide' as const },
            { name: 'Soft Fade', sub: '#A855F7 → #F472B6 → #F9A8D4', key: 'soft' as const },
          ]).map((g) => (
            <LinearGradient
              key={g.key}
              colors={[...gradients[g.key].colors]}
              start={gradients[g.key].start}
              end={gradients[g.key].end}
              style={styles.gradientCard}
            >
              <Text variant="cardTitle" style={{ color: colors.white }}>{g.name}</Text>
              <Text variant="caption" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10 }}>{g.sub}</Text>
            </LinearGradient>
          ))}
        </View>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ TYPOGRAPHY ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>typography</Text>

        <Text variant="label">FREDOKA — DISPLAY FONT</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <Text variant="heroTitle" style={{ marginBottom: 12 }}>Hero Title 42px</Text>
          <Text variant="sectionTitle" style={{ marginBottom: 10 }}>Section Title 32px</Text>
          <Text variant="cardTitle" style={{ marginBottom: 10 }}>Card Title 17px</Text>
          <Text variant="buttonLabel" style={{ marginBottom: 10 }}>Button Label 15px</Text>
          <Text variant="label">LABEL — 11PX UPPERCASE TRACKED</Text>
        </Card>

        <Text variant="label">QUICKSAND — BODY FONT</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <Text variant="body" style={{ marginBottom: 10 }}>
            Body 15px — the quick brown fox jumps over the lazy dog. used for main readable content.
          </Text>
          <Text variant="bodySmall" style={{ marginBottom: 10 }}>
            Body Small 13px — secondary descriptions, details, and supporting text throughout the app.
          </Text>
          <Text variant="caption" style={{ marginBottom: 10 }}>
            Caption 11px — tiny labels, metadata, timestamps
          </Text>
          <Text variant="sectionSub">
            Section Sub 15px — used below section titles for context and descriptions.
          </Text>
        </Card>

        <Text variant="label">SCORE TYPOGRAPHY</Text>
        <Card style={{ alignItems: 'center' }}>
          <Text variant="scoreXL" style={{ marginBottom: 8 }}>8.4</Text>
          <Text variant="caption">scoreXL — 64px (share cards)</Text>
          <View style={{ height: 16 }} />
          <Text variant="scoreLG" style={{ marginBottom: 8 }}>8.4</Text>
          <Text variant="caption">scoreLG — 36px (in-app rings)</Text>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ SCORE RINGS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>score rings</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.lg }}>
          <ScoreRing score={9.2} size={100} label="Amazing" sublabel="Top 5%" />
          <ScoreRing score={7.1} size={100} label="Good" sublabel="Top 30%" />
          <ScoreRing score={4.3} size={100} label="Growing" sublabel="Improving" />
        </View>

        <Card style={{ alignItems: 'center' }}>
          <ScoreRing score={8.4} size={160} label="Your Glow Score" sublabel="skin · clarity · texture · symmetry" />
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ BUTTONS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>buttons</Text>

        <Text variant="label">VARIANTS</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <Button title="Start Glow Scan" style={styles.btnGap} />
          <Button title="View History" variant="secondary" style={styles.btnGap} />
          <Button title="Skip for now" variant="ghost" />
        </Card>

        <Text variant="label">SIZES</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <Button title="Large — Primary CTA" size="lg" style={styles.btnGap} />
          <Button title="Medium — Default" size="md" style={styles.btnGap} />
          <Button title="Small — Compact" size="sm" />
        </Card>

        <Text variant="label">BUTTON ROW</Text>
        <Card>
          <View style={styles.sizeRow}>
            <Button title="Cancel" variant="ghost" style={{ flex: 1 }} />
            <Button title="Continue" style={{ flex: 1 }} />
          </View>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ PROGRESS BARS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>progress bars</Text>

        <Text variant="label">GLOW SCORE BREAKDOWN</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <View style={{ gap: 14 }}>
            <ProgressBar label="Skin" value={8.7} />
            <ProgressBar label="Clarity" value={8.2} />
            <ProgressBar label="Texture" value={7.5} />
            <ProgressBar label="Symmetry" value={8.9} />
          </View>
        </Card>

        <Text variant="label">SEMANTIC COLORS</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <View style={{ gap: 14 }}>
            <ProgressBar label="Hydration" value={9.1} color="good" />
            <ProgressBar label="UV Damage" value={5.2} color="caution" />
            <ProgressBar label="Acne" value={3.1} color="alert" />
          </View>
        </Card>

        <Text variant="label">PERCENTAGE MODE</Text>
        <Card>
          <View style={{ gap: 14 }}>
            <ProgressBar label="Progress" value={72} maxValue={100} />
            <ProgressBar label="Upload" value={45} maxValue={100} color="good" />
          </View>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ TAGS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>tags</Text>
        <Card>
          <View style={styles.tagRow}>
            <Tag label="Glowing" variant="purple" />
            <Tag label="Trending Up" variant="pink" />
            <Tag label="Hydrated" variant="good" />
            <Tag label="Needs SPF" variant="caution" />
            <Tag label="Dry Skin" variant="alert" />
            <Tag label="New Tip" variant="info" />
            <Tag label="Premium" variant="purple" />
            <Tag label="Week 3" variant="pink" />
            <Tag label="Completed" variant="good" />
          </View>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ TOASTS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>toasts</Text>
        <View style={{ gap: 10 }}>
          <Toast message="Your glow score improved by 0.3 this week!" variant="good" />
          <Toast message="Don&apos;t forget your SPF — UV index is high today" variant="caution" />
          <Toast message="Scan failed — try better lighting" variant="alert" />
          <Toast message="New personalized skincare tip available" variant="info" />
        </View>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ CARDS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>cards</Text>

        <Text variant="label">DEFAULT CARD</Text>
        <Card style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <View style={styles.tipIcon}>
              <Ionicons name="bulb" size={18} color={colors.hotpink} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="cardTitle">Daily Tip</Text>
              <Text variant="bodySmall">Apply vitamin C serum before moisturizer for better absorption.</Text>
            </View>
          </View>
          <Tag label="Skincare" variant="pink" />
        </Card>

        <Text variant="label">ELEVATED CARD</Text>
        <Card variant="elevated" style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={[styles.tipIcon, { backgroundColor: 'rgba(74,222,128,0.1)' }]}>
              <Ionicons name="trending-up" size={18} color={colors.good} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="cardTitle">Score Trend</Text>
              <Text variant="bodySmall">Your skin clarity improved 12% this month</Text>
            </View>
            <Text variant="scoreLG" style={{ fontSize: 24 }}>+0.8</Text>
          </View>
        </Card>

        <Text variant="label">TIP CARD (GRADIENT BORDER)</Text>
        <LinearGradient
          colors={['rgba(236,72,153,0.2)', 'rgba(168,85,247,0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.tipCard}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
            <Ionicons name="sparkles" size={18} color={colors.hotpink} style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text variant="cardTitle" style={{ marginBottom: 4 }}>Pro Tip</Text>
              <Text variant="bodySmall">
                Consistent daily scans help track your skin&apos;s response to new products. Try scanning at the same time each day.
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ STREAK ROW ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>streak tracker</Text>
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Ionicons name="flame" size={22} color={colors.hotpink} />
            <Text variant="cardTitle">7-Day Streak</Text>
          </View>
          <View style={styles.streakRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <View key={i}>
                {i < 5 ? (
                  <LinearGradient
                    colors={[...gradients.primary.colors]}
                    start={gradients.primary.start}
                    end={gradients.primary.end}
                    style={styles.streakDot}
                  >
                    <Text variant="tagText" style={{ fontSize: 9 }}>{day}</Text>
                  </LinearGradient>
                ) : i === 5 ? (
                  <View style={[styles.streakDot, styles.streakToday]}>
                    <Text variant="tagText" style={{ fontSize: 9, color: colors.hotpink }}>{day}</Text>
                  </View>
                ) : (
                  <View style={[styles.streakDot, styles.streakFuture]}>
                    <Text variant="tagText" style={{ fontSize: 9, color: colors.textDim }}>{day}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ SHARE CARD ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>share card</Text>
        <Text variant="sectionSub" style={{ marginBottom: spacing.lg }}>
          the thing people screenshot on tiktok
        </Text>
        <View style={{ alignItems: 'center' }}>
          <LinearGradient
            colors={[...gradients.wide.colors]}
            start={gradients.wide.start}
            end={gradients.wide.end}
            style={[styles.shareCard, shadows.glow]}
          >
            <Text variant="label" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>MY GLOW SCORE</Text>
            <Text variant="scoreXL">8.4</Text>
            <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginVertical: 12 }}>
              skin 8.7 · clarity 8.2 · texture 8.0 · symmetry 8.5
            </Text>
            <View style={styles.shareCardDivider} />
            <Text variant="cardTitle" style={{ color: 'rgba(255,255,255,0.8)' }}>glowana</Text>
          </LinearGradient>
        </View>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ NAV BAR PREVIEW ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>tab bar</Text>
        <Card style={{ paddingVertical: 10, paddingHorizontal: 0 }}>
          <View style={styles.navBar}>
            {[
              { icon: 'home' as const, label: 'Home', active: false },
              { icon: 'scan' as const, label: 'Scan', active: true },
              { icon: 'time' as const, label: 'History', active: false },
              { icon: 'person' as const, label: 'Profile', active: false },
            ].map((tab) => (
              <View key={tab.label} style={styles.navItem}>
                <Ionicons
                  name={tab.icon}
                  size={22}
                  color={tab.active ? colors.hotpink : colors.textDim}
                />
                <Text
                  variant="caption"
                  style={{ fontSize: 9, color: tab.active ? colors.hotpink : colors.textDim }}
                >
                  {tab.label}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ ICONS ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>icon set</Text>
        <Text variant="sectionSub" style={{ marginBottom: spacing.lg }}>
          ionicons — every icon we&apos;ll use across the app, organized by feature area
        </Text>

        {Object.entries(iconSections).map(([section, icons]) => (
          <View key={section} style={{ marginBottom: spacing.xl }}>
            <Text variant="label">{section.toUpperCase()}</Text>
            <Card>
              <View style={styles.iconGrid}>
                {icons.map((icon) => (
                  <View key={icon.name} style={styles.iconCell}>
                    <View style={styles.iconCircle}>
                      <Ionicons name={icon.name} size={22} color={colors.purple} />
                    </View>
                    <Text variant="caption" style={{ fontSize: 9, textAlign: 'center' }}>{icon.label}</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        ))}

        <Text variant="label">ICON COLORS</Text>
        <Card>
          <View style={styles.iconGrid}>
            {[
              { color: colors.purple, label: 'Purple' },
              { color: colors.hotpink, label: 'Pink' },
              { color: colors.text, label: 'Text' },
              { color: colors.textMuted, label: 'Muted' },
              { color: colors.textDim, label: 'Dim' },
              { color: colors.good, label: 'Good' },
              { color: colors.caution, label: 'Caution' },
              { color: colors.alert, label: 'Alert' },
              { color: colors.info, label: 'Info' },
            ].map((c) => (
              <View key={c.label} style={styles.iconCell}>
                <View style={styles.iconCircle}>
                  <Ionicons name="sparkles" size={22} color={c.color} />
                </View>
                <Text variant="caption" style={{ fontSize: 9, textAlign: 'center' }}>{c.label}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ SPACING & RADII ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>spacing</Text>
        <Card>
          {[
            { label: 'xs — 4', size: 4 },
            { label: 'sm — 8', size: 8 },
            { label: 'md — 14', size: 14 },
            { label: 'lg — 20', size: 20 },
            { label: 'xl — 28', size: 28 },
            { label: '2xl — 36', size: 36 },
          ].map((s) => (
            <View key={s.label} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text variant="caption" style={{ width: 80 }}>{s.label}</Text>
              <LinearGradient
                colors={[...gradients.primary.colors]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 8, width: s.size * 4, borderRadius: 4 }}
              />
            </View>
          ))}
        </Card>
      </View>

      <Divider style={styles.sectionGap} />

      {/* ═══════════ BORDER RADII ═══════════ */}
      <View style={styles.section}>
        <Text variant="sectionTitle" style={styles.sectionHeader}>border radii</Text>
        <Card>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            {[
              { label: 'sm 8', r: 8 },
              { label: 'md 14', r: 14 },
              { label: 'lg 18', r: 18 },
              { label: 'xl 22', r: 22 },
              { label: '2xl 30', r: 30 },
              { label: 'pill', r: 100 },
            ].map((item) => (
              <View key={item.label} style={{ alignItems: 'center' }}>
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: item.r,
                    borderWidth: 2,
                    borderColor: colors.purple,
                    backgroundColor: 'rgba(168,85,247,0.08)',
                  }}
                />
                <Text variant="caption" style={{ fontSize: 9, marginTop: 4 }}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Card>
      </View>

      <View style={{ height: spacing['5xl'] }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  section: {
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionGap: {
    marginVertical: spacing.sm,
  },
  subLabel: {
    marginTop: spacing.xl,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  colorCard: {
    alignItems: 'center',
    width: 62,
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 14,
    marginBottom: 6,
  },
  colorName: {
    fontSize: 9,
    textAlign: 'center',
  },
  gradientGrid: {
    gap: 12,
    marginTop: spacing.sm,
  },
  gradientCard: {
    height: 80,
    borderRadius: 18,
    justifyContent: 'flex-end',
    padding: 16,
  },
  btnGap: {
    marginBottom: 10,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(236,72,153,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipCard: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(236,72,153,0.15)',
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },
  streakDot: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakToday: {
    borderWidth: 2,
    borderColor: colors.hotpink,
  },
  streakFuture: {
    backgroundColor: colors.surface,
  },
  shareCard: {
    width: 280,
    borderRadius: 24,
    padding: 36,
    alignItems: 'center',
  },
  shareCardDivider: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
    marginBottom: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 6,
  },
  navItem: {
    alignItems: 'center',
    gap: 3,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconCell: {
    alignItems: 'center',
    width: 56,
    gap: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(168,85,247,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
