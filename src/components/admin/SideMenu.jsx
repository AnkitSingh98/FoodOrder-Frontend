import { ListGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import { AiOutlineHome } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { MdOutlineAddBox } from 'react-icons/md'
import { MdOutlinePreview } from 'react-icons/md'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { FaUserShield } from 'react-icons/fa'
import { MdOutlineDashboardCustomize } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const SideMenu = () => {

    const { logout } = useContext(UserContext)

    return(
        <>
            <ListGroup variant="flush" className="sticky-top shadow">
                <ListGroup.Item as={NavLink} to="/admin/home"  action>
                    <AiOutlineHome />
                    <span className="ms-2">Home</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/add-category" action>
                    <BiCategory />
                    <span className="ms-2">Add Category</span>   
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/categories" action>
                    <MdOutlineCategory />
                    <span className="ms-2">View Category</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                    <MdOutlineAddBox />
                    <span className="ms-2">Add Product</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/products" action>
                    <MdOutlinePreview />
                    <span className="ms-2">View Products</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/orders" action>
                    <MdOutlineShoppingCartCheckout />
                    <span className="ms-2">Orders</span>
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/users"  action>
                    <FaUserShield />
                    <span className="ms-2">Users</span>
  
                    
                    <Badge className="ms-5" bg="danger" pill>
                    New
                    </Badge>
                    
                </ListGroup.Item>

                <ListGroup.Item as={NavLink} to="/admin/user-dashboard" action>
                    <MdOutlineDashboardCustomize />
                    <span className="ms-2">Dashboard</span>
                </ListGroup.Item>

                <ListGroup.Item action onClick={ (event)=> logout()}>
                    <AiOutlineLogout />
                    <span className="ms-2">Logout</span>
                </ListGroup.Item>

            </ListGroup>
        </>
    )
}


export default SideMenu