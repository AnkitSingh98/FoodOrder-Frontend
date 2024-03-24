import { useEffect, useRef, useState } from "react"
import { Button, Card, Col, Container, Form, FormGroup, Row } from "react-bootstrap"
import { toast } from "react-toastify"
import { createProductWithCategory, createProductWithoutCategory, updateProductImage } from "../../services/ProductService"
import { getCategory } from "../../services/CategoryService"
import { Editor } from '@tinymce/tinymce-react'

const AddProduct = () => {

    const [product, setProduct] = useState({
        productName: '',
        productDesc: '',
        productPrice: 0,
        productDiscountedPrice: 0,
        productQuantity: 0,
        live: false,
        stock: true,
        image: undefined
    })

    const [categories, setCategories] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState("none")

    const [image, setImage] = useState({
        placeholder: '/assets/defaultProfile.png',
        file: null
    })

    const editorRef = useRef()

    useEffect(()=>{

        getCategory()
            .then((res)=>{
                setCategories(res);
                console.log(categories)
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error in fetching categories !!")
            })
    },[])


    const clearData = ()=>{

        //editorRef.current.setContent('')

        setProduct({
            ...product,
            productName: '',
            productDesc: '',
            productPrice: 0,
            productDiscountedPrice: 0,
            productQuantity: 0,
            live: false,
            stock: true,
            image: undefined
        });

    }


    const addProductButton = (event) => {

        event.preventDefault()
        console.log("Button clicked!!")

        if(product.productName == undefined || product.productName.trim() === ''){
            toast.error("Product Name is required")
            return
        }

        if(product.productDesc == undefined || product.productDesc.trim() === ''){
            toast.error("Product Description is required")
            return
        }

        if(product.productPrice <=0){
            toast.error("Invalid Product Price !!")
            return
        }


         
        if( (product.productDiscountedPrice <= 0) ||  (parseFloat(product.productDiscountedPrice) >= parseFloat(product.productPrice) ) ){
           
            toast.error("Invalid Discount value!!");
            return; 
        }

        console.log(" About to hit API !!")

        if(selectedCategoryId == "none") 
        {
            console.log("inside none category")
            createProductWithoutCategory(product)
                    .then( (response) => {
                        toast.success("Product is created !!")
                        console.log(response)
                        clearData()

                    // update image

                    if (!image.file) {
                        clearData()
                        return
                    }

                    updateProductImage(image.file, response.productId)
                        .then((data) =>{
                            console.log(data)
                            toast.success(data.message)

                            // handleClose()
                        })
                        .catch( (error) => {
                            console.log(error)
                            toast.error("Image not uploaded !!")
                        })


                    })
                    .catch((error)=>{
                        console.log(error)
                        toast.error("Error while adding Product !!")
                    })
                }
        
                else{
                        console.log("inside product with category")
                        createProductWithCategory(selectedCategoryId, product)
                            .then((res)=>{
                                toast.success("Product created successfully !!")
                                console.log(res)
                               clearData() 
                               
                               // update image

                                if (!image.file) {
                                    clearData()
                                    return
                                }

                                updateProductImage(image.file, res.productId)
                                    .then((data) =>{
                                        console.log(data)
                                        toast.success(data.message)

                                    })
                                    .catch( (error) => {
                                        console.log(error)
                                        toast.error("Image not uploaded !!")
                                    })
                               
                            })
                            .catch((error)=>{
                                console.log(error)
                                toast.error("Error while adding Product !!")
                            })

                        }
    }

    const handleProductImageChange = (event) => {

        console.log("Image changed !!")

        const localFile = event.target.files[0]  // It has all the details of file that we have uploaded
        console.log(localFile)

        if(localFile.type === 'image/png' || localFile.type === 'image/jpg' || localFile.type === 'image/jpeg'){

            // Show preview

            const reader = new FileReader()
            reader.onload = (r) => {
                setImage({
                    placeholder: r.target.result,
                    file: localFile
                })

                console.log(r.target.result)
            }
            reader.readAsDataURL(localFile)
        }
        else{
            toast.error("Invalid file extension or format!! Must be .png or .jpg or .jpeg file!!")
            image.file = null
        }

    }


    const addProductForm = ()=>{
        return(
            <>
                <Card className="border-0 shadow">
                    <Card.Body>
                        <h5>
                            Add Product here
                        </h5>

                        {JSON.stringify(product)}

                        <Form  onSubmit={addProductButton}>

                        {/* Product Name */}

                            <FormGroup className="mt-3">

                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                     type="text"
                                     placeholder="Enter here"
                                     value={product.productName}
                                     onChange= {(event)=> setProduct({
                                        ...product,
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
                                     value={product.productDesc}
                                     onChange={ (event)=> setProduct({
                                            ...product,
                                            productDesc: event.target.value
                                        })}
                                    /> 

                                    {/* <Editor 
                                        apiKey='huy2tu80bdix84os66xo5usak6aceie56hxdlge5xhw6l7zc'
                                        onInit={(evt, editor) => editorRef.current = editor}
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
                                            () => setProduct({
                                                ...product,
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
                                            value={product.productPrice}
                                            onChange={ (event)=> setProduct({
                                                    ...product,
                                                    productPrice : event.target.value
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
                                             value={product.productDiscountedPrice}
                                             onChange={ (event)=> 
                                             
                                                setProduct({
                                                    ...product,
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
                                    value={product.productQuantity}
                                    onChange={ (event)=> setProduct({
                                            ...product,
                                            productQuantity: event.target.value
                                        })}
                                /> 

                            </FormGroup>

                            <Row className="mt-3">
                                <Col>
                                    <Form.Check
                                        type="switch"
                                        label="Live"
                                        checked={product.live}
                                        onChange={(event)=> setProduct({
                                            ...product,
                                            live: !(product.live)
                                        })}
                                    />
                                </Col>
                                    
                                <Col>
                                    <Form.Check
                                        type="switch"
                                        label="Stock"
                                        checked={product.stock}
                                        onChange={(event)=> setProduct({
                                            ...product,
                                            stock: !(product.stock)
                                        })}
                                    />

                                </Col>
                            </Row>

                            <FormGroup className="mt-4">

                                <Container className="mb-2">
                                    <p className="text-muted">Image Preview</p>
                                    <img style = {{objectFit: 'cover'}} height={200} width={200} className="img-fluid" src ={image.placeholder} />
                                </Container>

                                <Form.Label>Select Product Image</Form.Label>
                                <Form.Control
                                    type="file" 
                                    onChange={ (event) => handleProductImageChange(event) } />

                            </FormGroup>


                            <FormGroup className="mt-3" >

                                <Form.Label>Select Category</Form.Label>

                                <Form.Select onChange={(event) => setSelectedCategoryId(event.target.value) } >
                                <option value= "none" >None</option>
                                        {
                                            (categories) ? 
                                            categories.map((cat)=> < option value={cat.categoryId} key={cat.categoryId} > {cat.title} </option> ) : ''
                                        }
                               
                                     
                                </Form.Select>

                            </FormGroup>

                            <Container className="text-center mt-3">
                                <Button type="submit" variant="success" size="sm">Add Product</Button>
                                <Button variant="danger" size="sm" className="ms-2">Clear Data</Button>
                            </Container>

                        </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }



    return(
        <>
            {addProductForm()}

            {/* {(categories)? console.log(JSON.stringify(categories)) : ''} */}
        </>
    )
}


export default AddProduct