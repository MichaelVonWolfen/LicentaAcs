import React, {useEffect, useState} from "react";
import Button from "../../Components/Button/button";
import "./home.scss"
import Category from "../../Components/Category/category";
import axiox from "axios"
import constants from "../../Config/constants";
export default function Home() {
    const [categoriesAdded, setCategoriesAdded] = useState([])
    const [text, setText] = useState("Explore More")
    const [home_data, setHomeData] = useState({
        posts: "Loading",
        users: "Loading",
        categories: "Loading"
    })
    useEffect(()=> {
        axiox.get(`${constants.BACKEND_URL}/api/categories`).then(result => {
            setCategoriesAdded([])
            const categories = result.data;
            console.log(categories)
            setCategoriesAdded(categories.map((category: { image: string; style: { primary_color: string; }; name: string; _id: string; }) => <Category image={`${constants.BACKEND_URL}/${category.image}`}
                                                                    color={category.style.primary_color}
                                                                    name={category.name}
                                                                    path={category._id}
            />))
        })
        axiox.get(`${constants.BACKEND_URL}/api/categories/homeData`).then(result => {
            setHomeData(result.data)
        })
    },[])
    const expandOrRetractCategories = (e:any) => {
        const categories = document.querySelector('#categories')
        if(!categories) return
        let isExpanded = categories.classList.contains("expanded")
        if (isExpanded) {
            categories.classList.remove('expanded')
            setText("Explore More")
        } else {
            categories.classList.add("expanded")
            setText("Explore Less")
        }
    };
    return (
        <div className={"home"}>
            <div className="title">
                <div className="background_header" style={{backgroundImage: `url("/images/mask-g962ea3593_1920.png")`}}>
                    <div className="header_title">
                        <h1>Discover</h1>
                        <h1 className={"offset-1"}>Explore&nbsp;and&nbsp;Share</h1>
                        <h1 className={"offset-2"}>your&nbsp;special&nbsp;Experiences</h1>
                        <h5>On the worlds largest blog</h5>
                        <div className="info">
                            <span className="details">
                                <strong>{home_data.posts}</strong>
                                Posts
                            </span>
                            <span className="details">
                                <strong>{home_data.users}</strong>
                                Users
                            </span>
                            <span className="details">
                                <strong>{home_data.categories}</strong>
                                Courses
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="transparent_bar">
                <h6>One blog</h6>
                <h6>Dozens of personalities</h6>
            </div>
            <h2 className="most-popular">Our most popular courses</h2>
            <div className="categories" id={"categories"}>
                {categoriesAdded}
            </div>
            <div className="explore">
                <Button text={text} customClickEvent={expandOrRetractCategories}/>
            </div>
        </div>
    )
}