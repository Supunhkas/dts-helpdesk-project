import React from "react";
import "rsuite/dist/rsuite.min.css";
import Dashboard2 from "./pages/Dashboard2";
import Login from "./pages/Login";

const App = () => {
  return (
    <div style={{ flex: 1 }}>
      <Dashboard2 />
      {/* <Login /> */}
    </div>
  );
};

export default App;
export const baseURL = "http://192.168.78.174/HelpDesk/";
