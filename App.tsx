import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const RootStack = createNativeStackNavigator();

import { LogProvider } from "./LogContext";
import QrCodeScanner from "./pages/QrCodeScanner";
import Logs from "./pages/Logs";

export default function App() {
  return (
    <LogProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen
              name="Scanner"
              component={QrCodeScanner}
              options={({ navigation }) => ({
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate("Logs")}>
                    <Text>Logs</Text>
                  </Pressable>
                ),
              })}
            />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen
              name="Logs"
              component={Logs}
              options={({ navigation }) => ({})}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </LogProvider>
  );
}
