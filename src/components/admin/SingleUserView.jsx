import { Badge, Card, Col, Row } from "react-bootstrap"
import { MdHeight } from "react-icons/md"

const SingleUserView = ( {user} ) => {

    return(
            <>
                <Card className="mt-3 border-0 shadow">
                    <Card.Body>
                        <Row>
                            <Col md={1} className="d-flex align-items-center">

                                <img 
                                    src= {"/assets/defaultProfile.png"}
                                    alt=""
                                    style={{
                                        width:'50px',
                                        height: '50px',
                                        objectFit: 'cover'
                                    }}
                                    className="rounded-circle"
                                />

                            </Col>
                               
                            <Col md={11}>
                                <h5> {user.name} </h5>
                                <p className="text-muted">{user.about}</p>
                                <p className="text-muted">{user.email}</p>
                                {
                                    user.roles.map((role)=>{
                                        return <Badge 
                                                    bg={role.name == 'ROLE_ADMIN' ? 'success' : 'info'}
                                                > 

                                                {role.name == 'ROLE_ADMIN' ? 'ADMIN' : 'NORMAL'}
                                                
                                                </Badge>
                                    })
                                }
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>
    )
}

export default SingleUserView