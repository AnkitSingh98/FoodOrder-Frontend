// Local Storage


// Save data

export const doLoginLocalStorage = (data) =>{
    localStorage.setItem("userData", JSON.stringify(data));
}


// Fetch data


export const getDataFromLocalStorage = () =>{

    //console.log("entered getDataFromLocalStorage()")

    const data = localStorage.getItem("userData");
    
    console.log("data fetched from localStorage = "+JSON.parse(data))
    if(data != null){
        return JSON.parse(data);
    }
   

    return null;
    
}


export const getUserFromLocalStorage = () =>{

    const data = getDataFromLocalStorage();
    if(data != null)
    return data.user;

    return null;

}


export const getTokenFromLocalStorage = () =>{

    const data = getDataFromLocalStorage();
    if(data != null)
    return data.token;

    return null;
    
}


export const isLoggedIn = () => {
    if(getTokenFromLocalStorage())
    return true;

    return false;
}


export const checkIfAdminUser = () => {
    if(isLoggedIn()){
        const user = getUserFromLocalStorage();
        const roles = user.roles;
        if(roles.find((role)=> role.id == 101))
            return true;
        else
            return false;
    }

    return false;
}



//Remove data

export const doLogoutFromLocalStorage = () =>{
    localStorage.removeItem("userData");
}

