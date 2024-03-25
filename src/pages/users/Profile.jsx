import { Alert, Button, Col, Container, Modal, Row, Card, Table, Spinner, Form, InputGroup } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/UserService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Profile = () =>{


    const userContext = useContext(UserContext)
    const [user,setUser] = useState(null);
    const [userUpdate,setUserUpdate] = useState(null);
    const [error,setError] = useState("");

    const [image, setImage] = useState({
        placeholder: '/assets/defaultProfile.png',
        file: null
    })

    
    const { userId } = useParams() 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect( () =>{

        //console.log("entered useEffect() Profile.jsx  ")
       
        //console.log( "context = "+userContext.userData)
        
        // if(userContext.userData){
            //console.log("useEffect() Profile.jsx ----> "+userContext.userData)

            getUserFromServer()

        // }

       // console.log(" useEffect() Profile.jsx  =>  ended ----> "+ userContext.userData)

    }, [] )


    const getUserFromServer = () => {

      // const userId = userContext.userData.user.userId;
        
        getUser(userId)
            .then((data)=>{
                console.log(data)
                console.log("Setting user ")
                setUser(data)
                setUserUpdate(data)
            })
            .catch((error)=>{
                console.log(error.response.data)
                setUser(null)
                setUserUpdate(null)
                setError(error.response.data.message)
                toast.error(error.response.data.message)
            })

    }

    const handleUpdateForm = (event,field) => {

        setUserUpdate({
            ...userUpdate,
            [field] : event.target.value
        })
    }


    const updateUserData = () => {

        //Validations

            if(userUpdate.name === undefined || userUpdate.name.trim() === ''){
                toast.error("User name is required!!");
                return
            }

            if(userUpdate.address === undefined || userUpdate?.address?.trim() === ''){
                toast.error("Address is required for delivery!!");
                return
            }
        
        //Call Backend API
            updateUser(userUpdate)
                .then( (updatedUser)=>{
                    toast.success("User details updated !!")
                    setUser(updatedUser)

                    // update image

                    if(image.file == null){
                        handleClose()
                        return;
                    }

                    updateUserProfilePicture(image.file, user.userId)
                        .then((data) =>{
                            console.log(data)
                            toast.success(data.message)

                            handleClose()
                        })
                        .catch( (error) => {
                            console.log(error)
                            toast.error("Image not uploaded !!")
                        })

                })
                .catch( (error) =>{
                    console.log(error.response.data)
                    toast.error("Some error while updating data !!")
                })

    }


    const handleShowModal = () => {

        console.log("Showing Modal")
        setShow(true);
    }

    const handleProfileImageChange = (event) => {
        
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

    const clearImage = (event) => {

        setImage({
            placeholder: '/assets/defaultProfile.png',
            file: null,
        })

    }

    const updateViewModal = () => {
        return(

                <div>

                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title>Update Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <Card className="" style={{borderRadius: "50px"}}>
                                        <Card.Body>
                                            <Table className="" responsive hover >
                                                <tbody>

                                                    <tr> 
                                                        <td>Profile Image</td>
                                                        <td>

                                                            <Container className="text-center mb-3">
                                                                <img style = {{objectFit: 'cover'}} height={200} width={200} src={image.placeholder} alt="" />
                                                            </Container>

                                                            <InputGroup>
                                                                <Form.Control 
                                                                    id="imageFile"
                                                                    type="file"
                                                                    onChange={(event)=> handleProfileImageChange(event) }
                                                                />
                                                                <Button variant="outline-secondary" onClick={clearImage}>Clear</Button>
                                                            </InputGroup> 

                                                        <p className="mt-2 text-muted">Select square size image for better UI</p>
                                                        
                                                        </td>
                                                    </tr>

                                                    <tr> 
                                                        <td>Name</td>
                                                        <td> 
                                                            <Form.Control 
                                                                    type="text" 
                                                                    value={userUpdate.name}
                                                                    onChange={(event)=> handleUpdateForm(event,'name')}

                                                            /> 
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Email</td>
                                                        <td> {user.email} </td>
                                                    </tr>

                                                    <tr> 
                                                        <td>New Password</td>
                                                        <td> 
                                                            <Form.Control 
                                                                type="password"
                                                                onChange={(event)=> handleUpdateForm(event,'password')} 
                                                                className="" 
                                                                placeholder="Enter new password here"
                                                            /> 
                                                            <p className="fw-lighter"> Leave field blank for same password</p>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Gender</td>
                                                        <td> 
                                                            {
                                                            
                                                            (userUpdate.gender == 'M')? "Male" : "Female"
                                                            
                                                            } 
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Address</td>
                                                        <td> 
                                                            <Form.Control 
                                                                as={'textarea'} 
                                                                value={userUpdate.address}
                                                                onChange={(event)=> handleUpdateForm(event,'address')}
                                                                rows={8}
                                                            /> 
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Roles</td>
                                                        <td> {userUpdate.roles.map(role => <div key={role.id}> {role.name} </div>)} </td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={updateUserData}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>  

                </ div>

        )

    }



    return (
        <div>

            <Container className="mt-3">
                <Row>
                    <Col md={ {span:8, md:6, offset:2} }>
                    {
                        (user) ? 
                            (    
                            <>             
                                <UserProfileView 
                                    user={ 
                            
                                            user

                                        // {
                                        //     name: "Ankit Singh",
                                        //     email: "ankit@hacks.com",
                                        //     gender: "male",
                                        //     about: "Coder.....",
                                        //     roles : [{name: "Normal"},{name: "Admin"}]
                                        // }

                                        }

                                    handleShowModal = {handleShowModal}



                                />

                                { updateViewModal() }

                                {JSON.stringify(user)}
                                </> 

                            ) :
                            
                            (
                                 <>
                                    <Alert variant="danger"> 
                                    <h3> User cannot be loaded from server !! </h3> 
                                    <h3>{error}</h3>
                                    </Alert>
                                </>
                            )
                    } 
                    </Col>
                </Row>

            
            </Container>

        </div>
    )
}

export default Profile;