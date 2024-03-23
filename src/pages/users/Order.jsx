import { useEffect, useState } from "react";
import { getOrderOfUser } from "../../services/OrderService";
import { toast } from "react-toastify";
import { Alert, Badge, Button, Card, Col, ListGroup, Modal, Row, Table } from "react-bootstrap";
import SingleOrderView from "../../components/admin/SingleOrderView";
import { formatDate } from "../../services/HelperService";

const Order = () =>{

        const [ orders, setOrders ] = useState(null)
        
        const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
        const handleCloseOrderDetailsModal = () => setShowOrderDetailsModal(false);
        const handleShowOrderDetailsModal = () => setShowOrderDetailsModal(true);

        const [ selectedOrder, setSelectedOrder ] = useState(undefined);


        useEffect(()=>{

            getOrderOfUser()
                    .then((response)=> {
                        console.log(response)
                        setOrders(response)
                    })
                    .catch((error)=>{
                        console.log(error)
                        toast.error("Error while loading orders !!")
                    })
        },[])



        const handleOrderDetails = (order) => {
        
            handleShowOrderDetailsModal()
            setSelectedOrder(order)
    
            console.log("selectedOrder = ")
            console.log(selectedOrder)
            
        }
    
    
        const orderDetailsButtonModal = () => {
    
            return(
    
            <Modal size="lg" show={showOrderDetailsModal} onHide={handleCloseOrderDetailsModal}> 
            
            <Modal.Body>
                <Card  className="border-0 shadow-sm">
    
                    <Card.Body>
                    <h3 className="my-4 mx-2">All Orders </h3> 
    
            { selectedOrder &&
                <>
                    <Row>
                        <Col>
                            <b>OrderId: </b> {selectedOrder.orderId}
                        </Col>
    
                        <Col>
                            <b>Customer Name: </b>{selectedOrder.user.name}
                        </Col>
                    </Row>
    
                    <Row className="mt-3">
                        <Col>
                            <Table bordered striped>
                                <tbody>
    
                                    <tr>
                                        <td>Phone</td>
                                        <td className="fw-bold">{selectedOrder.user.phone}</td> 
                                    </tr>
    
                                    <tr>
                                        <td>Items</td>
                                        <td className="fw-bold">{selectedOrder.items.length}</td> 
                                    </tr>
    
                                    <tr className={ selectedOrder.paymentStatus === 'NOT PAID' ? 'table-danger' : 'table-success'}>
                                        <td>Payment Status</td>
                                        <td className="fw-bold">{selectedOrder.paymentStatus}</td> 
                                    </tr>
    
                                    <tr>
                                        <td>Order Status</td>
                                        <td className="fw-bold">{selectedOrder.orderStatus}</td> 
                                    </tr>
    
                                    <tr>
                                        <td>Ordered Date</td> 
                                        <td className="fw-bold">{ formatDate(selectedOrder.orderCreated) }</td> 
                                    </tr>
    
                                    <tr>
                                        <td>Billing Address</td>
                                        <td className="fw-bold">{selectedOrder.billingAddress}</td> 
                                    </tr>
    
                                    <tr>
                                        <td>Delivered Date</td> 
                                        <td className="fw-bold">{ formatDate(selectedOrder.orderDelivered) }</td> 
                                    </tr>
                                    
                                    <tr>
                                        <td>Order Amount</td>
                                        <td className="fw-bold">₹{selectedOrder.orderAmount}</td> 
                                    </tr>
      
                                </tbody>
                            </Table>
    
    
                            <Card>
                                <Card.Body>
                                    <h3>Order Items</h3>
    
                                    <ListGroup>
                                        {
                                            selectedOrder.items.map((item)=>{
                                                return (
                                                    <ListGroup.Item className="mt-3 border-0 shadow-sm" >
                                                    <Row>
                                                        <Col md={1} className="d-flex align-items-center" >
                                                            <img
                                                                style={{
                                                                    width: '40px'
                                                                }}
                                                                src={"/assets/defaultProfile.png"}
                                                                alt=""
                                                            />
                                                        </Col>
    
                                                        <Col md={11}>
                                                            <h5>{item.product.productName}</h5>
                                                            <Badge pill > Quantity: {item.quantity}</Badge>
                                                            <Badge pill bg="success" className="ms-2" > Amount for this Item: {item.totalProductPrice}</Badge>
    
                                                            <p className="text-muted mt-1" >Product Id: {item.product.productId}</p>
                                                        </Col>
                                                    </Row>
    
                                                    </ListGroup.Item>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            }
                    </Card.Body>
                </Card>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseOrderDetailsModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    
            )
    
        }


        const ordersView = () => {

            return(

                <Card className="border-0 shadow-sm">
    
                    <Card.Body>
                    <h3 className="my-4 mx-2">All Orders </h3>
                       {
                        (orders) &&
    
                        orders.map( (order) => {
                               
                                return <SingleOrderView
                                            key = {order.orderId}
                                            order = {order}
                                            handleOrderDetails = { handleOrderDetails }
                                        />
                            })
    
                       }

                       {
                        orders?.length <=0 && 
                        <Alert className="text-center" variant="danger">
                            <h3>No Items in your Order</h3>
                        </Alert>
                       }
    
                    </Card.Body> 
                </Card>
    
            )
        }

    return(
        <>
            <Row>
                <Col md={{
                    span:10,
                    offset:1
                }}>

                {ordersView()}

                {orderDetailsButtonModal()}

                </Col>
            </Row>
        </>
    )
}


export default Order;