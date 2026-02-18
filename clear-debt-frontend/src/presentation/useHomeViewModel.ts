import { useCallback, useEffect, useState } from "react";
import type { DebtSummary }  from "../domain/models/Debt"
import { container } from "../app/di/container";

export function useHomeViewModel() {
  const [items, setItems] = useState<DebtSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await container.usecases.getHomeSummary.execute();
      setItems(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  return { items, loading, error, refresh: load };
}