import React, { useCallback, useEffect, useState } from "react";
import {FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import type { DebtSummary } from "../types/models"; 
import { getDebtSummaries } from "../db/database";

//TODO: move to util
function formatMoney(cents: number, currency: string, fixedDecimal: number): string {
    const abs = Math.abs(cents);
    const value = (abs / 100).toFixed(fixedDecimal);

    //TODO: move to util or DB/ extend later  name: currencySymbols
    const symbolMap: Record<string, string> = {
            EUR: "€",
            USD: "$",
            GBP: "£",
            INR: "₹",
            AED: "د.إ"
    };

    const symbol = symbolMap[currency] ?? currency + " ";
    return `${symbol}${value}`; //
}

export default function HomeScreen(){
    const [items, setItems] = useState<DebtSummary[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getDebtSummaries();
            setItems(data);
        } finally { //TODO: catch to be added
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void load();
    }, [load]);

      return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      {/* Header */}
      <View style={{ height: 56, backgroundColor: "#FFF", flexDirection: "row", alignItems: "center", paddingHorizontal: 16, justifyContent: "space-between" }}>
        <Text style={{ fontSize: 22 }}>≡</Text>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>Clear Debt</Text>
        <Text style={{ fontSize: 22 }}>＋</Text>
      </View>

      <View style={{ padding: 16, flex: 1 }}>
        {loading ? (
          <Text style={{ color: "#7A8296" }}>Loading...</Text>
        ) : items.length === 0 ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#7A8296", marginBottom: 12 }}>
              No debts added yet
            </Text>
            <Pressable style={{ backgroundColor: "#2050C8", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12 }}>
              <Text style={{ color: "#FFF", fontWeight: "700" }}>Add your first transaction</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(it) => it.person}
            onRefresh={load}
            refreshing={loading}
            renderItem={({ item }) => {
              const theyOwe = item.netCents >= 0;
              const status = theyOwe ? "They owe" : "You owe";
              const amount = formatMoney(item.netCents, item.currency, 2);

              return (
                <View style={{ backgroundColor: "#FFF", borderRadius: 14, padding: 14, marginBottom: 12 }}>
                  <Text style={{ fontSize: 16, fontWeight: "700", color: "#141823" }}>{item.person}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6, alignItems: "center" }}>
                    <Text style={{ color: "#7A8296" }}>{status}</Text>
                    <Text style={{ fontSize: 18, fontWeight: "800", color: "#2050C8" }}>{amount}</Text>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView> //TODO: use safeAreViewContext
  );
}