import ReactDOM from 'react-dom/client';
import "./index.css"
import React from 'react';
import Background from "./Components/Background/background";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as CustomRoutes from "./Routes/index"
import Navbar from "./Components/navbar/navbar";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path={"/"} element={<Background Component={CustomRoutes.Home}/>}/>
            <Route path="category/:category" element={<Background Component={CustomRoutes.CategoryPage}/>} />
            <Route path="category/:category/post/:post" element={<Background Component={CustomRoutes.PostPage}/>} />
            <Route path="add/post/:category" element={<Background Component={CustomRoutes.CreatePost}/>} />
            <Route path="add/category" element={<Background Component={CustomRoutes.CreateCategory}/>} />
            <Route path="login" element={<Background Component={CustomRoutes.Login}/>} />
            <Route path="register" element={<Background Component={CustomRoutes.Register}/>} />
        </Routes>
    </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
