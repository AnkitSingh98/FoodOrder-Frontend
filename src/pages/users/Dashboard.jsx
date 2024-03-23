import { Card } from "react-bootstrap";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { Alert, Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"
import UserContext from "../../context/UserContext";
import { isLoggedIn } from "../../auth/HelperAuth";

const Dashboard = ()=>{

    const dashboardView = () =>{
        return(
            <div>

        <Outlet />
    </div>
        )
    }


    const notLoggedInView = () => {
        return(
            <Container className="mt-2">
                <Row>
                    <Col>
                        <Card className="my-2 border-0 shadow p-4">
                            <Card.Body className="text-center">
                                <h3>You are not logged in</h3>
                                <p>Please login to view the page</p>
                                <Button variant="success" as={NavLink} to="/login">Login now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }


    return(

        // (UserContext.isLogin) ? dashboardView() : notLoggedInView()

         // Below is done to manage private routes so that user is not able to hit url's directly
         // Because thi is the master page for all User related pages
        (isLoggedIn()) ? dashboardView() : <Navigate to="/login"  />
       
    )
}

export default Dashboard;