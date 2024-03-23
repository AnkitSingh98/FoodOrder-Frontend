import { Container } from "react-bootstrap"
import Footer from "./Footer";
import {Button} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Base = ( {
                    title="Default Page title",
                    description="Welcome to my Electro Store",
                    buttonEnabled=false,
                    buttonText="Shop Now",
                    buttonType='primary',
                    buttonLink="/",
                    children
                
                } )  => {


    let myStyle={
        height:'200px'
    }

    return(
        <div>

            <Container fluid className="bg-dark p-5 text-white text-center flex align-items-center justify-content-center" style={myStyle}>

                <h3> {title} </h3>
                <p> {description  && description} </p>
                { buttonEnabled && <Button variant={buttonType} as={NavLink} to={buttonLink}> {buttonText} </Button>}

            </Container>

            {children}

            <Footer/>

        </div>

    );
}

export default Base;