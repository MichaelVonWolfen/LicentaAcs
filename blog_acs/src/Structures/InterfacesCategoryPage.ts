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
export type {Ipost, ICategoryData, Icategory}