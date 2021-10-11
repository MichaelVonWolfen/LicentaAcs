import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { LoggedOutRoute, PropsRoute } from "./modules/Routes";
import Home from "./components/Home/home";
import Register from "./components/Register/register";
import Login from "./components/LogIN/Login";
function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Navbar/>
              <PropsRoute exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
          </div>
      </BrowserRouter>
  );
}

export default App;
