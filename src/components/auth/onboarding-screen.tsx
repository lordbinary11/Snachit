import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

import BarricadePath from '../../../assets/figma/onboarding-barricade-path.svg';
import ChessKeepsake from '../../../assets/figma/onboarding-chess-keepsake.svg';
import KnightKeepsake from '../../../assets/figma/onboarding-knight-keepsake.svg';
import ArrowDown from '../../../assets/figma/onboarding-arrow-down.svg';
import ChevronRight from '../../../assets/figma/onboarding-chevron-right.svg';
import CrownChampion from '../../../assets/figma/onboarding-crown-champion.svg';
import CrownHeader from '../../../assets/figma/onboarding-crown-header.svg';
import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';
import { HomeIndicator, SafeAreaTopSpacer } from './status-bar';

const pages = [
  { title: 'Find your people', description: 'Follow friends, share stories and meet people through games. Every connection starts with a request.' },
  { title: 'Make your next move', description: 'Invite a friend to Chess or Barricade. A friendly challenge is a good excuse to spend time together.' },
  { title: 'Earn your place', description: 'Win the Open to qualify. Then face the reigning holder in a separate crown final to claim the crown.' },
];

const goWelcome = () => router.replace('/(auth)/welcome');

export function OnboardingScreen() {
  const responsive = useResponsiveMetrics();
  const { height: viewportHeight } = useWindowDimensions();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const direction = useRef(1);
  const [contentOpacity] = useState(() => new Animated.Value(1));
  const [contentOffset] = useState(() => new Animated.Value(0));
  const page = pages[step - 1];
  const last = step === 3;
  const artHeight = Math.min(responsive.dimension(388), viewportHeight * 0.46);

  useEffect(() => {
    contentOpacity.setValue(0);
    contentOffset.setValue(direction.current * 14);
    Animated.parallel([
      Animated.timing(contentOpacity, { toValue: 1, duration: 210, useNativeDriver: true }),
      Animated.timing(contentOffset, { toValue: 0, duration: 210, useNativeDriver: true }),
    ]).start();
  }, [contentOffset, contentOpacity, step]);

  const advance = () => {
    if (last) return goWelcome();
    direction.current = 1;
    setStep((current) => (current + 1) as 2 | 3);
  };
  const goBack = () => {
    if (step === 1) return;
    direction.current = -1;
    setStep((current) => (current - 1) as 1 | 2);
  };

  return (
    <View style={[styles.screen, { width: responsive.contentWidth }]}>
      <SafeAreaTopSpacer />
      <View style={[styles.navigation, { paddingHorizontal: responsive.inset, height: responsive.dimension(68) }]}>
        <Image source={require('../../../assets/figma/snachit-mascot.png')} resizeMode="contain" style={{ width: responsive.dimension(179), height: responsive.dimension(124), marginTop: -responsive.dimension(28) }} />
        {step === 1 ? <Pressable onPress={goWelcome} style={styles.skip}><Text style={[styles.skipText, { fontSize: responsive.fontSize(14) }]}>Skip</Text></Pressable> : <View style={{ width: responsive.dimension(72), height: responsive.dimension(44) }} />}
      </View>
      <Animated.View style={[styles.content, { opacity: contentOpacity, transform: [{ translateX: contentOffset }] }]}>
        <View style={[styles.art, { marginHorizontal: responsive.inset, height: artHeight, borderRadius: responsive.dimension(18) }]}>
          <View pointerEvents={step === 1 ? 'auto' : 'none'} style={[styles.artLayer, { opacity: step === 1 ? 1 : 0 }]}><PeopleArt /></View>
          <View pointerEvents={step === 2 ? 'auto' : 'none'} style={[styles.artLayer, { opacity: step === 2 ? 1 : 0 }]}><MoveArt /></View>
          <View pointerEvents={step === 3 ? 'auto' : 'none'} style={[styles.artLayer, { opacity: step === 3 ? 1 : 0 }]}><CrownArt /></View>
        </View>
        <View style={[styles.copy, { paddingHorizontal: responsive.inset, paddingTop: responsive.dimension(22) }]}>
          <View style={styles.progress}>{pages.map((_, index) => <View key={index} style={[styles.progressDot, { width: index + 1 === step ? responsive.dimension(30) : responsive.dimension(8), backgroundColor: index + 1 === step ? colors.coral : colors.divider }]} />)}</View>
          <Text style={[styles.title, { fontSize: responsive.fontSize(27), lineHeight: responsive.dimension(34) }]}>{page.title}</Text>
          <Text style={[styles.description, { fontSize: responsive.fontSize(14), lineHeight: responsive.dimension(21), marginTop: responsive.dimension(9) }]}>{page.description}</Text>
          {last && <Text style={[styles.note, { fontSize: responsive.fontSize(12), marginTop: responsive.dimension(12) }]}>A draw leaves the crown with the holder.</Text>}
        </View>
      </Animated.View>
      <View style={[styles.actions, { paddingHorizontal: responsive.inset, paddingBottom: responsive.dimension(8), gap: responsive.dimension(12) }]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back to previous onboarding screen" disabled={step === 1} onPress={goBack} style={[styles.backButton, { height: responsive.dimension(48), width: responsive.dimension(72), borderRadius: responsive.dimension(10), opacity: step === 1 ? 0 : 1 }]}><Text style={styles.backText}>Back</Text></Pressable>
        <Pressable onPress={advance} style={[styles.primary, { height: responsive.dimension(48), borderRadius: responsive.dimension(12) }]}><Text style={[styles.primaryText, { fontSize: responsive.fontSize(14) }]}>{last ? 'Get started' : 'Next  →'}</Text></Pressable>
      </View>
      <Text style={[styles.footer, { fontSize: responsive.fontSize(10), marginBottom: responsive.dimension(5) }]}>{last ? 'Next: welcome to Snachit · Create an account or sign in' : 'Good games. Better company.'}</Text>
      <HomeIndicator />
    </View>
  );
}

function PeopleArt() {
  return <View style={styles.peopleArt}>
    <Text style={[styles.artKicker, styles.peopleKicker]}>A GAME IS JUST THE BEGINNING</Text>
    <View style={[styles.profileCard, styles.cardLeft]}><Image source={require('../../../assets/figma/onboarding-maya.png')} style={styles.maya} /><Text style={styles.name}>Maya</Text><Text style={styles.caption}>One more game?</Text></View>
    <View style={[styles.profileCard, styles.cardRight]}><Image source={require('../../../assets/figma/onboarding-nina.png')} style={styles.nina} /><Text style={styles.nameItalic}>Nina</Text><Text style={styles.caption}>Game-night stories</Text></View>
    <View style={styles.heart}><Text style={{ color: '#fff', fontSize: 21 }}>♡</Text></View>
    <View style={styles.request}><Image source={require('../../../assets/figma/onboarding-sofia.png')} style={styles.avatar} /><View style={{ flex: 1 }}><Text style={styles.requestTitle}>Sofia wants to connect</Text><Text style={styles.caption}>Met over a friendly game</Text></View><Text style={styles.add}>＋</Text></View>
  </View>;
}

function MoveArt() {
  return <View style={styles.moveArt}>
    <Text style={[styles.artKicker, styles.moveKicker]}>YOUR NEXT MOVE IS AN INVITATION</Text>
    <View style={styles.knightKeepsake}><KnightKeepsake /></View>
    <View style={styles.chessKeepsake}><ChessKeepsake /></View>
    <View style={styles.barricadeKeepsake}><BarricadePath /></View>
    <View style={styles.gameCard}>
      <View style={styles.gameHead}>
        <Image source={require('../../../assets/figma/onboarding-game.png')} style={styles.gameAvatar} />
        <View style={{ flex: 1 }}><Text style={styles.gameTitle}>Got time for a game?</Text><Text style={styles.caption}>Nina · A little friendly rivalry.</Text></View>
      </View>
      <View style={styles.ticketDivider} />
      <View style={styles.gameRow}><View style={{ flex: 1 }}><Text style={styles.requestTitle}>Chess</Text><Text style={styles.caption}>A classic. One move ahead.</Text></View><View style={styles.invite}><Text style={styles.inviteText}>Invite</Text></View></View>
      <View style={styles.gameRow}><View style={{ flex: 1 }}><Text style={styles.requestTitle}>Barricade</Text><Text style={styles.caption}>Find your path. Block theirs.</Text></View><View style={styles.invite}><Text style={styles.inviteText}>Invite</Text></View></View>
    </View>
  </View>;
}

function CrownArt() {
  return (
    <View style={styles.crownArt}>
      <Text style={[styles.artKicker, styles.crownKicker]}>ONE CROWN. TWO STAGES.</Text>
      <View style={styles.openTicket}>
        <View style={styles.stageMarker}><Text style={styles.stageOne}>1</Text></View>
        <View style={styles.qualificationCopy}>
          <Text style={styles.redSmall}>THE OPEN</Text>
          <Text style={styles.tournamentTitle}>Win to qualify</Text>
          <Text style={styles.caption}>Your ticket to the crown final.</Text>
        </View>
      </View>
      <View style={styles.handoff}>
        <ArrowDown />
        <Text style={styles.handoffText}>QUALIFIED · A SEPARATE MATCH</Text>
      </View>
      <View style={styles.finalCard}>
        <View style={styles.finalHeader}>
          <Text style={styles.finalStage}>2</Text>
          <Text style={styles.finalTitle}>THE CROWN FINAL</Text>
          <View style={styles.headerCrown}><CrownHeader /></View>
        </View>
        <View style={styles.championRow}>
          <View style={styles.championEmblem}><CrownChampion /></View>
          <View style={styles.championCopy}>
            <Text style={styles.championName}>The Weekly Mind</Text>
            <Text style={styles.championMeta}>Chess · Held by Leo Martins</Text>
          </View>
          <ChevronRight />
        </View>
        <Text style={styles.finalFoot}>Beat the reigning holder to claim it.</Text>
        <View style={styles.boardTrim}>
          {Array.from({ length: 30 }, (_, index) => <View key={index} style={[styles.boardTile, { backgroundColor: index % 2 === 0 ? '#E6BC59' : colors.surface }]} />)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignSelf: 'center', backgroundColor: colors.background },
  navigation: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' },
  skip: { width: 72, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coral, borderRadius: 8 },
  skipText: { color: '#fff', fontFamily: fonts.semibold },
  content: { flex: 1 },
  art: { backgroundColor: '#E6F2EE', overflow: 'hidden', justifyContent: 'center' },
  artLayer: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  copy: { flex: 1 },
  progress: { flexDirection: 'row', gap: 6, marginTop: 21, marginBottom: 12 },
  progressDot: { height: 4, borderRadius: 3 },
  title: { color: colors.ink, fontFamily: 'Georgia', fontStyle: 'italic' },
  description: { color: colors.muted, fontFamily: fonts.regular },
  note: { color: colors.ink, fontFamily: fonts.regular },
  actions: { flexDirection: 'row' },
  primary: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coral },
  primaryText: { color: '#fff', fontFamily: fonts.semibold },
  backButton: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.field },
  backText: { color: colors.muted, fontFamily: fonts.semibold, fontSize: 14 },
  footer: { color: colors.muted, textAlign: 'center', fontFamily: fonts.regular },
  peopleArt: { flex: 1, position: 'relative', margin: 22, marginTop: 26 },
  profileCard: { position: 'absolute', alignItems: 'center', width: 118, height: 166, backgroundColor: colors.surface, padding: 10, borderRadius: 14 },
  cardLeft: { top: 24, left: 0, transform: [{ rotate: '-6deg' }] },
  cardRight: { top: 39, right: 10, height: 174, width: 132, transform: [{ rotate: '6deg' }] },
  maya: { width: 94, height: 94, borderRadius: 48, borderWidth: 2, borderColor: colors.coral },
  nina: { width: 102, height: 102, borderRadius: 52 },
  name: { marginTop: 6, color: colors.ink, fontFamily: fonts.semibold, fontSize: 13 },
  nameItalic: { marginTop: 4, color: colors.ink, fontFamily: 'Georgia', fontStyle: 'italic', fontSize: 16 },
  caption: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, marginTop: 4 },
  heart: { position: 'absolute', top: 35, left: '48%', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coral, borderRadius: 20 },
  request: { position: 'absolute', bottom: 5, left: 0, right: 0, height: 76, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, backgroundColor: colors.surface, borderRadius: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20 },
  requestTitle: { color: colors.ink, fontFamily: fonts.semibold, fontSize: 12 },
  add: { color: colors.coral, fontSize: 24 },
  artKicker: { position: 'absolute', left: 20, top: 20, zIndex: 2, color: colors.coral, fontFamily: fonts.bold, fontSize: 10 },
  peopleKicker: { top: -6 },
  moveArt: { flex: 1, position: 'relative' },
  moveKicker: {},
  knightKeepsake: { position: 'absolute', left: 88, top: 110 },
  chessKeepsake: { position: 'absolute', left: 30, top: 38, transform: [{ rotate: '-7deg' }] },
  barricadeKeepsake: { position: 'absolute', left: 180, top: 64, transform: [{ rotate: '7deg' }] },
  gameCard: { position: 'absolute', top: 200, left: 20, width: 302, padding: 10, gap: 5, backgroundColor: colors.surface, borderRadius: 14, zIndex: 1 },
  gameHead: { height: 32, flexDirection: 'row', alignItems: 'center', gap: 9 },
  gameAvatar: { width: 32, height: 32, borderRadius: 16 },
  ticketDivider: { height: 1, width: '100%', backgroundColor: colors.divider },
  gameTitle: { color: colors.ink, fontFamily: 'Georgia', fontStyle: 'italic', fontSize: 17 },
  gameRow: { height: 52, flexDirection: 'row', alignItems: 'center', gap: 14 },
  invite: { backgroundColor: colors.coral, borderRadius: 9, paddingHorizontal: 15, paddingVertical: 9 },
  inviteText: { color: '#fff', fontFamily: fonts.semibold, fontSize: 12 },
  crownArt: { flex: 1, position: 'relative' },
  crownKicker: { left: 20, top: 20 },
  openTicket: { position: 'absolute', left: 20, right: 20, top: 44, height: 94, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden' },
  stageMarker: { width: 38, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6F2EE', borderRadius: 6 },
  stageOne: { color: colors.coral, fontFamily: 'Georgia', fontSize: 24 },
  qualificationCopy: { flex: 1, gap: 5 },
  redSmall: { color: colors.coral, fontFamily: fonts.bold, fontSize: 10 },
  tournamentTitle: { color: colors.ink, fontSize: 18, fontFamily: 'Georgia' },
  handoff: { position: 'absolute', left: 20, right: 20, top: 150, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  handoffText: { color: colors.coral, fontFamily: fonts.semibold, fontSize: 10 },
  finalCard: { position: 'absolute', top: 182, left: 20, right: 20, height: 151, backgroundColor: colors.surface, borderRadius: 12, overflow: 'hidden' },
  finalHeader: { height: 41, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, backgroundColor: '#F6E9BD' },
  finalStage: { color: colors.ink, fontSize: 18, fontFamily: fonts.semibold },
  finalTitle: { color: colors.ink, fontSize: 10, fontFamily: fonts.bold },
  headerCrown: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  championRow: { position: 'absolute', top: 41, left: 0, right: 0, height: 72, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  championEmblem: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF5F1', borderRadius: 8 },
  championCopy: { flex: 1, gap: 3 },
  championName: { color: '#23262F', fontFamily: 'Georgia', fontSize: 16 },
  championMeta: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11 },
  finalFoot: { position: 'absolute', top: 113, left: 0, right: 0, color: colors.ink, textAlign: 'center', fontFamily: fonts.semibold, fontSize: 12 },
  boardTrim: { position: 'absolute', left: 3, right: -3, top: 139, height: 8, flexDirection: 'row', overflow: 'hidden' },
  boardTile: { width: 10.067, height: 8, flexShrink: 0 },
});
