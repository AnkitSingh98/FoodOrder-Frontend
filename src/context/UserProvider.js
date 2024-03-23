import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { checkIfAdminUser, doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, getUserFromLocalStorage, isLoggedIn } from "../auth/HelperAuth";


const UserProvider = ( {children} )=>{

        const [isLogin, setIsLogin] = useState(false);
        const [userData, setUserData] = useState(null);
        const [isAdminUser, setIsAdminUser] = useState(false);


        useEffect(()=>{
            //console.log("entered useEffect UserProvider.jsx")
            setIsLogin(isLoggedIn());
            setUserData(getDataFromLocalStorage());
            //console.log("value set in context")
            setIsAdminUser( checkIfAdminUser());

            //console.log("ended useEffect UserProvider.jsx")
        },[])

        
        const doLogin = (data) => {
            doLoginLocalStorage(data);
            setIsLogin(true);
            setUserData(getDataFromLocalStorage());
            setIsAdminUser( checkIfAdminUser());
        }

        const doLogout = () =>{
            doLogoutFromLocalStorage();
            setIsLogin(false);
            setUserData(null);
            setIsAdminUser( checkIfAdminUser());
        }

        return(
            <UserContext.Provider
                value = {
                    {
                        isLogin: isLogin,
                        setIsLogin: setIsLogin,
                        userData: userData,
                        setUserData: setUserData,

                        login: doLogin,
                        logout: doLogout,

                        isAdminUser: isAdminUser,
                    }
                }
            >

                {children}
            </UserContext.Provider>
        )

}


export default UserProvider;