import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login(props) {
  const {
    onSubmit,
    onNavigateToSignup,
    isSubmitting = false,
    errorMessage = null,
    title = "Welcome back",
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit =
    email.trim().length > 0 && password.length >= 6 && !isSubmitting;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit && onSubmit({ email: email.trim(), password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cardShadow}>
          <View style={styles.card}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.subheading}>Log in to continue</Text>

            {Boolean(errorMessage) && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                inputMode="email"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                placeholder="you@example.com"
                placeholderTextColor="#9AA0A6"
                style={styles.input}
                returnKeyType="next"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                placeholder="Enter your password"
                placeholderTextColor="#9AA0A6"
                style={styles.input}
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, !canSubmit && styles.buttonDisabled]}
              activeOpacity={0.9}
              onPress={handleSubmit}
              disabled={!canSubmit}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>

            {onNavigateToSignup && (
              <View style={styles.switchRow}>
                <Text style={styles.switchText}>New here?</Text>
                <TouchableOpacity onPress={onNavigateToSignup}>
                  <Text style={styles.linkText}>Create an account</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#0B0F14",
    alignItems: "center",
    justifyContent: "center",
  },
  cardShadow: {
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#12171F",
    borderRadius: 20,
    padding: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.06)",
  },
  heading: {
    color: "#E7ECF3",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  subheading: {
    marginTop: 6,
    color: "#9AA0A6",
  },
  fieldGroup: {
    marginTop: 18,
  },
  label: {
    color: "#C8D1DC",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#0E131A",
    color: "#E7ECF3",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 14,
    paddingVertical: Platform.select({ ios: 14, android: 10 }),
    borderRadius: 12,
  },
  button: {
    marginTop: 22,
    backgroundColor: "#4C8BFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  buttonDisabled: {
    backgroundColor: "#6F93D9",
    opacity: 0.8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  switchRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  switchText: {
    color: "#9AA0A6",
  },
  linkText: {
    color: "#AECBFA",
    fontWeight: "600",
  },
  errorText: {
    marginTop: 12,
    color: "#FF6B6B",
  },
});
