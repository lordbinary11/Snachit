import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import ArrowLeftIcon from '../../../assets/figma/arrow-left.svg';
import { colors } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';

export function SignInHeader() {
  const responsive = useResponsiveMetrics();

  return (
    <View style={[styles.container, { height: responsive.dimension(68), paddingHorizontal: responsive.inset }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={() => {
          if (router.canGoBack()) router.back();
        }}
        style={[styles.backButton, { width: responsive.dimension(36), height: responsive.dimension(44) }]}
      >
        <ArrowLeftIcon />
      </Pressable>
      <View pointerEvents="none" style={[styles.logoCenter, { top: -responsive.dimension(28) }]}>
        <Image
          accessibilityLabel="Snachit"
          source={require('../../../assets/figma/snachit-mascot.png')}
          resizeMode="contain"
          style={{ width: responsive.dimension(179), height: responsive.dimension(124) }}
        />
      </View>
      <View style={styles.balance} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  backButton: { justifyContent: 'center' },
  logoCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  balance: { width: 36, height: 1 },
});
