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
import { createBarberAccount } from "../../../services/authService";

export default function BarberSignup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [barberName, setBarberName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    navigation.navigate("BarberLogin");
  };

  const handleSubmit = async () => {
    if (
      !email ||
      !password ||
      !passwordConfirmation ||
      !name ||
      !barberName ||
      !phoneNumber
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await createBarberAccount({
        barber: {
          name,
          barber_name: barberName,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      // Clear form fields after successful creation
      setName("");
      setBarberName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setPhoneNumber("");

      alert("Barber account created successfully");
    } catch (_error) {
      alert("Failed to create barber account. Please try again.");
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
                  <View style={styles.barberLogo}>
                    {/* Barber scissors logo */}
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
              <Text style={styles.heading}>Join as Barber</Text>
              <Text style={styles.subheading}>
                Create your barber account and start accepting bookings
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Barber Username</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={barberName}
                    onChangeText={setBarberName}
                    autoCapitalize="none"
                    placeholder="Enter your barber username"
                    placeholderTextColor="#9CA3AF"
                    style={styles.input}
                    returnKeyType="next"
                  />
                </View>
              </View>

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
                <Text style={styles.label}>Phone Number</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    inputMode="tel"
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
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
                    returnKeyType="next"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
                    placeholder="Confirm your password"
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
                    <Text style={styles.buttonText}>Create Barber Account</Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* Terms and Privacy */}
              <View style={styles.termsSection}>
                <Text style={styles.termsText}>
                  By creating a barber account, you agree to our{" "}
                  <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footerSection}>
              <Text style={styles.footerText}>
                Already have a barber account?{" "}
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
    backgroundColor: "#F8F9FA",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
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
    backgroundColor: "#10B981", // Green color for barber
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#10B981",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  barberLogo: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsMain: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  blade1: {
    width: 8,
    height: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
    transform: [{ rotate: "15deg" }],
  },
  blade2: {
    width: 8,
    height: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
    transform: [{ rotate: "-15deg" }],
    marginLeft: -2,
  },
  scissorsBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  handle1: {
    width: 6,
    height: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    transform: [{ rotate: "15deg" }],
  },
  handle2: {
    width: 6,
    height: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
    transform: [{ rotate: "-15deg" }],
    marginLeft: -2,
  },
  heading: {
    color: "#1A1A1A",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: 8,
  },
  subheading: {
    color: "#6C757D",
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
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#1A1A1A",
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.12)",
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
    backgroundColor: "#10B981", // Green color for barber
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    shadowColor: "#10B981",
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
    color: "#6C757D",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  footerSection: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  footerText: {
    color: "#6C757D",
    fontSize: 14,
  },
  linkText: {
    color: "#10B981", // Green color for barber
    fontWeight: "600",
  },
});
