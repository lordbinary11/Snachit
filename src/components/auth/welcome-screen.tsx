import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import AppleIcon from '../../../assets/figma/apple.svg';
import GoogleIcon from '../../../assets/figma/google.svg';
import ChessPiece from '../../../assets/figma/welcome-chess-piece.svg';
import ChessPiece1 from '../../../assets/figma/welcome-chess-piece-1.svg';
import ChessPiece2 from '../../../assets/figma/welcome-chess-piece-2.svg';
import ChessPiece3 from '../../../assets/figma/welcome-chess-piece-3.svg';
import ChessPiece4 from '../../../assets/figma/welcome-chess-piece-4.svg';
import ChessPiece5 from '../../../assets/figma/welcome-chess-piece-5.svg';
import ChessPiece6 from '../../../assets/figma/welcome-chess-piece-6.svg';
import ChessSquare from '../../../assets/figma/welcome-square.svg';
import ChessSquare1 from '../../../assets/figma/welcome-square-1.svg';
import ChessSquare2 from '../../../assets/figma/welcome-square-2.svg';
import ChessSquare3 from '../../../assets/figma/welcome-square-3.svg';
import ChessSquare4 from '../../../assets/figma/welcome-square-4.svg';
import ChessSquare5 from '../../../assets/figma/welcome-square-5.svg';
import ChessSquare6 from '../../../assets/figma/welcome-square-6.svg';
import ChessSquare7 from '../../../assets/figma/welcome-square-7.svg';
import ChessSquare8 from '../../../assets/figma/welcome-square-8.svg';
import ChessSquare9 from '../../../assets/figma/welcome-square-9.svg';
import ChessSquare10 from '../../../assets/figma/welcome-square-10.svg';
import ChessSquare11 from '../../../assets/figma/welcome-square-11.svg';
import ChessSquare12 from '../../../assets/figma/welcome-square-12.svg';
import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';
import { HomeIndicator, SafeAreaTopSpacer } from './status-bar';

export function WelcomeScreen() {
  const responsive = useResponsiveMetrics();
  return <View style={[styles.screen, { width: responsive.contentWidth }]}>
    <SafeAreaTopSpacer />
    <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: responsive.inset }]} showsVerticalScrollIndicator={false}>
      <Image source={require('../../../assets/figma/snachit-mascot.png')} resizeMode="contain" style={[styles.logo, { width: responsive.dimension(179), height: responsive.dimension(124), marginTop: -responsive.dimension(28) }]} />
      <WelcomeArt />
      <Text style={[styles.kicker, { fontSize: responsive.fontSize(10), marginTop: responsive.dimension(20) }]}>WELCOME TO THE CLUBHOUSE</Text>
      <Text style={[styles.description, { fontSize: responsive.fontSize(14), lineHeight: responsive.dimension(21), marginTop: responsive.dimension(14) }]}>Challenge your friends, find your people, and make your next move on Snachit.</Text>
      <Pressable onPress={() => router.push('/(auth)/create-account')} style={[styles.primary, { height: responsive.dimension(48), borderRadius: responsive.dimension(11), marginTop: responsive.dimension(20) }]}><Text style={styles.primaryText}>Create an account</Text></Pressable>
      <Pressable onPress={() => router.push('/(auth)/sign-in')} style={[styles.secondary, { height: responsive.dimension(48), borderRadius: responsive.dimension(11), marginTop: responsive.dimension(10) }]}><Text style={styles.secondaryText}>I already have an account</Text></Pressable>
      <Text style={styles.continue}>or continue with</Text>
      <View style={styles.socials}><SocialButton label="Google"><GoogleIcon /></SocialButton><SocialButton label="Apple"><AppleIcon /></SocialButton></View>
      <Text style={[styles.terms, { marginTop: responsive.dimension(22) }]}>By joining, you agree to our Terms of Service{ '\n' }and Privacy Policy. Play fair. Be kind.</Text>
    </ScrollView>
    <HomeIndicator />
  </View>;
}

function WelcomeArt() {
  return <View style={styles.art}>
    <View style={styles.boardPreview}>
      <View style={styles.board}>{welcomeBoard.map((rank, rankIndex) => <View key={rankIndex} style={styles.boardRank}>{rank.map((square, fileIndex) => <BoardSquare key={`${rankIndex}-${fileIndex}`} {...square} />)}</View>)}</View>
    </View>
    <View style={styles.ready}><Image source={require('../../../assets/figma/welcome-leo.png')} style={styles.readyAvatar} /><Text style={styles.readyText}>Leo is ready to play</Text></View>
    <View style={styles.rival}><Image source={require('../../../assets/figma/welcome-rival.png')} style={styles.readyAvatar} /><Text style={styles.readyText}>A little friendly rivalry.</Text><Text style={styles.heart}>♡</Text></View>
  </View>;
}

const squareArtwork = [ChessSquare, ChessSquare1, ChessSquare2, ChessSquare3, ChessSquare4, ChessSquare5, ChessSquare6, ChessSquare7, ChessSquare8, ChessSquare9, ChessSquare10, ChessSquare11, ChessSquare12];
const pieceArtwork = [ChessPiece, ChessPiece1, ChessPiece2, ChessPiece3, ChessPiece4, ChessPiece5, ChessPiece6];
type BoardSquareProps = { fill?: string; squareAsset?: number; piece?: number; rankLabel?: string; fileLabel?: string };

