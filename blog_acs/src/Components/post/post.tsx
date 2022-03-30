import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from '@mui/material/Icon';
import './post.sass'
import Image from "../image/Image"
interface Ipost {
    image:string,
    state: string,
    likeNb:number,
    commNb:number,
    title:string,
    category:string,
    postID: string,
    date:string
}
export default function Post(props:Ipost){
    const {image, date, likeNb, commNb, title, category, postID} = props
    let [state,setState] = React.useState(props.state);
    React.useEffect(() => {
        const node:any = loadCSS(
            'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
            // Inject before JSS
            // @ts-ignore
            document.querySelector('#font-awesome-css') || document.head.firstChild,
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    function changeState() {
        if(state === 'saved')
            setState("not_saved")
        else
            setState("saved")
    }

    // <FavoriteBorderIcon label="Hearth"/>
    return(
        <div className={"post-container"}>
            <a href={`/category/${category}/post/${postID}`}>
                <Image image={image}/>
                <p>{title}</p>
            </a>
                {
                    state === "not_saved" ?
                        <BookmarkBorderIcon className={"bookmark"} onClick={changeState}/>
                        :
                        <CheckIcon className={"bookmark"} onClick={changeState}/>
                }
            <div className="reaction-buttons">
                <span className="icon">
                    {/*@ts-ignore */}
                    <FavoriteIcon label="Hearth"/>
                    <span>{likeNb}</span>
                </span>
                <span className="icon">
                    <Icon baseClassName="fas" className="fa-comment-dots"/>
                    <span>{commNb}</span>
                </span>
                <span>{date}</span>
            </div>
        </div>
    )
}