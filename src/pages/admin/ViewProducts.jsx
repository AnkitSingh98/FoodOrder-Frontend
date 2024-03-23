import { useEffect, useRef, useState } from "react"
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Modal, Row, Table } from "react-bootstrap"
import { deleteProduct, getAllProducts, updateProduct, updateProductCategory, updateProductImage } from "../../services/ProductService";
import { toast } from "react-toastify";
import SingleProductView from "../../components/admin/SingleProductView";
import ShowHtml from "../../components/users/ShowHtml";
import { Editor } from '@tinymce/tinymce-react'
import { getCategory } from "../../services/CategoryService";
import { BASE_URL } from "../../services/HelperService";


const ViewProducts = () => {

    const [products, setProducts] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null)
    const [categories, setCategories] = useState(null)
    const [updatedCategoryId, setUpdatedCategoryId] = useState(null)

    const [newImage, setNewImage] = useState({
        placeholder: null,
        file: null
    }) 

    const editorRef = useRef() 
 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setNewImage({
            placeholder: null,
            file: null
        })
    }
    const handleUpdateModalShow = () => setShowUpdateModal(true);


    useEffect(()=>{

        getAllProducts()
            .then((response)=>{
                console.log("response= "+ response)
                setProducts(response)
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error while fetching products from server") 
            })
    },[])

    useEffect( () => {

        getCategory().
            then((response)=>{
                console.log(response)
                setCategories(response)
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error while fetching categories")
            })

    },[])


    // onClick method for Delete Button
    const deleteProductLocal = (productId) => {

        console.log(productId)
        deleteProduct(productId)
                .then((response)=>{
                    console.log(response)
                    toast.success("Product deleted successfully !!")

                  const newProducts = products.filter((product)=> product.productId != productId)
                  setProducts(newProducts)
                })
                .catch((error)=>{
                    console.log(error)
                    toast.error(error)
                })
    }


    // onClick method for View Button
    const viewProduct = (product) => {
        
        console.log(product.productName)
        setCurrentProduct(product)
        handleShow()

    }


    // onClick method for Update Button
    const updateProductLocal = (product) => {
        
        setCurrentProduct(product)
        setUpdatedCategoryId(product?.category?.categoryId)
        handleUpdateModalShow()
        console.log(product)
    }


    // Modal for View Product Button
    const viewProductButtonModal = () =>{
    return(
        <>
            <Modal size="lg" show={show} onHide={handleClose}> 

            <Modal.Header closeButton>
                <Modal.Title>{currentProduct?.productName}</Modal.Title> 
            </Modal.Header>

            <Modal.Body>

                <Container className="text-center py-3">
                    <img src={currentProduct?.imageName ? BASE_URL + '/products/images/' + currentProduct.productId + '?' + new Date().getTime() : "/assets/defaultProfile.png"} alt="Product Image" style = {{objectFit: 'cover'}} height={200} width={200} className="img-fluid"  />
                </Container>

                <Table stripped bordered responsive className="text-center">

                    <thead>
                        <tr>
                            <th>Info</th>
                            <th className="fw-bold">Value</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>Product Id</td>   
                            <td className="fw-bold">{currentProduct?.productId}</td>
                        </tr>

                        <tr>
                            <td>Quantity</td>   
                            <td className="fw-bold">{currentProduct?.productQuantity}</td>
                        </tr>

                        <tr>
                            <td>Price</td>   
                            <td className="fw-bold">₹{currentProduct?.productPrice}</td>
                        </tr>

                        <tr>
                            <td>Discounted Price</td>   
                            <td className="fw-bold">₹{currentProduct?.productDiscountedPrice}</td>
                        </tr>

                        <tr className={currentProduct?.live ? '' : 'table-danger'}>
                            <td>Live</td>   
                            <td className="fw-bold">{currentProduct?.live ? 'True' : 'False'}</td>
                        </tr>

                        <tr className={currentProduct?.stock ? '' : 'table-danger'}>
                            <td>Stock</td>   
                            <td className="fw-bold">{currentProduct?.stock ? 'InStock' : 'Out of Stock'}</td>
                        </tr>

                        <tr>
                            <td>Category</td>   
                            <td className="fw-bold">{currentProduct?.category?.title}</td>
                        </tr>
                    </tbody>
                </Table>
            
            
                <div className="p-3 border border-1" > 
                    <ShowHtml htmlText={currentProduct?.productDesc} /> 
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>

        </Modal>
        </>
    )

    }


    const handleProductImageChange = (event) => {

        console.log("Image changed !!")

        const localFile = event.target.files[0]  // It has all the details of file that we have uploaded
        console.log(localFile)

        if(localFile.type === 'image/png' || localFile.type === 'image/jpg' || localFile.type === 'image/jpeg'){

            // Show preview

            const reader = new FileReader()
            reader.onload = (r) => {
                setNewImage({
                    placeholder: r.target.result,
                    file: localFile
                })

                console.log(r.target.result)
            }
            reader.readAsDataURL(localFile)
        }
        else{
            toast.error("Invalid file extension or format!! Must be .png or .jpg or .jpeg file!!")
            newImage.file = null
        }

    }

    // Modal for update button
    const updateProductButtonModal = () =>{
        return(
            <>
        {
            (currentProduct) &&

            <Modal size="xl" show={showUpdateModal} onHide={handleUpdateModalClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Update Product here</Modal.Title>
                </Modal.Header>
 
                <Modal.Body>

                <Form onSubmit={handleSaveUpdatedDetailsButton}>

                {/* Product Name */}

                    <FormGroup className="mt-3">
                       
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter here"
                            value={currentProduct.productName}
                            onChange={(event)=> setCurrentProduct({
                                ...currentProduct,
                                productName: event.target.value
                            })}   
                        /> 

                    </FormGroup>

                {/* Product description   */}

                    <FormGroup className="mt-3">

                        <Form.Label>Product Description</Form.Label>

                            <Form.Control
                                        as={'textarea'} 
                                        rows={6} 
                                        placeholder="Enter here" 
                                        value={currentProduct.productDesc}
                                        onChange={ (event)=> setCurrentProduct({
                                                ...currentProduct,
                                                productDesc: event.target.value
                                            })}
                                        /> 

                            {/* <Editor 
                                apiKey=""

                                onInit={(evt, editor) => editorRef.current = editor}

                                value={ currentProduct.productDesc }

                                init={{
                                height: 350,
                                menubar: true,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}

                                onEditorChange = {
                                            () => setCurrentProduct({
                                                ...currentProduct,
                                                productDesc: editorRef.current.getContent()
                                            })
                                        }
                            
                            /> */}

                    </FormGroup>

                    <Row>
                        <Col>
                            <FormGroup className="mt-3">

                                <Form.Label>Price</Form.Label>

                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter here"
                                    value={currentProduct.productPrice}
                                    onChange={(event)=> setCurrentProduct({
                                        ...currentProduct,
                                        productPrice: event.target.value
                                    })}
                                /> 

                            </FormGroup>
                        </Col>
                            
                        <Col>
                            <FormGroup className="mt-3">

                                <Form.Label>Discounted Price</Form.Label>

                                <Form.Control
                                    type="number" 
                                    placeholder="Enter here"
                                    value={currentProduct.productDiscountedPrice}
                                    onChange={(event)=> setCurrentProduct({
                                        ...currentProduct,
                                        productDiscountedPrice: event.target.value
                                    })}
                                /> 

                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup className="mt-3">

                        <Form.Label>Product Quantity</Form.Label>

                        <Form.Control 
                            type="number" 
                            placeholder="Enter here"
                            value={currentProduct.productQuantity}
                            onChange={(event)=> setCurrentProduct({
                                        ...currentProduct,
                                        productQuantity: event.target.value
                                    })}
                        /> 

                    </FormGroup>

                    <Row className="mt-3">
                        <Col>
                            <Form.Check
                                type="switch"
                                label="Live"
                                checked={currentProduct.live}
                                onChange={(event)=> setCurrentProduct({
                                        ...currentProduct,
                                        live: !(currentProduct.live)
                                    })}
                            />
                        </Col>
                            
                        <Col>
                            <Form.Check
                                type="switch"
                                label="Stock"
                                checked={currentProduct.stock}
                                onChange={(event)=> setCurrentProduct({
                                        ...currentProduct,
                                        stock: !(currentProduct.stock)
                                    })}
                            />

                        </Col>
                    </Row>

                    <FormGroup className="mt-3">

                        <Container className="mb-2">
                            <p className="text-muted">Image Preview</p>
                            <img src={newImage.placeholder ? newImage.placeholder : (currentProduct?.imageName ? BASE_URL + '/products/images/' + currentProduct.productId + '?' + new Date().getTime() : "/assets/defaultProfile.png") } alt="Product Image" style = {{objectFit: 'cover'}} height={200} width={200} className="img-fluid" />
                        </Container>

                        <Form.Label>Select Product Image</Form.Label>

                        <Form.Control 
                            type="file" 
                            onChange={ (event) => handleProductImageChange(event) } 
                        />

                    </FormGroup>


                    <FormGroup className="mt-3" >

                        <Form.Label>Select Category</Form.Label>

                        <Form.Select onChange={(event)=>{
                            setUpdatedCategoryId(event.target.value)
                        }}>
                        <option value= "none" >None</option>
                                {
                                    (categories) &&
                                    categories.map((cat)=> <option 
                                                                selected={cat.categoryId == currentProduct?.category?.categoryId}   
                                                                value={cat.categoryId} 
                                                                key={cat.categoryId} 
                                                            > 

                                                            {cat.title} 
                                                            
                                                            </option> ) 
                                }
                    
                            
                        </Form.Select>

                    </FormGroup>

                    <Container className="text-center mt-3">
                        <Button type="submit" variant="success" size="sm">Save Details</Button>
                    </Container>

        </Form>  


                </Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdateModalClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

        }
            </>
        )
    }

    
    const handleSaveUpdatedDetailsButton = (event) => {

            event.preventDefault()

            if(currentProduct.productName === ''){
                toast.error("Product Name required !!")
                return
            }

            console.log(currentProduct)

            updateProduct(currentProduct.productId, currentProduct)
                    .then((response)=>{
                        console.log(response)
                        toast.success("Product updated successfully")

                    // update image

                    if (newImage.file) {

                        updateProductImage(newImage.file, response.productId)
                        .then((data) =>{
                            console.log(data)
                            toast.success(data.message)

                            // handleClose()
                        })
                        .catch( (error) => {
                            console.log(error)
                            toast.error("Image not uploaded !!")
                        })

                    }

                        const newProducts = products.map((p)=>{
                            if(p.productId == currentProduct.productId)
                            return response

                            return p
                        })

                        setProducts(newProducts)
                    })
                    .catch((error)=>{
                        console.log(error)
                        toast.error("Error in updating product !!")
                    })


                        // Update Category in server

                        if(updatedCategoryId == 'none' || updatedCategoryId === currentProduct?.category?.categoryId){

                        }else{

                            updateProductCategory(currentProduct.productId, updatedCategoryId)
                                    .then((response)=>{
                                        console.log("updating category")
                                        console.log(response)
                                        toast.success("Category updated")

                                        const updatedProducts = products.map((p)=>{
                                            if(p.productId == currentProduct.productId)
                                            return response
                
                                            return p
                                        })
                
                                        setProducts(updatedProducts)
                                    })
                                    .catch((error)=>{
                                        console.log(error)
                                        toast.error("Error in updating product !!")
                                    })
                        }


                        handleUpdateModalClose()

    }


    const productView = () =>{

        return(
            <>
                <Card>
                            <Card.Body>

                            <h5>View Products</h5>

                            <FormGroup>
                                <FormLabel>Search Products</FormLabel>
                                <FormControl 
                                    type="text"
                                    placeholder="Search here"
                                />
                            </FormGroup>

                            <Table bordered className="mt-3">

                                <thead>

                                    <tr>
                                        <th className="px=3 small">SN</th>
                                        <th className="px=3 small">Title</th>
                                        <th className="px=3 small">Quantity</th>
                                        <th className="px=3 small">Price</th>
                                        <th className="px=3 small">Discounted</th>
                                        <th className="px=3 small">Live</th>
                                        <th className="px=3 small">Stock</th>
                                        <th className="px=3 small">Category</th>
                                        <th className="px=3 small">Action</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    {
                                        products ? products.map((product,index)=> <SingleProductView 
                                                                                                key={index} 
                                                                                                index={index} 
                                                                                                product={product}
                                                                                                deleteProduct={deleteProductLocal}
                                                                                                viewProduct={viewProduct}
                                                                                                updateProduct={updateProductLocal}
                                                                                   /> ) : ''

                                           
                                    }
                                </tbody>
                            </Table>

                            </Card.Body>
                        </Card>
            </>
        )
    }

    return(
        <>
            <Container>
                <Row>
                    <Col>

                        { productView() }

                        { viewProductButtonModal() }

                        { updateProductButtonModal() }

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewProducts
