import React from 'react'
import { Badge, Button, Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from "../../services/HelperService";

function SingleProductCard( {product}) {
  return (
    <>
        <Card className='m-1 shadow-sm'>
            <Card.Body>
                <Container className='text-center'>

                    <img className="rounded-circle" src={product?.imageName ? BASE_URL + '/products/images/' + product.productId + '?' + new Date().getTime() : "/assets/defaultProfile.png"} alt='' style={{ width: '100px', height: '100px', objectFit:"cover"}} />

                </Container>

                <h6>{product.productName}</h6>
                <p className='text-muted'>{product.productDesc}</p>

                <Badge pill bg='info'>{product?.category?.title}</Badge>
                <Badge pill bg={product?.stock == true ? 'success' : 'danger' } className='ms-2'>{product?.stock == true ? 'In Stock' : 'Out of Stock'}</Badge>
                
                <Container className="text-end">
                    <b> <span className='h3 text-muted'> <s>₹{product.productPrice} </s> </span> </b>
                    <b> <span className='h4 ms-2'> ₹{product.productDiscountedPrice} </span> </b>
                </Container>

                <Container className='d-grid mt-4'>
                    <Button as={Link} to={`/store/products/${product.productId}`} variant='success' size='sm'>View Product</Button>
                </Container>

            </Card.Body>
        </Card>
    </>
  )
}

export default SingleProductCard