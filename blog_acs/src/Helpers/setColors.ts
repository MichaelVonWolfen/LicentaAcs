interface Icategory {
    color:string,
    background_color:string,
    name:string
}
interface IcategoryInput2 {
    background_color:string,
    color:string
}

let categoryDetails:Icategory;
function setCategoryColors({background_color, color}:IcategoryInput2) {
    document.body.setAttribute(`style`,`--background-color: ${background_color};--color: ${color};`)
}
const resetCategoryColors = () => {
    if(categoryDetails)
        setCategoryColors(categoryDetails)
}
function getCategoryDetailAndSetColors(category:any):any {
    categoryDetails = {
        color:category.style.primary_color,
        background_color:category.style.secondary_color,
        name:category.name,
    };
    if(categoryDetails)
        setCategoryColors(categoryDetails)
    window.addEventListener("resize", resetCategoryColors)
    return categoryDetails;
}
export default getCategoryDetailAndSetColors;