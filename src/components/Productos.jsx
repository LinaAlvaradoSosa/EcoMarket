export default function Productos({product, addToCart}){

    
    const {description, imagen, price, id } = product



    return(
        <div className="card">
        <img src={`/img/${imagen}`} className="img" alt="..."/>
        <div className="cardBody">
            <p>{description}</p>
            <p className="description">$ {price}</p>
            <button
                href="#" 
                className="boton" 
                onClick={() => addToCart(product)}
                >Agregar al carrito</button>
        </div>
    </div>
    )
}