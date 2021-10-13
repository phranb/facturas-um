import React from "react";
import "./App.css";
import { FiltroFacturaCompra } from "./components/FiltroFacturaCompra";
import { HandleWindowSize } from "./util/HandleWindowSize";

function App() {
  const isMobile = HandleWindowSize();
  return (
    <div className="App">
      <FiltroFacturaCompra isMobile={isMobile} />
    </div>
  );
}

export default App;
