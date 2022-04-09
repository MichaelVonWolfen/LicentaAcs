import {ICategoryInformation, ICategoryInput2} from "../Structures/InterfacesCategory";

let categoryDetails:ICategoryInformation;
function setCategoryColors({background_color, color}:ICategoryInput2) {
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