import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import HomeScreen from "./src/presentation/HomeScreen";
import { initSchema } from "./src/data/db/schema";
import { seedDatabase } from "./src/data/db/seed";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await initSchema();
      
      // DEV ONLY TODO: remove
      if (__DEV__) {
        await seedDatabase();
      }

        setReady(true);
      } catch (e: any) {
        setError(e?.message ?? "Init failed");
      }
    })();
  }, []);

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text><center>❌ {error}</center></Text>
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