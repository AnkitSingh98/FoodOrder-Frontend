import { privateAxios } from "./AxiosService"


export const getOrders = async () => {

    let response = privateAxios.get(`/orders`)
    return (await response).data;
}

export const updateOrder = async (order, orderId) => {

    const response = await privateAxios.put(`/orders/${orderId}`, order)
    return response.data;

}

export const updateOrderPayment = async (orderId,paymentId) => {

    const response = await privateAxios.put(`/orders/payment/${orderId}/${paymentId}`)
    return response.data;

}

export const createOrder = async (order) =>{

    const response =  await privateAxios.post(`/orders/create-order`, order)
    return response.data;

}


export const getOrderOfUser = () =>{

    return privateAxios
                .get(`/orders/getOrder`)
                .then((response)=> response.data)

}
