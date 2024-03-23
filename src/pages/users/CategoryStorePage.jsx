import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductsByCategory } from '../../services/ProductService'
import { toast } from 'react-toastify'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import SingleProductCard from '../../components/users/SingleProductCard'
import { getCategory } from '../../services/CategoryService'

function CategoryStorePage() { 
    
    {/* This Page is not used so pls ignore */}

    const { categoryId, categoryTitle } = useParams()
    const [ products, setProducts ] = useState(null)


    useEffect(()=>{


        loadProductsByCategory(categoryId)

                
    },[])

    const loadProductsByCategory = (categoryId) => {

        getProductsByCategory(categoryId)
        .then((response)=>{
            console.log(response)
            setProducts(response)
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Error while loading Products for category !!")
        })

    }




    const productView = () => {
        return products && (

            <>
                <Row>
                    {
                        products.map((product)=>{
                            return(
                                product.live &&

                                <Col key= {product.productId} md={4}> 

                                    <SingleProductCard 
                                            product= {product}
                                    />

                                </Col>

                            )
                        })
                    }
                </Row>
            </>
        )
    }


  return (
    <>
            <Container fluid className="px-5 pt-5">
                <Row>
                
                    <Col md={10} className='px-5'>
                        { productView() }
                    </Col>

                </Row>
            </Container>
    </>
  )


}

export default CategoryStorePage