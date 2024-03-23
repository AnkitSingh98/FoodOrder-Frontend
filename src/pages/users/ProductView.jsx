import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductById } from '../../services/ProductService'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import ShowHtml from '../../components/users/ShowHtml'
import CartContext from '../../context/CartContext'

function ProductView() {


    const [ product, setProduct ] = useState(null)

    const { productId } = useParams()

    const { cart, addItem } = useContext(CartContext)

    let [currentQuantity, setCurrentQuantity] = useState(0);

    useEffect(()=>{

        getProductById( productId )
                .then((response)=>{
                    console.log(response)
                    setProduct(response)
                })
                .catch((error)=>{
                    console.log(error)
                    toast.error("Error while loading product from server !!")
                })

                console.log('cart = ' + JSON.stringify(cart) )
                console.log("productId = " + productId)

                if(cart!=null){

                    const selectedItem = cart?.items?.filter( (item) => {
                        console.log("item.productId = " + item.product.productId)
                        return item?.product?.productId == productId;
                    })
    
                    console.log("selectedItem = " + JSON.stringify(selectedItem))
                    //console.log(selectedItem[0]?.quantity)
    
                    if( selectedItem?.length != 0)
                    setCurrentQuantity( selectedItem[0]?.quantity)
                
                }

                console.log("currentQuantity = " + currentQuantity)

                
    },[])


    const productView = () =>{

        return(
                <Container className='py-4'>
                    <Row>
                        <Col>
                            <Card className='mt-3 border-0 shadow-sm'>
                                <Card.Body>

                                <Container className=''>
                                    <Row>

                                        <Col>
                                            <img 
                                            src={'/assets/phone.png'} 
                                            alt='' 
                                            style={{
                                                width: '500px'
                                            }}

                                            />
                                        </Col>

                                        <Col>
                                            <h3>{product.productName}</h3>
                                            <p className='text-muted'>Short description <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, magnam</span></p>

                                            <Badge pill bg='info'>{product?.category?.title}</Badge> 
                                            <Badge pill bg={product?.stock == true ? 'success' : 'danger' } className='ms-2'>{product?.stock == true ? 'In Stock' : 'Out of Stock'}</Badge>
                                            
                                            <Container className="text-center">
                                                <b> <span className='h1 text-muted'> <s>₹{product.productPrice} </s> </span> </b>
                                                <b> <span className='h2 ms-2'> ₹{product.productDiscountedPrice} </span> </b>
                                            </Container>

                                            <Container className='d-grid mt-4'>
                                            {
                                                (currentQuantity != 0) ? 
                                                    <Button 
                                                        disabled={!product?.stock} 
                                                        onClick={ (event)=> {
                                                            addItem( productId, currentQuantity+1)
                                                            setCurrentQuantity(currentQuantity+1)
                                                        }} 
                                                        variant='warning' 
                                                        size='sm'> Add to Cart ({currentQuantity})</Button>
                                                :
                                                    <Button 
                                                        disabled={!product?.stock} 
                                                        onClick={ (event)=> addItem( productId, currentQuantity+1) } 
                                                        variant='warning' 
                                                        size='sm'>Add to Cart</Button>
                                            }
                                                <Button as={Link} to={'/store'} className='mt-2' variant='info' size='sm'>Go Back to Store</Button>
                                        </Container>
                                        </Col>

                                    </Row>
                                </Container>

                                <div className='mt-5'>
                                    <ShowHtml htmlText={product.productDesc} />
                                </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            )
    }


  return product &&  (

        productView()

  )
}

export default ProductView