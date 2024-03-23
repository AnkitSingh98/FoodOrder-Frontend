import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/UserService"
import { toast } from "react-toastify"
import { Card, Col, Container, Row } from "react-bootstrap"
import SingleUserView from "../../components/admin/SingleUserView"

const AdminUsers = () => {

        const [usersData, setUsersData] = useState(undefined) 

        useEffect(()=>{

            getAllUsers()
                    .then((response)=> {
                        console.log(response)
                        setUsersData(response)
                    })
                    .catch((error)=>{
                        console.log(error)
                        toast.error("Error in fetching Users from DB !!")
                    })
        },[])


    return(
        usersData &&
        <>
            <Container>
                <Row>
                    <Col>
                        <Card className="border-0">
                            <Card.Body>
                                {
                                    usersData.map((user)=>{
                                        return <SingleUserView user={user} /> 
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminUsers
