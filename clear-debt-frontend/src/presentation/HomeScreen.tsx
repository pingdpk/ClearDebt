import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { useHomeViewModel } from "./useHomeViewModel";

function formatMoney(cents: number, currency: string) {
  const abs = Math.abs(cents);
  const value = (abs / 100).toFixed(2);
  const symbolMap: Record<string, string> = { EUR: "€", USD: "$", GBP: "£", INR: "₹", AED: "د.إ" };
  const symbol = symbolMap[currency] ?? (currency + " ");
  return `${symbol}${value}`;
}

export default function HomeScreen() {
  const { items, loading, error, refresh } = useHomeViewModel();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <View style={{ height: 56, backgroundColor: "#FFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, justifyContent: "space-between" }}>
        <Text style={{ fontSize: 22 }}>≡</Text>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Clear Debt</Text>
        <Text style={{ fontSize: 22 }}>＋</Text>
      </View>

      <View style={{ padding: 16, flex: 1 }}>
        {error ? <Text style={{ color: "crimson" }}>❌ {error}</Text> : null}

        <FlatList
          data={items}
          keyExtractor={(it) => it.person}
          onRefresh={refresh}
          refreshing={loading}
          renderItem={({ item }) => {
            const theyOwe = item.netCents >= 0;
            return (
              <View style={{ backgroundColor: "#FFF", borderRadius: 14, padding: 14, marginBottom: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.person}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                  <Text style={{ color: "#7A8296" }}>{theyOwe ? "They owe" : "You owe"}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "800", color: "#2050C8" }}>
                    {formatMoney(item.netCents, item.currency)}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}