import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';

export function SafeAreaTopSpacer() {
  const { top } = useSafeAreaInsets();
  return <View pointerEvents="none" style={{ height: top }} />;
}

export function HomeIndicator() {
  const responsive = useResponsiveMetrics();

  return (
    <View style={[styles.homeArea, { height: responsive.dimension(34), paddingBottom: responsive.dimension(8) }]}>
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeArea: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.background,
  },
  homeIndicator: {
    width: 124,
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.ink,
  },
});
