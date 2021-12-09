import React, {useEffect, useState} from "react";
import Button from "../button/button";
import * as constants from "../../constants";
import "./home.css"
import Category from "../category/category";
import axiox from "axios"
export default function Home() {
    const [categoriesAdded, setCategoriesAdded] = useState([])
    const home_data = {
        splits: "2.8M",
        users: "52 M",
        bloggers: "1.4 M"
    }
    useEffect(()=> {
        axiox.get("/api/categories").then(result => {
            setCategoriesAdded([])
            const categories = result.data;
            setCategoriesAdded(categories.map(category => <Category image={category.image}
                                                                    color={category.style.primary_color}
                                                                    name={category.name}
                                                                    url_name={category.url_name}
            />))
        })
    },[])
    const expandOrRetractCategories = (e) => {
        const categories = document.querySelector('#categories')
        let isExpanded = categories.classList.contains("expanded")
        if (isExpanded) {
            categories.classList.remove('expanded')
            e.target.innerText = "Explore More"
        } else {
            categories.classList.add("expanded")
            e.target.innerText = "Explore Less"
        }
    };
    return (
        <div className={"home"}>
            <div className="title">
                <div className="background_header">
                    <div className="header_title">
                        <h1>Discover</h1>
                        <h1 className={"offset-1"}>Explore&nbsp;and&nbsp;Share</h1>
                        <h1 className={"offset-2"}>your&nbsp;special&nbsp;Experiences</h1>
                        <h5>On the worlds largest blog</h5>
                        <div className="info">
                            <span className="details">
                                <strong>{home_data.splits}</strong>
                                Splits
                            </span>
                            <span className="details">
                                <strong>{home_data.users}</strong>
                                Users
                            </span>
                            <span className="details">
                                <strong>{home_data.bloggers}</strong>
                                Bloggers
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="transparent_bar">
                <h6>One blog</h6>
                <h6>Dozens of personalities</h6>
            </div>
            <h2 className="most-popular">Our most popular splits</h2>
            <div className="categories" id={"categories"}>
                {categoriesAdded}
            </div>
            <div className="explore">
                <Button text={"Explore More"} customClickEvent={expandOrRetractCategories}/>
            </div>
        </div>
    )
}