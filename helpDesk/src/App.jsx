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
import Componentloader from "./components/Componentloader";

const App = () => {
  console.log("hit", localStorage.getItem("token"));
  axios.defaults.headers.common["X-My-Secret-Token"] =
    localStorage.getItem("token");
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
            <Route path="home" Component={Dashboard2}>
              <Route path="Componentloader" Component={Componentloader} />
            </Route>
          </Route>
          <Route path="/" Component={Login} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
export const baseURL = "http://192.168.46.174/HelpDesk/";
