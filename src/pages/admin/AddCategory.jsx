import { useState } from "react"
import { Button, Card, Container, Form, FormGroup, Spinner } from "react-bootstrap"
import { addCategory } from "../../services/CategoryService"
import { toast } from "react-toastify"

const AddCategory = () => {

    const [data,setData] = useState({
        title:'',
        description:'',
        coverImage:''
    })

    const [loading,setLoading] = useState(false)

    const handleFields = (event, property) =>{
            setData({
                ...data,
                [property] : event.target.value
            })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        console.log(data)

        if(data.title === ''){
            toast.error("Title is required!!!")
            return
        }

        if(data.description === ''){
            toast.error("Description is required!!!")
            return
        }

        setLoading(true)
        addCategory(data)
            .then((response)=>{
                toast.success("Category added successfully!!!")
                console.log(response)

                setData({
                    title: '',
                    description: '',
                    coverImage:''
                })
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error while adding category!!")
            })
            .finally(()=>{
                setLoading(false)
            })
    }


    const clearForm = (event) =>{

        event.preventDefault()

        setData({
            title: '',
            description: '',
            coverImage:''
        })

    }

    return(
        <>
            <Container> 
                <Card className="border-0 shadow">
                    <Card.Body>
                        {JSON.stringify(data)}
                        <h5>Add Category here</h5>

                        <Form onSubmit={handleFormSubmit}>

                            <FormGroup className="mt-3">
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter here"
                                    value={data.title}
                                    onChange={(event)=>handleFields(event,'title')}
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control
                                    rows={6}
                                    as={'textarea'}
                                    value={data.description}
                                    onChange={(event)=>handleFields(event,'description')}
                                    placeholder="Enter here"
                                
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Category Cover Image Url</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter here"
                                    value={data.coverImage}
                                    onChange={(event)=>handleFields(event,'coverImage')}
                                />
                            </FormGroup>

                            <Container className="text-center mt-2">
                                <Button type="submit"  variant="success" size="sm" disabled={loading}>
                                
                                <Spinner 
                                    hidden={!loading}
                                    size="sm"
                                    className="me-2"
                                />

                                <span hidden={!loading}>Please wait...</span>
                                <span hidden={loading}>Add Category</span>
                                
                                </Button>
                                <Button className="ms-2" variant="danger" size="sm" onClick={clearForm}>Clear</Button> 
                            </Container>

                        </Form>

                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default AddCategory
