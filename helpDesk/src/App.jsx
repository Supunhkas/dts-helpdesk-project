import React from "react";
import "rsuite/dist/rsuite.min.css";
import Dashboard2 from "./pages/Dashboard2";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

const App = () => {
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
          <Route path="/" Component={Login} />
          <Route path="home" Component={Dashboard2} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
export const baseURL = "http://192.168.78.174/HelpDesk/";
