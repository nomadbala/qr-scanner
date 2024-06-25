import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogs } from "../LogContext";
import { FlatList, Text, View } from "react-native";

export default function Logs({ navigation }: any) {
  const { logs } = useLogs();

  return (
    <View>
      <FlatList
        data={logs}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}
