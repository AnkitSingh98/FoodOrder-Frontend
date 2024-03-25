import { React, useContext, useState, useEffect } from "react";
import CartContext from "../context/CartContext";
import { Alert, Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import SingleCartItem from "../components/users/SingleCartItem";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder, updateOrderPayment } from "../services/OrderService";
import { isLoggedIn } from "../auth/HelperAuth";
import { paymentService } from "../services/PaymentService";
import UserContext from "../context/UserContext";


const Cart = ()=>{


    const { cart, setCart, addItem, removeItem, clearCart} = useContext(CartContext)
    const userContext = useContext(UserContext)

    const [ placeOrderClicked, setPlaceOrderClicked ] = useState(false)
    const [ createdOrderId, setCreatedOrderId ] = useState();

    const [ orderDetails, setOrderDetails ] = useState({
        cartId:'',
        address:'',
        razorpayOrderId:''
    })
    
    const calcTotalAmount = () => {

        let totalAmount = 0

        cart.items.map((item)=>{
            totalAmount = totalAmount + (item.totalProductPrice)
        })

        return totalAmount
    }

    // Payment logic

    const paymentStart = async (event, toPayAmount=0) => {

        event.preventDefault()

        if(toPayAmount == "" || toPayAmount== null || toPayAmount == undefined){
            toast.error("Minimum order value should be greater than ₹0!!")
            return
        }

        // we will use AJAX to send request to server to create order

        try{
            const response = await paymentService(toPayAmount)
            toast.success("Order Created")

            if(response.status == 'created'){

                let orderId = await handleOrderCreation(response.id)

                console.log("created orderId = "+ orderId)

                // Open Payment form

                let options = {

                    key: "rzp_test_itMZbddnuzzYl5",
                    amount: response.amount,
                    currency: "INR",
                    name: "Hunger hub",
                    description: "Paid for the delicious food!!",
                    image: "https://fastly.picsum.photos/id/736/200/300.jpg?hmac=WlU1DEqIVU_kIsTa682WsLgBIfCRbqhOAuKifGAq8TY",
                    order_id: response.id,
                    handler: async function(response){
                        
                        const res = await updateOrderPayment(orderId, response.razorpay_payment_id)

                        console.log(response)
                        console.log(response.razorpay_payment_id)
                        console.log(response.razorpay_order_id)
                        console.log(response.razorpay_signature)
                        alert("Congrats !! Payment successful")
                    },
                    "prefill": { 
                        "name": "", 
                        "email": "",
                        "contact": "" 
                    },
                    "notes": {
                        "address": "VPO- Khol, Rewari, Haryana, PIN- 123103"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }

                }

                var rzp1 = new window.Razorpay(options); 

                rzp1.on("payment.failed", function(response){
                    console.log(response.error.code)
                    console.log(response.error.description)
                })

                rzp1.open();

                // document.getElementById('rzp-button1').onclick = function(e){
                //     rzp1.open();
                //     e.preventDefault();
                // }

            }
            
        }catch(error){
            console.log(error)
            toast.error("Error while making payment!!")
        }
    }


    const handleOrderCreation =  async (rzpOrderId) =>{

        //event.preventDefault()

        orderDetails.address = userContext.userData.user.address;
        orderDetails.razorpayOrderId = rzpOrderId
        orderDetails.cartId = cart.cartId

        if(orderDetails.address == ''){
            toast.info("Address required !!",{
                position: "top-right"
            })
           return
        }


        try{
            const response = await createOrder(orderDetails)
            console.log(response)
            toast.success("Order Created !! Proceed for payment..")
            return response.orderId
        }catch(error){
            console.log(error)
            toast.error("Error while creating Order !!")
        }

        
                
    }


    const orderFormView = () => {

        return(
            <Form onSubmit={(event)=> {
                console.log("form submitted")
                paymentStart(event, calcTotalAmount())
            }}>

                <FormGroup className="mt-3"> 
                   {/*  <Form.Label>Address</Form.Label> */}
                    <Form.Control 
                        rows={6}
                        as={'textarea'}
                        placeholder="Enter here"
                        value={userContext.userData.user.address}
                        disabled

                        // onChange={ (event)=>{
                        //     setOrderDetails({
                        //         ...orderDetails,
                        //         address: event.target.value
                        //     })
                        // }}

                    />
                </FormGroup>

                <Container className="mt-3 text-center">
                    <Button type="submit" variant="success" size="sm">
                        Confirm Order and Proceed to Pay
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
                                       // { <Button onClick={(event)=> paymentStart(calcTotalAmount())} variant="success" size="lg">Place Order and Pay</Button> }

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
                                    <h4>Your delivery address:</h4>
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