import { useMemo } from 'react'


export default function Header({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart}){


    // state derivado

    const isEmpy = useMemo( () => cart.length === 0)
    const cartToral = useMemo ( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0 ), [cart])


    return(
        <>
    <header className="header">
        <div className="container">
            <img src="/img/logo.png" alt="Logo EcoMercado" className="img-fluid" />
            <div className="displayCarrito">
                <nav>
                    <div 
                        className="carrito"
                    >
                    <img src="/img/carrito-de-compras.png" alt="Carrito de compras" className="carrito1 img-fluid" />
                        <div id="carrito" className="bg-white p-3">
                            {isEmpy  ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ): 
                            (   
                                <>                       
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {cart.map(product => (
                                    <tr key={product.id} className="iconos">
                                        <td>
                                            <img 
                                            className="img-carrito" 
                                            src={`/img/${product.imagen}`} 
                                            alt="imagen guitarra" />
                                        </td>
                                        <td>{product.name}</td>
                                        <td className="fw-bold">
                                                {product.price}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn-quantities"
                                                onClick={() => decreaseQuantity(product.id)}
                                            >
                                                -
                                            </button>
                                                {product.quantity}
                                            <button
                                                type="button"
                                                className="btn-quantities"
                                                onClick={() => increaseQuantity(product.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn-close"
                                                type="button"
                                                onClick={() => removeFromCart (product.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                    
                            <p className="text-end">Total pagar: <span className="fw-bold">${cartToral}</span></p>
                            </>  
                            )}
                        
                            <button className="btn-clear" onClick={clearCart}>Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
                
            </div>
        </div>
    </header>
        </>
        
    )
}


