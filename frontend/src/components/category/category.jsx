import "./category.css"

export default function Category(props) {
    const { image, color, name, url_name} = props
    const style ={
        "--color":color,
        // "--container_size":container_size
    }
    const redirect = (e)=>{
        window.location.href ="category/" + url_name
    }
    return(
        <div className="category" style={style} name={name} onClick={redirect}>
            <img src={image}  alt={"image"}/>
            <button className="filter" name={name}/>
        </div>
    )
}