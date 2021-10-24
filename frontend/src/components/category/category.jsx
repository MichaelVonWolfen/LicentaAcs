import "./category.css"

export default function Category(props) {
    const { image, color, name} = props
    const style ={
        "--color":color,
        // "--container_size":container_size
    }
    const redirect = (e)=>{
        window.location.href ="category/" + e.target.name.toLowerCase()
    }
    return(
        <div className="category" style={style} name={name} onClick={redirect}>
            <img src={image}  alt={"image"}/>
            <button className="filter" name={name}/>
        </div>
    )
}