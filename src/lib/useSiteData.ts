"use client";

import { useState, useEffect } from "react";
import initialData from "@/data/site-data.json";

export function useSiteData() {
  const [data, setData] = useState<any>(initialData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch("/api/site-data");
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && Object.keys(json).length > 0) {
            setData(json);
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic site data, using static fallback", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading };
}
