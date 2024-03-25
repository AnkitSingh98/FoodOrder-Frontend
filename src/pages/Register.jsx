import Base from "../components/Base"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert, Card, Form, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/UserService";


const Register = () =>{

    const [data, setData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        gender:'',
        address:''
    })


    const [error,setError] = useState({
        isError:false,
        errorData:null
    })

    
    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        setData( (data)=>{
             return{
                        ...data,
                        [event.target.name] : event.target.value    //Always write computed property inside square [] brackets
                    }
        })

    }


    const clearData = () =>{
        setData( {
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            gender:'',
            address:''
        })

        setError({
            isError:false,
            errorData:null
        })
    }


    const submitForm = (event) => {

        event.preventDefault();

        if(data.name == undefined || data.name.trim()==''){
            toast.error("Name is required !!")
            return
        }

        if(data.email == undefined || data.email.trim()==''){
            toast.error("Email is required !!")
            return
        }

        if(data.password == undefined || data.password.trim()==''){
            toast.error("Password is required !!")
            return
        }

        if(data.confirmPassword == undefined || data.confirmPassword.trim()==''){
            toast.error("ConfirmPassword is required !!")
            return
        }

        if(data.password !=  data.confirmPassword){

            toast.error("Password and ConfirmPassword did not match !!")
            return
        }

        if(data.address == undefined || data.address.trim()==''){
            toast.error("Address is required for delivery!!")
            return
        }


        // If all conditions satisfy then call post api to register user
        setLoading(true);

        registerUser(data)
            .then(
                (response)=>{
                    console.log(response)
                    toast.success("User created successfully !!")
                    clearData();
                }
            )
            .catch(
                (error)=>{
                    console.log(error);

                    setError(
                        {
                            isError:true,
                            errorData:error
                        }
                    )

                    toast.error(" Error occured while creating user !! Try again")
                   
                }
            )
            .finally(()=>{
                setLoading(false);
            })



    }




const signupForm = () =>{

    return(
        <Container>
            <Row>

                {/* {JSON.stringify(data)} */}

                <Col sm={ {span: 8, offset: 2}} >
                    
                    <Card className="my-2 border-0 shadow p-4" style={ { position:'relative', top:-60 } }>

                        <Card.Body>

                        <Container  className="text-center mb-3">
                        <img src={"/assets/logo1.png"} alt="store logo" width={80} height={80} />
                        </Container>

                        <h3 className="mb-4 text-center text-uppercase">Store Signup Here</h3>

                      

                        <Form noValidate onSubmit={submitForm}>

                        {/* Name field   */}

                             
                             <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Enter your name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter name" 

                                    name='name'
                                    onChange={handleChange}
                                    value={data.name}

                                    isInvalid={error.errorData?.response?.data?.name}
                                />
                                <Form.Control.Feedback type="invalid">{error.errorData?.response?.data?.name}</Form.Control.Feedback>
                           
                            </Form.Group>

                        {/* Email field  */}

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Enter your Email </Form.Label>
                         <Form.Control 
                                type="email" 
                                placeholder="Enter email" 

                                name='email'
                                onChange={handleChange}
                                value={data.email}

                                isInvalid={error.errorData?.response?.data?.email}
                            />
                            <Form.Control.Feedback type="invalid">{error.errorData?.response?.data?.email}</Form.Control.Feedback>
                        </Form.Group>



                        {/* Password field  */}

                        <Form.Group className="mb-3" controlId="formPassword">
                             <Form.Label>Enter new Password</Form.Label>
                             <Form.Control 
                                    type="password" 
                                    placeholder="Enter Password" 

                                    name="password"
                                    onChange={handleChange}
                                    value={data.password}

                                    isInvalid={error.errorData?.response?.data?.password}
                                />
                                <Form.Control.Feedback type="invalid">{error.errorData?.response?.data?.password}</Form.Control.Feedback>
                        </Form.Group>


                        {/* Confirm Password field  */}

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                             <Form.Label>Re Enter Password</Form.Label>
                             <Form.Control 
                                    type="password" 
                                    placeholder="Re Enter Password" 

                                    name="confirmPassword"
                                    onChange={handleChange}
                                    value={data.confirmPassword}
                                />
                        </Form.Group>


                        {/*  Radio button for gender */}

                        <Form.Group>
                            <Form.Label> Select Gender </Form.Label>

                            <div>
                            <Form.Check
                                inline
                                label="Male"
                                name="gender"
                                type={'radio'}
                                id={`gender`}

                                value="male"
                                onChange={handleChange}
                                checked={data.gender=='male'}
                            />

                            <Form.Check
                                inline
                                label="Female"
                                name="gender"
                                type={'radio'}
                                id={`gender`}

                                value="female"
                                onChange={handleChange}
                                checked={data.gender=='female'}
                            />

                            </div>

                        </Form.Group>



                        {/* Address   */}

                        <Form.Group className="mb-3 mt-3" controlId="formArea">
                             <Form.Label>Enter your present address for delivery</Form.Label>
                             <Form.Control 
                                    as={'textarea'} 
                                    rows="6" 
                                    placeholder="Write here" 

                                    name="address"
                                    onChange={handleChange}
                                    value={data.address}

                                    isInvalid={error.errorData?.response?.data?.address}
                                />
                                <Form.Control.Feedback type="invalid">{error.errorData?.response?.data?.address}</Form.Control.Feedback>
                        </Form.Group>


                        {/*  Link to Login */}
                        
                        <Container>
                        <p className="text-center"> Already Registered !  <a href=""> Login </a> </p>
                        </Container>


                        {/*  Button */}

                        <Container className="text-center">
                            <Button 
                                type="submit" 
                                className="text-uppercase" 
                                variant="success"
                                disabled={loading}
                            >

                                <Spinner
                                    animation="border"
                                    size="sm"
                                    className="me-2"
                                    hidden={!loading}
                                />
                                
                                
                                Register
                                
                            </Button>
                            <Button className="ms-2 text-uppercase" variant="danger" onClick={clearData}>Reset</Button>
                        </Container>

                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}


    return(
        <Base>
            {signupForm()}
        </Base> 
    )
}

export default Register;