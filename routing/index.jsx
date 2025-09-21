import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BarberLogin from "../components/auth/BarberLogin";
import BarberSignup from "../components/auth/BarberSignup";
import UserLogin from "../components/auth/Login";
import LoginSelector from "../components/auth/LoginSelector";
import RoleSelector from "../components/auth/RoleSelector";
import UserSignup from "../components/auth/Signup";

const Stack = createNativeStackNavigator();

export default function AppRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleSelector" component={RoleSelector} />
        <Stack.Screen name="LoginSelector" component={LoginSelector} />
        <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="BarberSignup" component={BarberSignup} />
        <Stack.Screen name="BarberLogin" component={BarberLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
