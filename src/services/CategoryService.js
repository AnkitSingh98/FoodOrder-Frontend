import { privateAxios } from "./AxiosService"


export const addCategory = (category) => {

  return privateAxios
        .post(`/category`,category)
        .then( (response)=>response.data )

}


export const getCategory = () =>{

    return privateAxios
            .get(`/category`)
            .then((response)=> response.data)
}


export const deleteCategory = (categoryId) => {

    return privateAxios
        .delete(`/category/${categoryId}`)
        .then((response)=> {
           return response.data
        })
}


export const updateCategory = (cat) => {

    return privateAxios
        .put(`/category/${cat.categoryId}`,cat)
        .then((response)=> response.data)
}