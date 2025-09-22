import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RoleSelector() {
  const navigation = useNavigation();
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

  const handleUserSelection = () => {
    navigation.navigate("UserSignup");
  };

  const handleBarberSelection = () => {
    navigation.navigate("BarberSignup");
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.heading}>Welcome to Cutzy</Text>
            <Text style={styles.subheading}>
              Choose your role to get started
            </Text>
          </View>

          {/* Role Selection Section */}
          <View style={styles.selectionSection}>
            {/* User Option */}
            <TouchableOpacity
              onPress={handleUserSelection}
              style={styles.roleCard}
            >
              <View style={styles.roleIconContainer}>
                <View style={styles.userIcon}>
                  <View style={styles.userHead} />
                  <View style={styles.userBody} />
                </View>
              </View>
              <Text style={styles.roleTitle}>I&apos;m a Customer</Text>
              <Text style={styles.roleDescription}>
                Book appointments and find the perfect barber for your style
              </Text>
            </TouchableOpacity>

            {/* Barber Option */}
            <TouchableOpacity
              onPress={handleBarberSelection}
              style={styles.roleCard}
            >
              <View style={styles.roleIconContainer}>
                <View style={styles.barberIcon}>
                  <View style={styles.scissorsIcon}>
                    <View style={styles.scissorsBlade1} />
                    <View style={styles.scissorsBlade2} />
                  </View>
                </View>
              </View>
              <Text style={styles.roleTitle}>I&apos;m a Barber</Text>
              <Text style={styles.roleDescription}>
                Manage your salon, accept bookings, and grow your business
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginSelector")}
              >
                <Text style={styles.linkText}>Sign In</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#667eea",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  haircutLogo: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsMain: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  blade1: {
    width: 12,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 1.5,
    transform: [{ rotate: "15deg" }],
  },
  blade2: {
    width: 12,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 1.5,
    transform: [{ rotate: "-15deg" }],
    marginLeft: -3,
  },
  scissorsBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  handle1: {
    width: 8,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    transform: [{ rotate: "15deg" }],
  },
  handle2: {
    width: 8,
    height: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    transform: [{ rotate: "-15deg" }],
    marginLeft: -3,
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
  selectionSection: {
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  roleIconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  userIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  userHead: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#667eea",
    marginBottom: 2,
  },
  userBody: {
    width: 30,
    height: 20,
    backgroundColor: "#667eea",
    borderRadius: 15,
  },
  barberIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsBlade1: {
    width: 15,
    height: 3,
    backgroundColor: "#667eea",
    borderRadius: 1.5,
    transform: [{ rotate: "15deg" }],
  },
  scissorsBlade2: {
    width: 15,
    height: 3,
    backgroundColor: "#667eea",
    borderRadius: 1.5,
    transform: [{ rotate: "-15deg" }],
    marginTop: -3,
  },
  roleTitle: {
    color: "#1A1A1A",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  roleDescription: {
    color: "#6C757D",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
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
    color: "#667eea",
    fontWeight: "600",
   
  },
});
