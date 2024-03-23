import { useEffect, useState } from "react";
import { getOrders, updateOrder } from "../../services/OrderService";
import { Badge, Button, Card, Col, Container, Form, FormGroup, ListGroup, Modal, Row, Table } from "react-bootstrap";
import SingleOrderView from "../../components/admin/SingleOrderView";
import { formatDate } from "../../services/HelperService";
import { toast } from "react-toastify";

const AdminOrders = () => {

    const [ ordersData, setOrdersData] = useState(undefined); 
    const [ selectedOrder, setSelectedOrder ] = useState(undefined);

    const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
    const handleCloseOrderDetailsModal = () => setShowOrderDetailsModal(false);
    const handleShowOrderDetailsModal = () => setShowOrderDetailsModal(true);

    const [showUpdateModal, setShowUpdateModal ] = useState(false);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    

    useEffect( ()=>{

        getOrdersLocal()

    },[])

    const getOrdersLocal = async () => {

        try{
            const response = await getOrders();
            console.log(response)
            setOrdersData(response)
        }
        catch(error) {
            console.log(error)
        }
    }


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


    const handleUpdateOrder = (order) => {

        console.log(order)
        handleShowUpdateModal()
        setSelectedOrder(order)

    }


    const handleUpdateSaveChanges = async (event) => {

        event.preventDefault()

        if(selectedOrder.user.name == ''){
            toast.error("Name required !!")
            return
        }

        if(selectedOrder.user.phone == ''){
            toast.error("Phone required !!")
            return
        }

        if(selectedOrder.billingAddress.trim() == ''){
            toast.error("Billing Address required !!") 
            return
        }


        // Calling backend API

        try{
                const response = await updateOrder(selectedOrder, selectedOrder.orderId)
                console.log(response)
                toast.success("Order details updated", {
                    position: "top-right"
                })

                console.log("selectedOrder.orderId")
                console.log(selectedOrder.orderId)
                
                const newData = ordersData.map((o)=>{
                    if(o.orderId == selectedOrder.orderId)
                        return response;

                        return o;
                    
                    // console.log("Loop order Id = ")
                    // console.log(o.orderId)
         
                })

                setOrdersData(newData)

                handleCloseUpdateModal()
        }catch(error){
                console.log(error)
                toast.error("Error while updating the Order !!")
        }
    }

    const updateOrderButtonModal = () => {

      

        return(
            
            (selectedOrder) &&

            <>
                <Modal size="lg" show={showUpdateModal} onHide={handleCloseUpdateModal}>
                    
                    <Modal.Body>
                         { JSON.stringify(selectedOrder) }
                        <Form onSubmit={handleUpdateSaveChanges}>

                            <FormGroup className="mt-3">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control 
                                        type="text"
                                        value={ selectedOrder.user.name }
                                        onChange={
                                            (event) => setSelectedOrder({
                                                ...selectedOrder,
                                                user: {

                                                    name: event.target.value
                                                }
                                            })
                                        }
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Customer Phone</Form.Label>
                                <Form.Control 
                                        type="text"
                                        value={ selectedOrder.user.phone }
                                        onChange={
                                            (event) => setSelectedOrder({
                                                ...selectedOrder,
                                                user: {

                                                    phone: event.target.value
                                                }
                                            })
                                        }
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Billing Address</Form.Label>
                                <Form.Control 
                                        type="text"
                                        as={'textarea'}
                                        rows={5}
                                        value={ selectedOrder.billingAddress }
                                        onChange={
                                            (event) => setSelectedOrder({
                                                ...selectedOrder,
                                                billingAddress: event.target.value
                                            })
                                        }
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Payment Status</Form.Label>
                                <Form.Select
                                        onChange={ (event)=>{
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                paymentStatus: event.target.value
                                            })
                                        }}
                                >
                                    <option selected={selectedOrder.paymentStatus=== "NOT PAID"} value="NOT PAID">NOT PAID</option>
                                    <option selected={selectedOrder.paymentStatus=== "PAID"} value="PAID">PAID</option>
                                </Form.Select>
                            </FormGroup>


                            <FormGroup className="mt-3">
                                <Form.Label>Order Status</Form.Label>
                                <Form.Select
                                        onChange={ (event)=>{
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                orderStatus: event.target.value
                                            })
                                        }}
                                >
                                    <option selected={selectedOrder.paymentStatus=== "CREATED"} value="CREATED">PENDING</option>
                                    <option selected={selectedOrder.paymentStatus=== "DISPATCHED"} value="DISPATCHED">DISPATCHED</option>
                                    <option selected={selectedOrder.paymentStatus=== "ONWAY"} value="ONWAY">ONWAY</option>
                                    <option selected={selectedOrder.paymentStatus=== "DELIVERED"} value="DELIVERED">DELIVERED</option>
                                </Form.Select>
                            </FormGroup>

                            <Container className="text-center mt-3 mb-2">
                                <Button type="submit" variant="primary">
                                    Save Changes
                                </Button>
                            </Container>

                        </Form>
                    </Modal.Body>
                </Modal>

            </>
            
        )
    }


    const ordersView = () =>{
        return(

            <Card className="border-0 shadow-sm">

                <Card.Body>
                <h3 className="my-4 mx-2">All Orders </h3>
                   {
                    (ordersData) &&

                        ordersData.map( (order) => {
                           
                            return <SingleOrderView
                                        key = {order.orderId}
                                        order = {order}
                                        handleOrderDetails = { handleOrderDetails }
                                        handleUpdateOrder = { handleUpdateOrder }
                                    />
                        })

                   }

                </Card.Body>
            </Card>

        )
    }



    return(
        <>
            <Container>
                <Row>
                    <Col>
                        { ordersView() }
                        { orderDetailsButtonModal() }
                        { updateOrderButtonModal() }
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AdminOrders
