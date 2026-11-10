import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useResponsiveMetrics } from '@/utils/responsive';

export function SplashScreen() {
  const responsive = useResponsiveMetrics();

  useEffect(() => {
    const timer = setTimeout(() => router.replace('/(auth)/onboarding'), 4800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Continue to Snachit" onPress={() => router.replace('/(auth)/onboarding')} style={styles.screen}>
      <StatusBar hidden={false} style="light" />
      <Image
        accessibilityLabel="Snachit"
        source={require('../../../assets/UI/snachit-splash-logo.png')}
        resizeMode="contain"
        style={{ width: responsive.dimension(314), height: responsive.dimension(236), marginTop: -responsive.dimension(24) }}
      />
      <View style={[styles.homeArea, { height: responsive.dimension(34), paddingBottom: responsive.dimension(8), bottom: 0 }]}>
        <View style={styles.homeIndicator} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FC3844' },
  homeArea: { position: 'absolute', left: 0, right: 0, alignItems: 'center', justifyContent: 'flex-end' },
  homeIndicator: { width: 124, height: 4, borderRadius: 4, backgroundColor: '#FFFFFF' },
});
