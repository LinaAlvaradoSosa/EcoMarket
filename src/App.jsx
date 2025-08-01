import Header from "./components/Header"
import Productos from "./components/Productos"
import { useCart } from './hooks/useCart'


function App() {

    const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpy, cartToral } = useCart()

    return (
    <>
    <Header
    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}
    isEmpy={isEmpy}
    cartToral={cartToral}
    />

    <main>
        <p className="mainTittle">NUESTROS PRODUCTOS</p>
        <div className="containerCards">
            {data.map((product)=>(
                <Productos
                key={product.id}
                product={product}
                addToCart={addToCart}
                />
            )
            )}
            
        </div>
    </main>
    <footer>
        <div>
            <p>Todos los derechos son reservados</p>
            <a  className="link" href="https://www.holalina.com/" target="_blank">Visítame! holalina.com</a>
        </div>
    </footer>

    </>
    )
}

export default App
