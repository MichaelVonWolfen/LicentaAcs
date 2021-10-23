let categoryDetails;
function setCategoryColors({background_color, color}) {
    document.body.style =`--background-color: ${background_color};--color: ${color};`
}
const resetCategoryColors = (e) => {
    if(categoryDetails)
        setCategoryColors(categoryDetails)
}
function getCategoryDetailAndSetColors(category) {
    //TODO get category color palette from backend
    categoryDetails = {
        background_color:"#252422",
        color:"#CCC5B9",
        name:"Workout"
    };
    // setCategoryColors(categoryDetails)
    if(categoryDetails)
        setCategoryColors(categoryDetails)
    window.addEventListener("resize", resetCategoryColors)
    return categoryDetails;
}
export default getCategoryDetailAndSetColors;