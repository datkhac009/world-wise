/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:2003/cities";

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState(null);
  useEffect(() => {
    let controller = new AbortController();
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        if (err.name !== "AbortError")
          console.error("Fetch cities failed:", err);
      } finally {
        setIsLoading(false);
      }
    }

    getCities();
    return () => {
      controller.abort();
    };
  }, []);

  const getCity = useCallback(async (id) => {
    if (!id) return;
    if (currentCity?.id === id) return;
    const controller = new AbortController();
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setCurrentCity(data);
    } catch (e) {
      if (e.name !== "AbortError") console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const flagUrl = (input = {}) => {
    const s = String(input || "");
    // emoji của API đang là chữ hoa về viết thường
    // đổi về country code 2 ký tự, viết thường
    const code = /^[A-Za-z]{2,3}$/.test(s) //{2,3} là phạm vi 2 hoăc 3 ký tự VD:"VN","USA"
      ? s.toLowerCase()
      : String.fromCharCode(
          ...[...s].slice(0, 2).map((ch) => (ch.codePointAt(0) ?? 0) - 127397)
        ).toLowerCase();

    if (code) return `https://flagcdn.com/${code}.svg`; // ✅ luôn tồn tại
  };

  const value = { flagUrl, cities, isLoading, setCities, getCity, currentCity };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export function useCities() {
  const ctx = useContext(CitiesContext);
  if (!ctx) throw new Error("useCities must be used inside <CitiesProvider />");
  return ctx;
}
