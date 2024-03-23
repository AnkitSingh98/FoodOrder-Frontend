import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';

const CustomNavbar = () =>{

    const userContext = useContext(UserContext)
    const { cart, setCart } = useContext(CartContext)

    const doLogout = () =>{
      // userContext.setIsLogin(false)
      // userContext.setUserData(null)

      userContext.logout();
    }

    return(

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="" >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
        
        <img src={"/assets/logo1.png"} alt='logo' height={20} width={20} /> 
         <span className="ms-1">ElectroStore </span>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/services">Features</Nav.Link>
            
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/">Samsung</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/">
                Apple
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/">One Plus</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/">
                More
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">ContactUs</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
            <Nav.Link as={NavLink} to="/cart">Cart {userContext.isLogin && ( '(' + cart?.items?.length + ')' ) }</Nav.Link>

            {
              (userContext.isLogin) ? (
                <>

                  { userContext.isAdminUser && (
                    <>
                      <Nav.Link as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
                    </>
                  )
                  }

                  <Nav.Link as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`}>{userContext.userData.user.email}</Nav.Link>
                  <Nav.Link as={NavLink} to="/users/orders">Orders</Nav.Link>
                  <Nav.Link as={NavLink} to="/register" onClick={doLogout}>Logout</Nav.Link>
                </>
 
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                  <Nav.Link as={NavLink} to="/register">Signup</Nav.Link>
                </>

              )
            }


            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    )
}

export default CustomNavbar;