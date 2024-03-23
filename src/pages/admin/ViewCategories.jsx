import { useEffect, useState } from "react"
import CategoryView from "../../components/admin/CategoryView"
import { deleteCategory, getCategory, updateCategory } from "../../services/CategoryService"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Modal, Spinner } from "react-bootstrap"


const ViewCategories = () => {

    const [data,setData] = useState({
        content: []
    })

    const [loading,setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   


    useEffect(()=>{
        
        setLoading(true)

       getCategory()
            .then((response)=>{
                
                setData(response) 
                
                // console.log(typeof(data))
                 console.log("Content="+ JSON.stringify(data))
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error while fetching categories from server!!") 
            })
            .finally(()=>{
                setLoading(false)
            })

    },[])



    const deleteCategoryMain = (category) => {  
 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {


                // Calling Backend delete API

                deleteCategory(category.categoryId)
                .then( (response)=>{
                console.log(response)
                const newData = data.filter((cat)=> cat.categoryId != category.categoryId)
                setData(newData);

                // setData({
                //     ...data,
                //     data: newData
                // })

                
              Swal.fire(
                'Deleted!',
                'Category has been deleted.',
                'success'
              )
            
            })
            .catch( (error)=>{
                console.log(error)
                toast.error("Hey!! Error occured while deleting category")
            })

            }
          })
 
    }



    const updateCategoryMain = (category) => {

        console.log(category)
        
        setSelectedCategory(category)
        handleShow()
       
    }


    // Below Method  calls Backend API for update categories

    const updateCategoryServer = () => {
        
        console.log(selectedCategory);

       if(selectedCategory.title.trim() == ''){
        toast.error("Title is required !!")
        return
       }

       if(selectedCategory.description.trim() == ''){
        toast.error("Description is required !!")
        return
       }


        updateCategory(selectedCategory)
            .then((response)=>{
                console.log(response)
                toast.success("Category updated")

                const newData = data.map( (cat)=>{
                    if( cat.categoryId == selectedCategory.categoryId){
                        cat.title = selectedCategory.title;
                        cat.description = selectedCategory.description;
                        cat.coverImage = selectedCategory.coverImage;
                    }
                    return cat;
                })

                setData(newData);
                
            })
            .catch((error)=>{
                console.log(error)
                toast.error("Error while updating category!!")
            })
            .finally(()=>{
                handleClose()
            })

    }



    const updateModalView = () => {

        return(
            <>
                <Modal show={show} onHide={handleClose}>  
                    <Modal.Header closeButton>
                        <Modal.Title> {selectedCategory.title} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Container className="text-center">
                            <img 
                                src={(selectedCategory.coverImage ? (selectedCategory.coverImage.startsWith("http") ? selectedCategory.coverImage : "/assets/defaultProfile.png") : "/assets/defaultProfile.png")}
                                alt="category image>" 
                                style={ {
                                    width: "100px",
                                    height: "100px"
                                    }
                                }
                            />
                        </Container>

                        <Form>

                            <FormGroup>
                                <Form.Label>Category Title</Form.Label>
                                <FormControl
                                    type="text"
                                    placeholder="Enter title here"
                                    value={selectedCategory.title}
                                    onChange={(event)=>{
                                        setSelectedCategory({
                                            ...selectedCategory,
                                            title: event.target.value
                                        })
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Category Description</FormLabel>
                                <FormControl
                                    as={'textarea'}
                                    placeholder="Enter description"
                                    rows={6}
                                    value={selectedCategory.description}
                                    onChange={ (event)=>{
                                        setSelectedCategory({
                                            ...selectedCategory,
                                            description: event.target.value
                                        })
                                    }}
                                />
                            </FormGroup>

                            <FormGroup className="mt-3">
                                <Form.Label>Category Cover Image Url</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter here"
                                    value={selectedCategory.coverImage}
                                    onChange={(event)=>{
                                        setSelectedCategory({
                                            ...selectedCategory,
                                            coverImage: event.target.value
                                        })
                                    }}
                                />
                            </FormGroup>

                        </Form>
                    </Modal.Body>  

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={ (event) => updateCategoryServer() }> 
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    return(
        <>
            { console.log("here") }
             { console.log(data) }
            { console.log("data= " + data) }
            { console.log(data.content) }

            <Container className="text-center p-3" hidden={!loading}>
                <Spinner />
                <div>
                    <h3>Loading...</h3>
                </div>
            </Container>


        {   
           // console.log(typeof(data)) 
          // console.log("Returned= "+ JSON.stringify(data));

        
        // NOTE: Replace data.length  with data.content.length ---> at 2 places below if you get map function error
       
        (data.length > 0) ? (

           // console.log(JSON.stringify(data))
           data.map((cat)=>{
            //console.log(cat) 
            return (
                <CategoryView category = {cat}
                                 updateCat = {updateCategoryMain}
                                 deleteCat = {deleteCategoryMain} 
                                 key={cat.categoryId} 
                                 
                     />   
               )
           })

        ) : 

        (   
            <h1>No data found....</h1>
        )

       

        }

        {
        (selectedCategory) ? updateModalView() : ''

        }

        </>
    )
}
  
export default ViewCategories
