import React from 'react';
import Background from "./Components/Background/background";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CategoryPage, PostPage, Login, createPost, Home, Register} from "./Routes/index"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Background Component={Home}/>}/>
            <Route path="category/:category" element={<CategoryPage/>} />
        </Routes>
    </BrowserRouter>
  );
}
function test(){
    return <div className="loo">Hello</div>
}

export default App;
