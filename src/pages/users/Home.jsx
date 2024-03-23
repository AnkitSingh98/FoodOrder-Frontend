import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Home = () =>{

    const userContext = useContext( UserContext)
  
    return(
       <>
       <div className="">
        {JSON.stringify(userContext)}
        </div>

        <h1> Is user logged in: { userContext.isLogin + ''}</h1> 
        <h1>Welcome {userContext.userData?.user?.name} </h1> 
       </>
    )
}

export default Home;