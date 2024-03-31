import { Alert, Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row, Spinner } from "react-bootstrap"
import Base from "../components/Base"
import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { toast } from "react-toastify";
import { loginUser } from "../services/UserService";
import UserContext from "../context/UserContext";

const Login = ()=>{

    const redirect = useNavigate();
    const userContext = useContext( UserContext );

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState({
        isError: false,
        errorData: null
    })

    const [loading,setLoading] = useState(false);


    const handleChange = (event) =>{

        setData({

            ...data,
            [event.target.name] : event.target.value  //Always write computed property inside square [] brackets

        })
    }

    const clearData = () => {

        setData({
            username: '',
            password: ''
        })

        setError({
            isError: false,
            errorData: null
        })
        

        setLoading(false);
    }


    const submitForm = (event) =>{
        event.preventDefault();

        console.log(data);

        if(data.username === undefined || data.username.trim() === ''){
            toast.error("Email required !!")
            return
        }

        if(data.password === undefined || data.password.trim() === ''){
            toast.error("Password required !!")
            return
        }

        // Call login API (Check in authControlller in Backend)
        
        //setLoading(true)
        console.log(data);

        loginUser(data)
        .then((response) => {
            console.log(response);
            toast.success("Logged In");

            setError({
                isError: false,
                errorData: null
            })


            // Set userContext fields
            // userContext.setIsLogin(true);
            // userContext.setUserData(response);
            
            userContext.login(response);
            
            // Redirect to User Dashboard page
            // 1) For normal user
            redirect("/users/home")

            // 2) For admin user

        })
        .catch((error)=>{
            console.log("myFinalData::;;;;:::"+data.username);
            console.log(error)

            setError({
                isError: true,
                errorData: error
            })

            toast.error("Error occured while Logging in !!")

        })
        .finally(()=>{
            setLoading(false)
        })
    }



    const loginForm = () => {
        return(
            <Container>
                <Row>
                    <Col sm={ {span: 8, offset: 2}}>
                        <Card className="my-2 border-0 shadow p-4" style={ { position:'relative', top:-60 } }>
                            <Card.Body>

                                <Container className="text-center mb-3">
                                    <img src={"/assets/logo1.png"} alt="store logo" width={80} height={80} />
                                </Container>

                                <h3 className="mb-4 text-center text-uppercase">Store Login</h3>

                        {/* Code for adding Alert whenever error occurs*/}

                                <Alert 
                                    variant="danger" 
                                    show={error.isError}
                                    dismissible
                                    onClose={()=>setError({
                                        isError:false,
                                        errorData: null
                                    })
                                    }
                                >

                                        {error.errorData?.response?.data}

                                </Alert>

                        {/* Code for Alert ends */}


                                <Form noValidate onSubmit={submitForm}>

                                    <FormGroup className="mb-3">
                                        <FormLabel>Enter your email</FormLabel>
                                        <FormControl 
                                            type="email" 
                                            placeholder="Enter email"

                                            name= 'username'
                                            onChange= {handleChange}
                                            value= {data.username}

                                        />
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <FormLabel>Enter your password</FormLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Enter password"

                                            name= 'password'
                                            onChange= {handleChange}
                                            value= {data.password}

                                        />
                                    </FormGroup>

                                    <Container>
                                    <p className="text-center"> If not registered ! <NavLink to="/register">Click here</NavLink></p>
                                    </Container>


                                    <Container className="text-center">

                                        <Button type="submit" variant="success" className="text-uppercase" disabled= {loading}>
                                        <Spinner
                                            animation="border"
                                            size="sm"
                                            hidden={!loading}
                                        />

                                        <span hidden = {!loading} > Please wait...</span>
                                        
                                        <span hidden = {loading} >Login</span> 
                                        
                                        </Button>

                                        <Button variant="danger" className="ms-2 text-uppercase" onClick={clearData}>Reset</Button>
                                    </Container>



                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return(
        <Base>
            {loginForm()}
        </Base>
    )
}

export default Login;
