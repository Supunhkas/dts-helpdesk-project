import React from "react";
import "rsuite/dist/rsuite.min.css";
import SideNav from "./components/SideNav";

import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div style={{ flex: 1 }}>
      <Dashboard />
      {/* <SideNav /> */}
    </div>
  );
};

export default App;
