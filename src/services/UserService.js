import { privateAxios, publicAxios } from "./AxiosService";

export const registerUser = (userData) => {
    return publicAxios.post(`/user`, userData)
                .then( (response) => response.data);
}


export const loginUser = (loginData) => {

    console.log(loginData);
    return publicAxios
            .post(`/auth/login`, loginData)
            .then( (response) => {
                console.log("myrespone;;;;;;;:"+ JSON.stringify(response));
                return response.data;
            });

}


export const getUser = (userId) => {

    return publicAxios
            .get(`/user/${userId}`)
            .then( (response) => response.data )
}


export const updateUser = (user) => {
    console.log("inside userService" + JSON.stringify(user))
    return privateAxios
    .put(`/user/${user.userId}`,user)
    .then( (response) =>response.data );
}


export const getAllUsers = () =>{

    return privateAxios
                .get(`/user`)
                .then((response)=>{
                    return response.data
                })
}


// update user profile picture
export const updateUserProfilePicture = (file, userId) => {

    if(file==null){
        return;
    }

    const data = new FormData()
    data.append("userImage", file)
    return privateAxios.post(`/image/${userId}`, data)
                .then( (response) => response.data);
                
}