import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { initDb } from "./src/db/database";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await initDb();
        setReady(true);
      } catch (e: any) {
        setError(e?.message ?? "DB init failed");
      }
    })();
  }, []);

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>❌ {error}</Text>
      </SafeAreaView>
    );
  }

  if (!ready) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Initializing...</Text>
      </SafeAreaView>
    );
  }

  return <HomeScreen />;
}