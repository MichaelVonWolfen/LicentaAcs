import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { LoggedOutRoute, PropsRoute } from "./modules/Routes";
import Home from "./components/Home/home";
import Register from "./components/Register/register";
import Login from "./components/LogIN/Login";
import Background from "./components/background/background";
import categoryPage from "./components/category_page/category-page";
import createPost from "./components/create-post/create-post";
import PostPage from "./components/post_page/PostPage";
function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Navbar/>
              {/*//TODO FIND a way to change the colors on the neded pages*/}
              <Background color="#CCC5B9" background_color="#252422"/>
              <PropsRoute exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/category/:category" component={categoryPage} />
              <Route path="/add/post/:category" component={createPost} />
              <Route path="/post/:category/:post" component={PostPage} />
              <Route path="/login" component={Login} />
          </div>
      </BrowserRouter>
  );
}

export default App;