const welcomeBoard: BoardSquareProps[][] = [
  [{ fill: '#F0F1F4', piece: 0, rankLabel: '8' }, { fill: '#AEBAD2' }, { squareAsset: 0 }, { squareAsset: 1 }, { squareAsset: 2 }, { squareAsset: 3 }, { fill: '#F0F1F4' }, { squareAsset: 4 }],
  [{ fill: '#AEBAD2', piece: 1, rankLabel: '7' }, { squareAsset: 5 }, { squareAsset: 6 }, { squareAsset: 5 }, { fill: '#AEBAD2' }, { squareAsset: 5 }, { squareAsset: 6 }, { squareAsset: 5 }],
  [{ fill: '#F0F1F4', rankLabel: '6' }, { fill: '#AEBAD2' }, { squareAsset: 7 }, { fill: '#AEBAD2' }, { fill: '#F0F1F4' }, { squareAsset: 8 }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }],
  [{ fill: '#AEBAD2', rankLabel: '5' }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }, { fill: '#F0F1F4' }, { squareAsset: 6 }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }, { squareAsset: 9 }],
  [{ fill: '#F0F1F4', rankLabel: '4' }, { fill: '#AEBAD2' }, { squareAsset: 10 }, { fill: '#AEBAD2' }, { squareAsset: 11 }, { fill: '#AEBAD2' }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }],
  [{ fill: '#AEBAD2', rankLabel: '3' }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }, { fill: '#F0F1F4' }, { fill: '#AEBAD2' }, { fill: '#F0F1F4' }],
  [{ fill: '#F0F1F4', piece: 2, rankLabel: '2' }, { squareAsset: 12 }, { squareAsset: 11 }, { squareAsset: 12 }, { fill: '#F0F1F4' }, { squareAsset: 12 }, { squareAsset: 11 }, { squareAsset: 12 }],
  [{ fill: '#AEBAD2', piece: 3, rankLabel: '1', fileLabel: 'a' }, { fill: '#F0F1F4', piece: 4, fileLabel: 'b' }, { fill: '#AEBAD2', piece: 5, fileLabel: 'c' }, { fill: '#F0F1F4', fileLabel: 'd' }, { fill: '#AEBAD2', piece: 6, fileLabel: 'e' }, { fill: '#F0F1F4', fileLabel: 'f' }, { fill: '#AEBAD2', piece: 4, fileLabel: 'g' }, { fill: '#F0F1F4', piece: 3, fileLabel: 'h' }],
];

function BoardSquare({ fill, squareAsset, piece, rankLabel, fileLabel }: BoardSquareProps) {
  const Tile = squareAsset === undefined ? null : squareArtwork[squareAsset];
  const Piece = piece === undefined ? null : pieceArtwork[piece];
  return <View style={[styles.boardSquare, fill ? { backgroundColor: fill } : null]}>
    {Tile ? <Tile /> : null}
    {rankLabel ? <Text style={styles.rankCoordinate}>{rankLabel}</Text> : null}
    {fileLabel ? <Text style={styles.fileCoordinate}>{fileLabel}</Text> : null}
    {Piece ? <View style={styles.pieceHolder}><Piece /></View> : null}
  </View>;
}

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  const responsive = useResponsiveMetrics();
  return <Pressable accessibilityRole="button" accessibilityLabel={`Continue with ${label}`} onPress={() => Alert.alert(`${label} sign-in`, 'Social sign-in will be connected here.')} style={[styles.socialButton, { width: responsive.dimension(48), height: responsive.dimension(48), borderRadius: responsive.dimension(12) }]}>{children}</Pressable>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignSelf: 'center', backgroundColor: colors.background },
  content: { flexGrow: 1, paddingBottom: 18 },
  logo: { alignSelf: 'center', marginBottom: 2 },
  art: { height: 310, backgroundColor: '#E6F2EE', borderRadius: 18, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  boardPreview: { width: 238.337, height: 238.337, alignItems: 'center', justifyContent: 'center' },
  board: { width: 220, height: 220, transform: [{ rotate: '-5deg' }], overflow: 'hidden', borderRadius: 4 },
  boardRank: { height: 27.5, width: 220, flexDirection: 'row' },
  boardSquare: { width: 27.5, height: 27.5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  pieceHolder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  rankCoordinate: { position: 'absolute', left: 2, top: 1, color: colors.ink, fontFamily: fonts.regular, fontSize: 7, zIndex: 2 },
  fileCoordinate: { position: 'absolute', right: 2, bottom: 1, color: colors.ink, fontFamily: fonts.regular, fontSize: 7, zIndex: 2 },
  ready: { position: 'absolute', left: 14, top: 16, flexDirection: 'row', alignItems: 'center', gap: 7, height: 42, paddingHorizontal: 8, backgroundColor: '#fff', borderRadius: 12 },
  readyAvatar: { width: 30, height: 30, borderRadius: 15 },
  readyText: { color: colors.ink, fontFamily: fonts.semibold, fontSize: 11 },
  rival: { position: 'absolute', bottom: 18, right: 14, flexDirection: 'row', alignItems: 'center', gap: 7, height: 46, paddingHorizontal: 9, backgroundColor: '#fff', borderRadius: 12 },
  heart: { color: colors.coral, fontSize: 21 },
  kicker: { color: colors.coral, fontFamily: fonts.bold },
  description: { color: colors.muted, fontFamily: fonts.regular },
  primary: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coral },
  primaryText: { color: '#fff', fontFamily: fonts.semibold, fontSize: 14 },
  secondary: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.field },
  secondaryText: { color: colors.ink, fontFamily: fonts.semibold, fontSize: 14 },
  continue: { color: colors.muted, textAlign: 'center', fontFamily: fonts.semibold, fontSize: 11, marginTop: 20, marginBottom: 12 },
  socials: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  socialButton: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.divider },
  terms: { color: colors.muted, textAlign: 'center', fontFamily: fonts.regular, fontSize: 10, lineHeight: 15 },
});
