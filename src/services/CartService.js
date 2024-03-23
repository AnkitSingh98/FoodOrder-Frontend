import { privateAxios } from "./AxiosService"

export const getCart = ()=>{

    return privateAxios
                .get(`/cart/`)
                .then((response)=> response.data)
}


export const addItemToCart = (productId, quantity) => {

    return privateAxios
                .post(`/cart/`, { productId, quantity } )
                .then((response)=> response.data)
}



export const removeItemFromCart = (productId) => {

    return privateAxios
                .put(`/cart/items/${productId}`)
                .then( (response) => response.data)
}


export const clearAllCartItems = () =>{
    
    return privateAxios
                .delete(`/cart/clearCart`)
                .then((response)=> response.data)
}