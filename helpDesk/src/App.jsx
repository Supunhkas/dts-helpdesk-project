import React from "react";
import "rsuite/dist/rsuite.min.css";
import Dashboard2 from "./pages/Dashboard2";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import PrivateRoutes from "./utils/PrivateRoutes";

const App = () => {
  axios.defaults.headers.common["X-My-Secret-Token"] =
    "HTjjLDxeK9wpYyRTIkptvg==";
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <div style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="home" Component={Dashboard2} />
          </Route>
          <Route path="/" Component={Login} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
export const baseURL = "http://192.168.168.174/HelpDesk/";
