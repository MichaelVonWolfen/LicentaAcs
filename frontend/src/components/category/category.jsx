import "./category.css"

export default function Category(props) {
    const { image, color, name} = props
    const style ={
        "--color":color,
        // "--container_size":container_size
    }
    return(
        <div className="category" style={style} name={name}>
            <img src={image}  alt={"image"}/>
            <button className="filter"/>
        </div>
    )
}