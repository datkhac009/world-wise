import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import ListCity from "./components/ListCity";
import Forms from "./components/Form";
import { useEffect, useState } from "react";
import Message from "./components/Message";
import Loading from "./components/Loading";
import CountryList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = "http://localhost:2003/cities";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function getCities() {
      try {
        const res = await fetch(`${BASE_URL}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setIsLoading(true);
        setCities(data);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/app" element={<AppLayout />}>
            <Route
              index
              element={
                <Message message="Add your first city by clicking on a cities" />
              }
            />
            <Route
              path="cities"
              element={
                isLoading ? (
                  <Loading fullScreen label="Đang tải thành phố..." />
                ) : (
                  <ListCity
                    cities={cities}
                    isLoading={isLoading}
                    setCities={setCities}
                  />
                )
              }
            />

            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={
                isLoading ? (
                  <Loading fullScreen label="Đang tải thành phố..." />
                ) : (
                  <CountryList countrys={cities} isLoading={isLoading} />
                )
              }
            />
            <Route path="form" element={<Forms />} />
          </Route>
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />

          {/* Route 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
