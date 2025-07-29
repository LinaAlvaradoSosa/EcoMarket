import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Productos from "./components/Productos"
import { db } from './data/db'


function App() {

    const initialCart = () =>{
        const localStorageCart =  localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const[cart, setCart] = useState(initialCart)

    const Max_Items= 5
    const Min_items = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    function addToCart(item) {
        const itemExist = cart.findIndex((product) => product.id === item.id)
        if (itemExist >= 0) {
            if(cart[itemExist].quantity >= Max_Items) return
            const updatedCart = [ ...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1 
            setCart([...cart, item])
        }
    }
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(product => product.id !== id))
        
    }
    function increaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < Max_Items){
                return {
                    ...item,
                quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }
    function decreaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if (item.id === id && item.quantity > Min_items) {
                return{
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }


    return (
    <>
    <Header
    cart={cart}
    removeFromCart={removeFromCart}
    increaseQuantity={increaseQuantity}
    decreaseQuantity={decreaseQuantity}
    clearCart={clearCart}
    />

    <main>
        <p className="mainTittle">NUESTROS PRODUCTOS</p>
        <div className="containerCards">
            {data.map((product)=>(
                <Productos
                key={product.id}
                product={product}
                setCart={setCart}
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
