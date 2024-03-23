import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { formatDate } from "../../services/HelperService";
import { Link } from "react-router-dom";

const SingleOrderView = ( {order, handleOrderDetails, handleUpdateOrder} ) => {

    let cardColor = false;

return(

    <>
    
    { 
        order.user.roles.map((role)=>{
        if(role.id == 101)  // If role is admin show card in blue color else in green color
            cardColor=true;
        })

    }


        <Card className="border-0 shadow-sm mb-5"  bg= { cardColor ? 'light' : 'success' } >
            <Card.Body>
                <Row>
                    <Col>
                        <b>OrderId: </b> {order.orderId}
                    </Col>

                    <Col>
                        <b>Ordered By: </b><Link to={`/users/profile/${order.user.userId}`} > {order.user.name} </Link> 
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Table bordered striped className= {order.paymentStatus == 'PAID' ? 'table-success' : 'table-danger'}>
                            <tbody>

                                <tr>
                                    <td>Phone</td>
                                    <td className="fw-bold">{order.user.phone}</td> 
                                </tr>

                                <tr>
                                    <td>Items</td>
                                    <td className="fw-bold">{order.items.length}</td> 
                                </tr>

                                <tr className={ order.paymentStatus === 'NOT PAID' ? 'table-danger' : 'table-success'}>
                                    <td>Payment Status</td>
                                    <td className="fw-bold">{order.paymentStatus}</td> 
                                </tr>

                                <tr>
                                    <td>Order Status</td>
                                    <td className="fw-bold">{order.orderStatus}</td> 
                                </tr>

                                <tr>
                                    <td>Order Amount</td>
                                    <td className="fw-bold">{order.orderAmount}</td> 
                                </tr>

                                <tr>
                                    <td>Ordered Date</td>
                                    <td className="fw-bold">{ formatDate(order.orderCreated) }</td> 
                                </tr>

                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Container className="text-center">
                {
                    handleUpdateOrder &&

                    <Button onClick={(event) => handleUpdateOrder(order) } className="me-2" variant="danger" size="sm">
                    
                     Update
                     
                     </Button>
                }

                {
                    ( !handleUpdateOrder && order.paymentStatus == 'NOT PAID') && 

                    <Button onClick={(event) => {} } className="me-2" variant="success" size="sm">
                    
                     Pay to complete Order
                     
                     </Button>
                }


                    <Button onClick={(event) => handleOrderDetails(order) } variant="primary" size="sm"> View Order Details</Button>
                </Container>

            </Card.Body>
        </Card>
    </>
)


}

export default SingleOrderView;