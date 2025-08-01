import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'


export const useCart = () => {

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

    // state derivado

    const isEmpy = useMemo( () => cart.length === 0)
    const cartToral = useMemo ( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0 ), [cart])


    return {
        data, 
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart, 
        isEmpy,
        cartToral
    }
    
}