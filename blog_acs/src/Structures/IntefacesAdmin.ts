interface Istyle {
    _id: string,
    primary_color: string,
    secondary_color: string,
}
export interface ICourses {
    _id: string,
    createdAt: Date,
    image: string,
    name: string,
    style: Istyle,
    updatedAt: Date,
}
export interface Icomments {
    _id: string,
    authorID: string,
    content: string,
    createdAt: Date,
    likesList: [],
    postID: string,
    updatedAt: Date,
}
export interface Iposts {
    _id: string,
    categoryID: string,
    content: string,
    createdAt: Date,
    like_nb: number,
    post_img: string,
    title: string,
    updatedAt: Date,
    users_likes_IDS: string[],
    creatorID: string,
}
export interface Iusers{
    _id: string,
    createdAt: Date,
    email: string,
    password: string,
    profile_picture: string,
    updatedAt: Date,
    username: string,
    role: string
}


