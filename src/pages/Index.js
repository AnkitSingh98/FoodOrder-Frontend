import { Button } from "react-bootstrap";
import Base from "../components/Base"
import { toast } from "react-toastify";
import axios from "axios";

function Index(){

    const myToast = ()=>{
        toast.success("This is success message!!!");
    }

    const getUsersApiData = () =>{
        toast.info("Api data requested!!");
        axios
            .get('http://localhost:8081/user')
            .then( (response)=>{
                console.log(response);
            } )
            .catch( (error)=>{
                console.log(error);
            })

    }

    return(
        <Base 
              title="Home Page"
              description={"Welcome to Electronic Store"}
              buttonEnabled={true}
              buttonText="Buy"
              buttonType="success"
              buttonLink="/"
        >

            <h1>This is index Page</h1>
            <Button variant="success" onClick={myToast}>Toast here</Button>
            <Button variant="primary" onClick={getUsersApiData}> Api Data </Button>

        </Base>
        
    )
}

export default Index;