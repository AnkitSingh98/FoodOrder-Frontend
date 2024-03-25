import { privateAxios } from "./AxiosService"

export const paymentService = async (amountToPay) =>{

    const response = await privateAxios.post(`/payment/create_order/${amountToPay}`)
    return response.data

}