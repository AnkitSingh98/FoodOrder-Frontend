import { useEffect } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
//import image from "../assets/logo1.png"

const CategoryView = ( {
                        category = {
                                        title:"Default title",
                                        description:"Default Description"
                                    },
                        updateCat,
                        deleteCat
                        }
                    ) =>
    {



        const handleUpdateCategory = (category) => {

            updateCat(category)

        }


        const handleDeleteCategory = (category) => {
            
            console.log("Inside CategoryView Delete method:: "+ JSON.stringify(category) )
            deleteCat(category)

        }


    return(
        
        <div className="mb-3">
 
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">

                        <Col md={2}>
                            <img 
                                src={ (category.coverImage ? (category.coverImage.startsWith("http") ? category.coverImage : "/assets/defaultProfile.png") : "/assets/defaultProfile.png")} 
                                alt="Category image" 
                                style={{
                                    width:"100px",
                                    height:"100px",
                                    objectFit:"cover"
                                }}
                                className="rounded-circle"
                                />
                        </Col>

                        <Col md={8}>

                            <h5>{category.title}</h5>
                            <p>{category.description}</p>

                        </Col>

                        <Col>
                            <Container className="d-grid">
                                <Button variant="success" 
                                        size="sm" 
                                        onClick={ (event) => handleUpdateCategory(category) } 
                                > Update</Button>

                                <Button variant="danger" 
                                        className="mt-2" 
                                        size="sm" 
                                        onClick={ (event)=>handleDeleteCategory(category) } 
                            >Delete</Button>
                            </Container>
                        </Col>
                    </Row>
                    

                </Card.Body>
            </Card>
        </div>
    )
}

export default CategoryView