import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./tools/css/style.css";
import Header from "./Files/header";
import Footer from "./Files/footer";
import { Provider } from "./utility/context";
import Routes from "./utility/routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider>
          <Header />
          <Routes />
          <Footer />
        </Provider>
      </Router>
    </div>
  );
}

export default App;