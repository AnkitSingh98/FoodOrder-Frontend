import { Container } from "react-bootstrap";


const Footer = () =>{

    return(

        <Container fluid className="bg-dark text-white text-center p-4" style={ {position: "absolute", bottom: '0px'} }>

            <h3>We provide best products</h3>
            <p>All Rights Reserved</p>

        </Container>
        
    )

}


export default Footer;