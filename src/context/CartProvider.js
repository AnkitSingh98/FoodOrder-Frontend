import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext"
import UserContext from "./UserContext";
import { addItemToCart, clearAllCartItems, getCart, removeItemFromCart } from "../services/CartService";
import { toast } from "react-toastify";

const CartProvider = ( { children })=> {

    const {isLogin, userData} = useContext(UserContext)
    const [ cart, setCart ] = useState(null)


    const loadUserCart = () =>{

        getCart()
            .then((response)=>{
                console.log("Cart of User = ")
                console.log(response)

                response.items.sort((a,b) => b.cartItemId - a.cartItemId)
                setCart(response)
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error while loading cart !!")
            })
    }

    useEffect(()=>{

        if(isLogin)
        loadUserCart()
        else
        setCart(null)
        
    },[isLogin])


    // add item to cart
    const addItem = (productId, quantity)=>{

        addItemToCart(productId, quantity)
                .then((response)=>{
                    console.log(response)

                    response.items.sort((a,b) => b.cartItemId - a.cartItemId)
                    setCart(response)
                    toast.success(" Successfully added item to Cart !!")

                })
                .catch((error)=>{
                    console.log(error)
                    toast.error("Error while adding item to cart !!")
                })
    }


    // remove item from cart
    const removeItem = (productId) =>{

        removeItemFromCart(productId)
                .then((response)=>{
                    console.log(response)

                    setCart(response)
                    toast.success("Item removed from cart")
                })
                .catch((error)=>{
                    console.log(error)
                    toast.error("Error while removing item from cart !!")
                })
    }


        // remove all items from cart
        const clearCart = () =>{

            clearAllCartItems()
                    .then((response)=>{
                        console.log(response)
    
                        setCart(response)
                        toast.success("Cart cleared")
                    })
                    .catch((error)=>{
                        console.log(error)
                        toast.error("Error while clearing cart !!")
                    })
        }
    
    
    return <CartContext.Provider
            value={
                {
                    cart,
                    setCart,
                    addItem,
                    removeItem,
                    clearCart
                }
            }
            >
            
             {children} 
             
             </CartContext.Provider>;
}

export default CartProvider;
