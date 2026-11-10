import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import EyeOffIcon from '../../../assets/figma/eye-off.svg';
import { colors, fonts } from '@/constants/design';
import { useResponsiveMetrics } from '@/utils/responsive';

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  shellColor?: string;
};

export function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry = false,
  autoComplete,
  shellColor = colors.field,
}: FormFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const responsive = useResponsiveMetrics();
  const isPassword = secureTextEntry;

  return (
    <View style={[styles.field, { gap: responsive.dimension(7) }]}>
      <Text style={[styles.label, { fontSize: responsive.fontSize(12) }]}>{label}</Text>
      <View style={[styles.inputShell, { height: responsive.dimension(46), borderRadius: responsive.dimension(12), backgroundColor: shellColor }]}>
        <TextInput
          accessibilityLabel={label}
          autoCapitalize="none"
          autoComplete={autoComplete}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          secureTextEntry={isPassword && !passwordVisible}
          style={[
            styles.input,
            { height: responsive.dimension(46), paddingHorizontal: responsive.dimension(14), fontSize: responsive.fontSize(13) },
            isPassword && styles.passwordInput,
          ]}
          value={value}
        />
        {isPassword ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
            onPress={() => setPasswordVisible((visible) => !visible)}
            style={[
              styles.visibilityButton,
              {
                width: responsive.dimension(44),
                height: responsive.dimension(44),
                borderRadius: responsive.dimension(12),
              },
            ]}
          >
            <EyeOffIcon />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {},
  label: { color: colors.ink, fontFamily: fonts.semibold },
  inputShell: {
    backgroundColor: colors.field,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    backgroundColor: colors.field,
    color: colors.ink,
    fontFamily: fonts.regular,
  },
  passwordInput: { paddingRight: 4 },
  visibilityButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
