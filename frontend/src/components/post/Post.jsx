import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Icon from '@mui/material/Icon';
import './post.css'
import * as constants from "../../constants";
import Image from "../image/image"
export default function Post(props){
    const {image, date, likeNb, commNb, title, category} = props
    let [state,setState] = React.useState(props.state);
    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
            // Inject before JSS
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
            <a href={`/post/${category}/${title.toLowerCase()}`}>
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