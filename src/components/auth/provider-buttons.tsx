import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import AppleIcon from '../../../assets/figma/apple.svg';
import GoogleIcon from '../../../assets/figma/google.svg';
import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';

function ProviderButton({
  label,
  children,
  borderColor,
}: {
  label: string;
  children: ReactNode;
  borderColor: string;
}) {
  const responsive = useResponsiveMetrics();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${label}`}
      onPress={() => Alert.alert(`${label} sign-in`, 'Social sign-in will be connected here.')}
      style={[
        styles.providerButton,
        {
          width: responsive.dimension(52),
          height: responsive.dimension(48),
          borderRadius: responsive.dimension(12),
          borderColor,
        },
      ]}
    >
      {children}
    </Pressable>
  );
}

export function ProviderButtons({ variant = 'default' }: { variant?: 'default' | 'registration' }) {
  const responsive = useResponsiveMetrics();
  const lineColor = variant === 'registration' ? '#BBB797' : colors.divider;

  return (
    <View style={[styles.container, { gap: responsive.dimension(14) }]}>
      <View style={[styles.separator, { gap: responsive.dimension(12) }]}>
        <View style={[styles.divider, { backgroundColor: lineColor }]} />
        <Text style={[styles.separatorText, { fontSize: responsive.fontSize(11) }]}>or continue with</Text>
        <View style={[styles.divider, { backgroundColor: lineColor }]} />
      </View>
      <View style={[styles.providers, { gap: responsive.dimension(16) }]}>
        <ProviderButton label="Google" borderColor={lineColor}>
          <GoogleIcon />
        </ProviderButton>
        <ProviderButton label="Apple" borderColor={lineColor}>
          <AppleIcon />
        </ProviderButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  separator: { width: '100%', flexDirection: 'row', alignItems: 'center' },
  divider: { flex: 1, height: 1, backgroundColor: colors.divider },
  separatorText: { color: colors.muted, fontSize: 11, fontFamily: fonts.regular },
  providers: { flexDirection: 'row' },
  providerButton: {
    borderWidth: 1,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
