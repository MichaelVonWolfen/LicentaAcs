interface Ipost{
    title:string,
    _id:string,
    post_img:string,
    createdAt:string,
    like_nb:number,
    commNb:number
}
interface Icategory{
    _id:string,
}
interface ICategoryData {
    name: string;
    category:Icategory
    postsList: Ipost[]
}
interface ICategoryInformation {
    color:string,
    background_color:string,
    name:string
}
interface ICategoryInput2 {
    background_color:string,
    color:string
}
export type {Ipost, ICategoryData, Icategory, ICategoryInput2, ICategoryInformation}