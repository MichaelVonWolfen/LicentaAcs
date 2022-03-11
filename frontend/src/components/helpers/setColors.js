import * as constants from "../../constants"
let categoryDetails;
function setCategoryColors({background_color, color}) {
    document.body.style =`--background-color: ${background_color};--color: ${color};`
}
const resetCategoryColors = () => {
    if(categoryDetails)
        setCategoryColors(categoryDetails)
}
function getCategoryDetailAndSetColors(category) {
    //TODO get category color palette from backend

    // categoryDetails = constants.categories.find(cat => cat.name.toLowerCase() === category.toLowerCase())
    // console.log(categoryDetails)
    // setCategoryColors(categoryDetails)
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