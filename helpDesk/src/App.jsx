import React from "react";
import "rsuite/dist/rsuite.min.css";
import SideNav from "./components/SideNav";

import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";

const App = () => {
  return (
    <div style={{ flex: 1 }}>
      {/* <Dashboard /> */}
      {/* <SideNav /> */}
      <Dashboard2 />
    </div>
  );
};

export default App;
