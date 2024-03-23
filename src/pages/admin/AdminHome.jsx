import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { BsBorderOuter } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'

const AdminHome = () => {

    return(
        <>
            <Container>
                <Row>
                    <Col md={
                        {
                            span: 6,offset:3
                        }
                    }>

                        <Card className="shadow-sm text-center">
                            <Card.Body>

                                <h3 className="text-center">Welcome to Admin Dashboard</h3>
                                <p className="text-muted">Customized dashboard for admin, to add categories, to add Products, to view categories, to view Products, manage orders, manage users and much more...</p>

                                <Container className="d-grid gap-3">
                                    <Button as={Link} to={``} variant="outline-secondary">Start Managing Categories</Button>
                                    <Button as={Link} to={``} variant="outline-secondary">Start Managing Categories</Button>
                                    <Button as={Link} to={``} variant="outline-secondary">Start Managing Categories</Button>
                                    <Button as={Link} to={``} variant="outline-secondary">Start Managing Categories</Button>
                                </Container>

                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>

                <Row className="mt-5">

                    <Col md={6}>
                        <Card className="shadow-sm mt-3">
                            <Card.Body className=" text-center">
                                <AiOutlineShoppingCart size={80}/>
                                <h3 className="mt-3">( 2433 )</h3>
                                <h3 className="text-muted mt-3">Number of Products</h3>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6}>
                        <Card className="shadow-sm mt-3">
                            <Card.Body className=" text-center">
                                <BiCategory size={80}/>
                                <h3 className="mt-3">( 8 )</h3>
                                <h3 className="text-muted mt-3">Number of Categories</h3>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mt-3">
                        <Card className="shadow-sm">
                            <Card.Body className=" text-center">
                                <BsBorderOuter size={80}/>
                                <h3 className="mt-3">( 88 )</h3>
                                <h3 className="text-muted mt-3">Number of Orders</h3>

                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className="mt-3">
                        <Card className="shadow-sm">
                            <Card.Body className=" text-center">
                                <AiOutlineUser size={80}/>
                                <h3 className="mt-3">( 100+ )</h3>
                                <h3 className="text-muted mt-3">Number of Users</h3>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}


export default AdminHome