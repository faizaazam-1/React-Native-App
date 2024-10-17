import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="test-3xl">MY-APP ---- AORA</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: "pink" }}>
        Go to Profile
      </Link>
    </View>
  );
}
