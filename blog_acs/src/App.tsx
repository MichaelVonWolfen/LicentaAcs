import React from 'react';
import Background from "./Components/Background/background";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CategoryPage, PostPage, Login, CreatePost, Home, Register} from "./Routes/index"
import Navbar from "./Components/navbar/navbar";

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path={"/"} element={<Background Component={Home}/>}/>
            <Route path="category/:category" element={<CategoryPage/>} />
            <Route path="register" element={<Background Component={Register}/>} />
            <Route path="add/post/:category" element={<Background Component={CreatePost}/>} />
            <Route path="category/:category/post/:post" element={<Background Component={PostPage}/>} />
            <Route path="login" element={<Background Component={Login}/>} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
