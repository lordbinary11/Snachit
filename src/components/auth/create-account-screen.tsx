import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';
import { FormField } from './form-field';
import { ProviderButtons } from './provider-buttons';
import { SignInHeader } from './sign-in-header';
import { HomeIndicator, SafeAreaTopSpacer } from './status-bar';

export function CreateAccountScreen() {
  const responsive = useResponsiveMetrics();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password) return Alert.alert('Complete your details', 'Enter your name, username, email and password to continue.');
    Alert.alert('Account ready', 'Your account creation will be connected here.');
  };

  return <View style={[styles.screen, { width: responsive.contentWidth }]}>
    <SafeAreaTopSpacer />
    <SignInHeader />
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
      <ScrollView contentContainerStyle={[styles.content, { paddingHorizontal: responsive.inset, paddingTop: responsive.dimension(12), paddingBottom: responsive.dimension(24) }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={[styles.intro, { gap: responsive.dimension(8) }]}><Text style={[styles.title, { fontSize: responsive.fontSize(24) }]}>Create account</Text><Text style={[styles.subtitle, { fontSize: responsive.fontSize(13), lineHeight: responsive.dimension(20) }]}>Good games and better company start here.</Text></View>
        <View style={{ gap: responsive.dimension(12) }}>
          <FormField label="Name" placeholder="Your full name" value={name} onChangeText={setName} autoComplete="name" shellColor={colors.surface} />
          <FormField label="Username" placeholder="Choose a username" value={username} onChangeText={setUsername} autoComplete="username" />
          <FormField label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} autoComplete="email" keyboardType="email-address" shellColor="#EDE4E4" />
          <FormField label="Password" placeholder="Create a password" value={password} onChangeText={setPassword} autoComplete="new-password" secureTextEntry />
        </View>
        <Text style={[styles.legal, { fontSize: responsive.fontSize(11), lineHeight: responsive.dimension(16), marginTop: responsive.dimension(22) }]}>By creating an account, you agree to our <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy.</Text> Play fair. Be kind.</Text>
        <Pressable onPress={submit} style={[styles.primary, { height: responsive.dimension(48), borderRadius: responsive.dimension(12), marginTop: responsive.dimension(22) }]}><Text style={[styles.primaryText, { fontSize: responsive.fontSize(14) }]}>Create account with email</Text></Pressable>
        <View style={{ marginTop: responsive.dimension(22) }}><ProviderButtons variant="registration" /></View>
        <Text style={[styles.switch, { fontSize: responsive.fontSize(12), marginTop: responsive.dimension(24) }]}>Already have an account? <Text onPress={() => router.replace('/(auth)/sign-in')} style={styles.link}>Sign in</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
    <HomeIndicator />
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignSelf: 'center', backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { flexGrow: 1 },
  intro: { marginBottom: 26 },
  title: { color: colors.ink, fontFamily: fonts.bold },
  subtitle: { color: colors.muted, fontFamily: fonts.regular },
  legal: { color: colors.muted, fontFamily: fonts.regular },
  link: { color: colors.coral, fontFamily: fonts.semibold },
  primary: { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.coral },
  primaryText: { color: '#fff', fontFamily: fonts.semibold },
  switch: { color: colors.muted, textAlign: 'center', fontFamily: fonts.regular },
});
