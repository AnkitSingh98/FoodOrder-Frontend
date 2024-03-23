import { useContext } from "react"
import { Button, Card, Container, Table } from "react-bootstrap"
import UserContext from "../../context/UserContext"
import { BASE_URL } from "../../services/HelperService";

const UserProfileView = ( { user = null , handleShowModal } ) => {

    
    const userContext = useContext(UserContext);

    const imageStyle = {
        height: "200px",
        width: "200px",
        borderRadius:"50%",
        objectFit: "cover"
    }
    return(
        <>
            {
                ( user && (

                    <div>

                        <Card className="text-center m-3 border-0 shadow-sm">
                            <Card.Body>

                                <Container className="text-center my-3">
                                    <img className="border-dark" src={user.imageName ? BASE_URL + '/image/' + user.userId + '?' + new Date().getTime() : "/assets/defaultProfile.png"} alt="Profile image" style={ imageStyle } />
                                    {/* new Date().getTime() is used above to update profile image on Profile component as soon as Save changes is clicked. See Section -4, L-11 update image vala */}
                                </Container>

                                <h1 className="text-center text-uppercase fw-bold text-primary"> {user.name} </h1>

                                <div className="mt-3">

                                    <Card className=" " style={{borderRadius: "50px"}}>
                                        <Card.Body>
                                            <Table className="text-center " responsive hover >
                                                <tbody>

                                                    <tr>
                                                        <td>Name</td>
                                                        <td> {user.name} </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Email</td>
                                                        <td> {user.email} </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>
                                                            { (user.gender == "M") ? "Male" : "Female" } 
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>About</td>
                                                        <td> {user.about} </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Roles</td>
                                                        <td> {user.roles.map(role => <div key={role.id}> {role.name} </div>)} </td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>

                                </div>
                            </Card.Body>
                        </Card>

                    {
                        
                    (userContext.isLogin && userContext.userData.user.userId === user.userId) ? 
                        (
                        <Container className= "text-center">
                            <Button variant="success" size="lg" onClick={handleShowModal}>Update </Button>
                            <Button className=" text-center ms-2" variant="warning" size="lg">Orders </Button>
                        </Container>
                        ): ''

                    }
                    </div>

                    
                    )
                
                )

            }
        </>
    )
}

export default UserProfileView