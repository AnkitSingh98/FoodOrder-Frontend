import { useContext, useEffect, useState } from "react"
import { Alert, Breadcrumb, Button, Col, Container, ListGroup, Row } from "react-bootstrap"
import { getCategory } from "../../services/CategoryService"
import { toast } from "react-toastify"
import { getAllProducts, getProductsByCategory } from "../../services/ProductService"
import SingleProductCard from "./SingleProductCard"
import { Link } from "react-router-dom"
import UserContext from "../../context/UserContext"

const Store = () => {


    const [ categories, setCategories ] = useState(null)
    const [ products, setProducts ] = useState(null)
    const [ selectedCategoryTitle, setSelectedCategoryTitle] = useState("all")
    const { isLogin } = useContext(UserContext)

    
    useEffect(()=>{

        // Call Backend API for fetching products
        getCategory()
                .then((response)=>{
                    console.log(response)
                    setCategories(response)
                })
                .catch((error)=>{
                    console.log(error)
                    toast.error("Error while loading categories from server !!")
                })
    

        // Call Backend API for fetching products
        loadAllProducts()

    },[])
    

    // Backend API for fetching all products
    const loadAllProducts = () => {

        setSelectedCategoryTitle("all")

        getAllProducts()
        .then((response)=>{
            console.log(response)
            setProducts(response)
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Error while loading Products from Server !!")
        })

    }


    // Backend API for fetching products by category
    const loadProductsByCategory = (category) => {

        setSelectedCategoryTitle(category.title)

        getProductsByCategory(category.categoryId) 
        .then((response)=>{
            console.log(response)
            setProducts(response)
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Error while loading Products for category !!")
        })

    }



    const categoryView = () => {
        return categories && (
            <>
                <ListGroup variant="flush" className="sticky-top">
                    <ListGroup.Item
                        onClick={ (event)=> loadAllProducts() }
                        action
                    >
                        <span className="ms-2">All Categories</span>
                    </ListGroup.Item>

                    {
                        categories.map((category)=>{
                            return(
                                <ListGroup.Item 
                                    // as={Link} 
                                    // to={`/store/${category.categoryId}/${category.title}`}  
                                    /* Above Page is not used so pls ignore above commented code*/

                                    onClick={ (event)=> loadProductsByCategory(category) }
                                    action 
                                    key={category.categoryId}
                                >
                                    <img src={'/assets/defaultProfile.png'} alt="" style={{width: '40px', height: '40px'}}/>
                                    <span className="ms-2">{category.title}</span>

                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
            </>
        )
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


    
    return isLogin ? (
        <>
            <Container fluid className="px-5 pt-5">
                <Row>

                    <Container fluid className="px-5 pt-5 mb-2">
                        <Breadcrumb className="mx-5">
                            <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                            <Breadcrumb.Item>{selectedCategoryTitle}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>

                    <Col md={2}>
                        { categoryView() }
                    </Col>

                    <Col md={10}>
                        {
                          products?.length >0 ? productView() : <h3 className="mt-5 text-center">No Products for this category...</h3> 
                        }
                    </Col>

                </Row>
            </Container>
        </>
    ) :

    
        <Alert className="my-5 mx-5 p-3 text-center" variant="danger"> 
            <h3> You are not logged in !! </h3> 
            <p> In order to access store do login first</p> 
            <Button as={Link} to="/login" variant="info" className="mt-3">Go to Login Page</Button>
        </Alert>
    
}

export default Store