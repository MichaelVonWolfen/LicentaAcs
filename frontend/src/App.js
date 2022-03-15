import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/LogIN/Login";
import Background from "./components/background/Background";
import CategoryPage from "./components/category_page/Category-page";
import createPost from "./components/create-post/Create-post";
import PostPage from "./components/post_page/PostPage";
function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Background color="#CCC5B9" background_color="#252422"/>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="register" element={<Register/>} />
              <Route path="category/:category" element={<CategoryPage/>} />
              <Route path="add/post/:category" element={<createPost/>} />
              <Route path="category/:category/post/:post" element={<PostPage/>} />
              <Route path="login" element={<Login/>} />
          </Routes>
      </BrowserRouter>
  );
              {/*//TODO FIND a way to change the colors on the neded pages*/}
}

export default App;
