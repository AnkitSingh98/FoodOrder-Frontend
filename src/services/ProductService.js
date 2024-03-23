import { privateAxios } from "./AxiosService"

export const createProductWithoutCategory = (product) => {

    return privateAxios
                .post(`/product`, product)
                .then( (response)=> response.data)
}

export const createProductWithCategory = (categoryId, product) => {

        return privateAxios
                .post(`/category/${categoryId}/product`, product)
                .then( (response) => {
                        console.log(`/category/${categoryId}/product`)
                        console.log(product);
                       return response.data
                })
}


export const getAllProducts = ()=>{
        
        return privateAxios
                        .get(`/products`)
                        .then((response)=> response.data)
}

export const deleteProduct = (productId) => {
        
        return privateAxios
                .delete(`/products/${productId}`)
                .then((response)=>response.data)

}

export const updateProduct = (productId, product) => {

        return privateAxios
                        .put(`/products/${productId}`, product)
                        .then( (response)=> response.data)
}

export const updateProductCategory = (pid, cid) => {

        return privateAxios
                        .put(`/product/${pid}/category/${cid}`)
                        .then((response)=> response.data)
}


export const getProductById = ( productId ) => {
        
        return privateAxios
                        .get(`/products/${productId}`)
                        .then((response)=> response.data)
}

export const getProductsByCategory = ( categoryId ) =>{

        return privateAxios
                        .get(`/category/${categoryId}/products`)
                        .then((response)=>response.data)

}

// update product image 
export const updateProductImage= (file, productId) => {

        if(file==null){
            return;
        }
    
        const data = new FormData()
        data.append("productImage", file)
        return privateAxios.post(`/products/images/${productId}`, data)
                    .then( (response) => response.data );
                    
    }