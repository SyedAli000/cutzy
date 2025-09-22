import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BarberLogin from "../components/auth/barber/BarberLogin";
import BarberSignup from "../components/auth/barber/BarberSignup";
import LoginSelector from "../components/auth/selector/LoginSelector";
import RoleSelector from "../components/auth/selector/RoleSelector";
import UserLogin from "../components/auth/user/Login";
import UserSignup from "../components/auth/user/Signup";
import BarberDashboard from "../components/dashboard/BarberDashboard";
import CustomerDashboard from "../components/dashboard/CustomerDashboard";

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
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
        <Stack.Screen name="BarberDashboard" component={BarberDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
