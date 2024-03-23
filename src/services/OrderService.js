import { privateAxios } from "./AxiosService"


export const getOrders = async () => {

    let response = privateAxios.get(`/orders`)
    return (await response).data;
}

export const updateOrder = async (order, orderId) => {

    const response = await privateAxios.put(`/orders/${orderId}`, order)
    return response.data;

}

export const createOrder = (order) =>{

    return privateAxios
                .post(`/orders/create-order`, order)
                .then((response)=> response.data)

}


export const getOrderOfUser = () =>{

    return privateAxios
                .get(`/orders/getOrder`)
                .then((response)=> response.data)

}
