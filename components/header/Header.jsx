import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Header({
  title = "Cutzy",
  showBackButton = false,
  showMenuButton = false,
  showProfileButton = false,
  onBackPress,
  onMenuPress,
  onProfilePress,
  backgroundColor = "#667eea",
  textColor = "#FFFFFF",
  elevation = 4,
}) {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50));

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    }
  };

  return (
    <>
      <StatusBar
        barStyle={textColor === "#FFFFFF" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor,
            elevation,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.headerContent}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <View style={styles.backIcon}>
                  <View
                    style={[styles.backArrow, { borderLeftColor: textColor }]}
                  />
                </View>
              </TouchableOpacity>
            )}

            {showMenuButton && (
              <TouchableOpacity
                onPress={handleMenuPress}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <View style={styles.menuIcon}>
                  <View
                    style={[styles.menuLine, { backgroundColor: textColor }]}
                  />
                  <View
                    style={[styles.menuLine, { backgroundColor: textColor }]}
                  />
                  <View
                    style={[styles.menuLine, { backgroundColor: textColor }]}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Center Section - Logo and Title */}
          <View style={styles.centerSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <View style={styles.haircutLogo}>
                  {/* Professional scissors logo */}
                  <View style={styles.scissorsMain}>
                    <View style={styles.scissorsTop}>
                      <View
                        style={[styles.blade1, { backgroundColor: textColor }]}
                      />
                      <View
                        style={[styles.blade2, { backgroundColor: textColor }]}
                      />
                    </View>
                    <View style={styles.scissorsBottom}>
                      <View
                        style={[styles.handle1, { backgroundColor: textColor }]}
                      />
                      <View
                        style={[styles.handle2, { backgroundColor: textColor }]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            {showProfileButton && (
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.iconButton}
                activeOpacity={0.7}
              >
                <View style={styles.profileIcon}>
                  <View
                    style={[styles.profileCircle, { borderColor: textColor }]}
                  >
                    <Text style={[styles.profileText, { color: textColor }]}>
                      U
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Bottom Border */}
        <View style={[styles.bottomBorder, { backgroundColor: textColor }]} />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.select({ ios: 0, android: 0 }),
    paddingBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.select({ ios: 50, android: 20 }),
    paddingBottom: 8,
    minHeight: 60,
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  centerSection: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 12,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#FFFFFF",
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLine: {
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  logoContainer: {
    marginRight: 12,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  haircutLogo: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsMain: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scissorsTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
  },
  blade1: {
    width: 6,
    height: 1.5,
    borderRadius: 0.75,
    transform: [{ rotate: "15deg" }],
  },
  blade2: {
    width: 6,
    height: 1.5,
    borderRadius: 0.75,
    transform: [{ rotate: "-15deg" }],
    marginLeft: -1,
  },
  scissorsBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  handle1: {
    width: 4,
    height: 6,
    borderRadius: 2,
    transform: [{ rotate: "15deg" }],
  },
  handle2: {
    width: 4,
    height: 6,
    borderRadius: 2,
    transform: [{ rotate: "-15deg" }],
    marginLeft: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  profileIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  profileCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 12,
    fontWeight: "700",
  },
  bottomBorder: {
    height: 1,
    opacity: 0.1,
    marginHorizontal: 20,
  },
});
