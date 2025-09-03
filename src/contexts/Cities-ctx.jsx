/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:2003/cities";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true };
    }

    case "cities/loaded": {
      return { ...state, cities: action.payload, isLoading: false };
    }
    case "rejected": {
      return { ...state, error: action.payload, isLoading: false };
    }
    case "city/loaded": {
      return { ...state, isLoading: false, currentCity: action.payload };
    }
    case "city/create": {
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload], //cities sẽ thêm những city mới được add vào
        currentCity: action.payload,
      };
    }
    case "city/delete": {
      return {
        ...state,
        cities: state.cities.filter((c) => c?.id !== action.payload), //delete
        currentCity: {}, //về trạng thái ban đầu
        isLoading: false,
      };
    }
    default:
      break;
  }
}
export function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    let controller = new AbortController();
    async function getCities() {
      try {
        dispatch({ type: "loading", payload: "true" });
        const res = await fetch(BASE_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError")
          dispatch({ type: "rejected", payload: "Fetch cities failed" });
      }
    }

    getCities();
    return () => {
      controller.abort();
    };
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (!id) return;
      if (Number(currentCity?.id) === id) return;
      const controller = new AbortController();
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (e) {
        if (e.name !== "AbortError") dispatch({ type: "rejected", payload: e });
      }
    },
    [currentCity?.id]
  );

  const addCity = useCallback(async (newCity) => {
    if (!newCity) return;
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      dispatch({ type: "city/create", payload: data });
    } catch (e) {
      dispatch({ type: "rejected", payload: e });
    }
  }, []);
  const DeleteCity = useCallback(async (id) => {
    if (!id) return;
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      dispatch({ type: "city/delete", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
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
  const formatDate = (isString) => {
    if (!isString) return "";
    return new Intl.DateTimeFormat("vi-VN", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(isString));
  };
  const value = useMemo(() => {
    return {
      formatDate,
      flagUrl,
      cities,
      isLoading,
      getCity,
      currentCity,
      addCity,
      DeleteCity,
    };
  }, [DeleteCity, addCity, cities, currentCity, getCity, isLoading]);

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

export function useCities() {
  const ctx = useContext(CitiesContext);
  if (!ctx) throw new Error("useCities must be used inside <CitiesProvider />");
  return ctx;
}
