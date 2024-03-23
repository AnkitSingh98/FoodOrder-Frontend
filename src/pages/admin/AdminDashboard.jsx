import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import UserContext from "../../context/UserContext"
import { checkIfAdminUser } from "../../auth/HelperAuth";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";

const AdminDashboard = () => {

    const userContext = useContext(UserContext);

    const dashboardView = () => {
        return(
            <>

            <Container fluid className="mx-2 p-5">
                <Row>
                    <Col md={2} className="">
                        <SideMenu />
                    </Col>
                        
                    <Col md={10} className="ps-3 pt-2">
                    <Outlet />
                    </Col>
                </Row>
            </Container>
            
        </>
        )
    } 
    return(

        // Below is done to manage private routes so that user is not able to hit url's directly
        // Because this is the master page for all Admin related pages
        
        (checkIfAdminUser()) ? dashboardView() : <Navigate to="/login" />
        
      //  <Navigate to="/users/home" />
        
    )
}


export default AdminDashboard