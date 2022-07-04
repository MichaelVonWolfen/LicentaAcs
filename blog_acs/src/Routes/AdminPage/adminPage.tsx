import "./adminPage.sass";
import {Icomments, ICourses, Iposts, Iusers} from "../../Structures/IntefacesAdmin"
import constants from "../../Config/constants"
import {useEffect, useState} from "react";
import Button from "../../Components/Button/button"
import {jsx} from "@emotion/react";

export default function AdminPage(){
    const [posts, setPosts] = useState([] as Iposts[]);
    const [courses, setCourses] = useState([] as ICourses[]);
    const [comments, setComments] = useState([] as Icomments[]);
    const [users, setUsers] = useState([] as Iusers[]);
    const token = localStorage.getItem("token")
    const getUrlData =  async (url:string):Promise<Iposts[] | ICourses[] | Icomments[] | Iusers[]> =>{
        const response = await fetch(url, {
            // @ts-ignore
                headers:{
                    authorization: token,
                }})
        return await response.json();
    }
    const fetchAllAdminData = ()=>{
        getUrlData(`${constants.BACKEND_URL}/api/posts/allposts`).then(data => setPosts(data as Iposts[]));
        getUrlData(`${constants.BACKEND_URL}/api/categories`).then(data => setCourses(data as ICourses[]));
        getUrlData(`${constants.BACKEND_URL}/api/comments`).then(data => setComments(data as Icomments[]));
        getUrlData(`${constants.BACKEND_URL}/api/users`).then(data => setUsers(data as Iusers[]));
    }
    useEffect(()=>{
        fetchAllAdminData()
    }, [])

    function generateTable(data: Iposts[] | ICourses[] | Icomments[] | Iusers[], url:string) {
        let firstRow;
        let otherRows:any = [];

        async function deleteItem(url: string) {
            await fetch(url, {
                method:"DELETE",
                // @ts-ignore
                headers:{
                    authorization: token,
                }})
            fetchAllAdminData()
        }

        if(data[0]){
            firstRow = Object.keys(data[0]).map(key =>{return <td>{key}</td>});
            // firstRow.push(<td>Edit</td>)
            firstRow.push(<td>Delete</td>)
            data.forEach(row => {
                let parsedRow = Object.keys(row).map((key,index) =>{
                    // @ts-ignore
                    return <td>{typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key]}</td>
                })
                parsedRow.push(<td>
                    <Button text={"Delete"} customClickEvent={()=>{deleteItem(`${url}/${row["_id"]}`)}}></Button>
                </td>)
                otherRows.push(<tr>{parsedRow}</tr>)
            })
        }
        return(
            <table>
                <tr>{firstRow}</tr>
                {otherRows}
            </table>
    )}

    return(
      <div className={"adminContainer"}>
          <h1>Posts</h1>
          {generateTable(posts, `${constants.BACKEND_URL}/api/posts`)}
          <h1>Courses</h1>
          {generateTable(courses, `${constants.BACKEND_URL}/api/categories`)}
          <h1>Comments</h1>
          {generateTable(comments, `${constants.BACKEND_URL}/api/comments`)}
          <h1>Users</h1>
          {generateTable(users, `${constants.BACKEND_URL}/api/users`)}
      </div>
    );
}