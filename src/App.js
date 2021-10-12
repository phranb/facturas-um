import logo from "./logo.svg";
import "./App.css";
import { FiltroFacturaCompra } from "./components/FiltroFacturaCompra";

function App() {
  return (
    <div className="App">
      <FiltroFacturaCompra />
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer">
        Learn React
      </a>
    </div>
  );
}

export default App;
