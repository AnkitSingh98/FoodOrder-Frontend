import { React, useContext, useState } from "react";
import CartContext from "../context/CartContext";
import { Alert, Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import SingleCartItem from "../components/users/SingleCartItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../services/OrderService";
import { isLoggedIn } from "../auth/HelperAuth";

const Cart = ()=>{


    const { cart, setCart, addItem, removeItem, clearCart} = useContext(CartContext)
    const [ placeOrderClicked, setPlaceOrderClicked ] = useState(false)

    const [ orderDetails, setOrderDetails ] = useState({
        cartId:'',
        address:''
    })
    
    const calcTotalAmount = () => {

        let totalAmount = 0

        cart.items.map((item)=>{
            totalAmount = totalAmount + (item.totalProductPrice)
        })

        return totalAmount
    }


    const handleOrderCreation = (event) =>{

        event.preventDefault()

        if(orderDetails.address == ''){
            toast.info("Address required !!",{
                position: "top-right"
            })
           return
        }

        orderDetails.cartId = cart.cartId

        createOrder(orderDetails)
                .then((response)=>{
                    console.log(response)
                    toast.success("Order Created !! Proceed for payment..")
                })
                .catch((error)=>{
                    console.log(error)
                    toast.error("Error while creating Order !!")
                })
    }


    const orderFormView = () => {

        return(
            <Form onSubmit={handleOrderCreation}>

                <FormGroup className="mt-3"> 
                    <Form.Label>Billing Address</Form.Label>
                    <Form.Control 
                        rows={6}
                        as={'textarea'}
                        placeholder="Enter here"
                        value={orderDetails.address}

                        onChange={ (event)=>{
                            setOrderDetails({
                                ...orderDetails,
                                address: event.target.value
                            })
                        }}

                    />
                </FormGroup>

                <Container className="mt-3 text-center">
                    <Button type="submit" variant="success" size="sm">
                        Create Order and Proceed to Pay
                    </Button>
                </Container>
            </Form>
        )
    }


    return(
        <Container fluid = { placeOrderClicked } className="px-5">
            <Row>
                <Col md={ placeOrderClicked ? 8 : 12} className="animation">
            {
                (isLoggedIn()) ? (
                <>
                <Container>
                <Card className="mt-3 bg-light border-0">
                    <Card.Body>
                        <Row>
                            <Col>
                                <h3>Cart</h3>
                            </Col>

                            <Col className="text-end">
                                <h3>{cart?.items?.length} items</h3>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                </Container>

                {
                (cart?.items?.length > 0 ) ?
                        (
                            <>
                                <Container>
                                    <Row>
                                        <Col>
                                            {
                                                
                                                cart.items.map((item=>{
                                                    console.log("cartItem")
                                                    return <SingleCartItem 
                                                                item={item}
                                                                removeItem = { removeItem }
                                                                addItem = { addItem }
                                                            />
                                                }))
                                            }
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col className="text-end">
                                            <h3> Total Amount: <b>₹{ calcTotalAmount() }</b> </h3>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col className="text-center">

                                        {
                                        !placeOrderClicked &&
                                        <Button onClick={(event)=> setPlaceOrderClicked(true)} variant="success" size="lg">Place Order</Button>

                                        }
                                        </Col>
                                    </Row>
                                </Container>
                            </>
                        )

                    :
                        (
                            <>
                                <Alert className="my-5 mx-5 p-3 text-center" variant="danger"> 
                                    <h3> No items in cart !! </h3> 
                                    <Button as={Link} to="/store" variant="info" className="mt-3">Start adding Products in Cart</Button>
                                </Alert>
                            </>
                                
                        )


                       
                        
                }
                        </>
    ) :

    (
        <Alert className="my-5 mx-5 p-3 text-center" variant="danger"> 
            <h3> You are not logged in !! </h3> 
            <p> In order to access your cart do login first</p>
            <Button as={Link} to="/login" variant="info" className="mt-3">Go to Login Page</Button>
        </Alert>
    )

 }
    </Col>

                {
                    placeOrderClicked && (
                        <Col md={4}>
                            <Card className="mt-3 shadow-sm bg-dark text-white">
                                <Card.Body>
                                    <h4>Fill the form to complete order</h4>
                                    { orderFormView() }
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }

            </Row>
        </Container>

    )

    
}
export default Cart