import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineMinus } from 'react-icons/ai'
import { toast } from 'react-toastify'

function SingleCartItem( {item, removeItem, addItem} ) {


  return (
    <>
        <Card className='border-0 shadow mt-2'>
            <Card.Body>
                <Row>
                    <Col md={2} className="d-flex  align-items-center  justify-content-center">
                        <img 
                            src={'/assets/cart.png'} 
                            alt=''
                            style={{
                                    width:"100px",
                                    objectFit:"contain"
                            }}
                            className='rounded-circle'
                        />
                    </Col>

                    <Col md={8}>

                            <h3>{ item.product.productName }</h3>
                            
                            <Row>
                                <Col>
                                    <span className='text-muted'>Quantity: </span><b>{item.quantity}</b>
                                </Col>

                                <Col>
                                <span className='text-muted'>Price: </span><b>₹{item.product.productPrice}</b>
                                </Col>

                                <Col>
                                <span className='text-muted'>Total: </span><b>₹{item.totalProductPrice}</b>
                                </Col>
                            </Row>
                            
                    </Col>

                    <Col md={2}>
                        <Row>
                            <Col className='d-grid'>
                                <Button onClick={ (event) => removeItem(item.product.productId)} variant='danger'>Remove</Button>
                            </Col>
                        </Row>

                        <Row className='mt-2'>
                            <Col className='d-grid'>
                               <Button 
                                    variant='info'
                                    onClick={(event)=>{
                                        const quantity = item.quantity + 1
                                        if(quantity >0)
                                        addItem(item.product.productId, quantity)
                                        else 
                                        toast.error("Quantity cannot be less than 1")
                                    }}
                                > 
                                
                                <BsPlusLg size="25px" /> 
                                
                                </Button>
                            </Col>

                            <Col className='d-grid'>
                                <Button 
                                    variant='info'
                                    onClick={(event)=>{
                                        const quantity = item.quantity - 1
                                        if(quantity >0)
                                        addItem(item.product.productId, quantity)
                                        else 
                                        toast.error("Quantity cannot be less than 1")
                                    }}
                                > 
                                
                                <AiOutlineMinus size="25px" /> 
                                
                                </Button>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </>
  )


}

export default SingleCartItem