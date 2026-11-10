import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';
import { CommunityFooter } from './community-footer';
import { FormField } from './form-field';
import { ProviderButtons } from './provider-buttons';
import { SignInHeader } from './sign-in-header';
import { HomeIndicator, SafeAreaTopSpacer } from './status-bar';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const responsive = useResponsiveMetrics();

  const handleSignIn = () => {
    if (!email.trim() || !password) {
      Alert.alert('Complete your details', 'Enter your email and password to continue.');
      return;
    }
    Alert.alert('Sign-in ready', 'Your account authentication will be connected here.');
  };

  return (
    <View style={[styles.form, { gap: responsive.dimension(28) }]}>
      <View style={[styles.introduction, { gap: responsive.dimension(8) }]}>
        <Text style={[styles.title, { fontSize: responsive.fontSize(24), lineHeight: responsive.dimension(29) }]}>Sign in</Text>
        <Text style={[styles.description, { fontSize: responsive.fontSize(13), lineHeight: responsive.dimension(20) }]}>Welcome back. Your people are here.</Text>
      </View>

      <View style={[styles.fields, { gap: responsive.dimension(16) }]}>
        <FormField
          autoComplete="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          placeholder="you@example.com"
          value={email}
        />
        <FormField
          autoComplete="current-password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
        />
        <Pressable
          accessibilityRole="button"
          onPress={() => Alert.alert('Forgot password?', 'We’ll build password recovery next.')}
          style={[styles.forgotButton, { minHeight: responsive.dimension(15) }]}
        >
          <Text style={[styles.forgotText, { fontSize: responsive.fontSize(12) }]}>Forgot password?</Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleSignIn}
        style={[styles.primaryButton, { height: responsive.dimension(48), paddingHorizontal: responsive.dimension(18), borderRadius: responsive.dimension(12) }]}
      >
        <Text style={[styles.primaryButtonText, { fontSize: responsive.fontSize(14) }]}>Sign in with email</Text>
      </Pressable>

      <ProviderButtons />

      <Text
        style={[
          styles.accountSwitch,
          { fontSize: responsive.fontSize(12), lineHeight: responsive.dimension(18) },
        ]}
      >
        <Text>New to Snachit? </Text>
        <Text
          accessibilityRole="link"
          onPress={() => router.push('/(auth)/create-account')}
          style={styles.linkText}
        >
          Create account
        </Text>
      </Text>
    </View>
  );
}

export function SignInScreen() {
  const responsive = useResponsiveMetrics();

  return (
    <View style={[styles.screen, { width: responsive.contentWidth }]}>
      <SafeAreaTopSpacer />
      <SignInHeader />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.content}
      >
        <ScrollView
          contentContainerStyle={[
            styles.contentInner,
            {
              paddingHorizontal: responsive.inset,
              paddingTop: responsive.dimension(12),
              paddingBottom: responsive.dimension(24),
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SignInForm />
          <CommunityFooter />
        </ScrollView>
      </KeyboardAvoidingView>
      <HomeIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignSelf: 'center', backgroundColor: colors.background },
  content: { flex: 1 },
  contentInner: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  form: { width: '100%' },
  introduction: {},
  title: { color: colors.ink, fontFamily: fonts.bold },
  description: { color: colors.muted, fontFamily: fonts.regular },
  fields: {},
  forgotButton: { alignSelf: 'flex-end', paddingVertical: 0 },
  forgotText: { color: colors.coral, fontSize: 12, fontFamily: fonts.semibold },
  primaryButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.coral,
  },
  primaryButtonText: { color: '#FFFFFF', fontFamily: fonts.semibold },
  accountSwitch: { color: colors.muted, textAlign: 'center', fontFamily: fonts.regular },
  linkText: { color: colors.coral, fontFamily: fonts.semibold },
});
