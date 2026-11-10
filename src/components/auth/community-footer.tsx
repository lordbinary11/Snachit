import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';

const tileColors = [colors.coral, colors.divider, colors.coral, colors.divider, colors.coral];

export function CommunityFooter() {
  const responsive = useResponsiveMetrics();

  return (
    <View style={[styles.container, { gap: responsive.dimension(12) }]}>
      <View style={[styles.signature, { gap: responsive.dimension(4) }]}>
        {tileColors.map((color, index) => (
          <View
            key={index}
            style={[
              styles.tile,
              {
                width: responsive.dimension(7),
                height: responsive.dimension(7),
                borderRadius: responsive.dimension(1),
                backgroundColor: color,
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.caption, { fontSize: responsive.fontSize(11) }]}>Play fair. Be kind. Come back for another.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  signature: { flexDirection: 'row' },
  tile: {},
  caption: { color: colors.muted, fontFamily: fonts.regular },
});
