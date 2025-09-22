import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { createAccount } from "../../../services/authService";
export default function UserSignup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const onNavigateToLogin = () => {
    navigation.navigate("UserLogin");
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      setEmail("");
      setPassword("");
      return;
    }

    setIsLoading(true);
    try {
      await createAccount({ user: { email, password } });
      alert("Account created successfully");
    } catch (_error) {
      alert("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Background Gradient Effect */}
        <View style={styles.backgroundGradient} />

        <Animated.View
          style={[
            styles.cardShadow,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <View style={styles.haircutLogo}>
                    {/* Professional scissors logo */}
                    <View style={styles.scissorsMain}>
                      <View style={styles.scissorsTop}>
                        <View style={styles.blade1} />
                        <View style={styles.blade2} />
                      </View>
                      <View style={styles.scissorsBottom}>
                        <View style={styles.handle1} />
                        <View style={styles.handle2} />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={styles.heading}>Create Account</Text>
              <Text style={styles.subheading}>
                Join Cutzy and start your journey
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    inputMode="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
                    placeholder="Create a strong password"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    returnKeyType="go"
                    onSubmitEditing={handleSubmit}
                  />
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, isLoading && styles.buttonDisabled]}
                disabled={isLoading}
              >
                <View style={styles.buttonContent}>
                  {isLoading ? (
                    <View style={styles.loadingSpinner} />
                  ) : (
                    <Text style={styles.buttonText}>Create Account</Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* Terms and Privacy */}
              <View style={styles.termsSection}>
                <Text style={styles.termsText}>
                  By creating an account, you agree to our{" "}
                  <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footerSection}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <TouchableOpacity onPress={onNavigateToLogin}>
                  <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FA", // Light background
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  cardShadow: {
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
    borderRadius: 24,
  },
  card: {
    backgroundColor: "#FFFFFF", // White card
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)", // Light border for light theme
    overflow: "hidden",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#667eea",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },
  heading: {
    color: "#1A1A1A", // Black text for light theme
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  subheading: {
    color: "#6C757D", // Darker gray for light theme
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  formSection: {
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#1A1A1A", // Black text for labels
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#FFFFFF", // White input background
    color: "#1A1A1A", // Black text in inputs
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.12)", // Dark border for light theme
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 16, android: 12 }),
    borderRadius: 16,
    fontSize: 16,
    fontWeight: "500",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#667eea",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: "#4B5563",
    shadowOpacity: 0.1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderTopColor: "transparent",
  },
  termsSection: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  termsText: {
    color: "#6C757D", // Darker gray for light theme
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  footerSection: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)", // Dark border for light theme
  },
  footerText: {
    color: "#6C757D", // Darker gray for light theme
    fontSize: 14,
  },
  linkText: {
    color: "#667eea",
    fontWeight: "600",
  },
});
