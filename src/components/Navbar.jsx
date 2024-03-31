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
         <span className="ms-1">HungerHub </span>

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          {/* <Nav className="m-auto">
            <Nav.Link eventKey="1" as={NavLink} to="/services">Features</Nav.Link>
            
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item eventKey="a" as={NavLink} to="/">Samsung</NavDropdown.Item>
              <NavDropdown.Item eventKey="b" as={NavLink} to="/">
                Apple
              </NavDropdown.Item>
              <NavDropdown.Item eventKey="c" as={NavLink} to="/">One Plus</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item eventKey="d" as={NavLink} to="/">
                More
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link eventKey="2" as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link eventKey="3" as={NavLink} to="/contact">ContactUs</Nav.Link>
          </Nav> */}

          <Nav>
            <Nav.Link eventKey="4" as={NavLink} to="/store">Store</Nav.Link>
            <Nav.Link eventKey="5" as={NavLink} to="/cart">Cart {userContext.isLogin && ( '(' + cart?.items?.length + ')' ) }</Nav.Link>

            {
              (userContext.isLogin) ? (
                <>

                  { userContext.isAdminUser && (
                    <>
                      <Nav.Link eventKey="6" as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
                    </>
                  )
                  }

                  <Nav.Link eventKey="7" as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`}>{ userContext.userData.user.email} </Nav.Link>
                  <Nav.Link eventKey="8" as={NavLink} to="/users/orders">Orders</Nav.Link>
                  <Nav.Link eventKey="9" as={NavLink} to="/register" onClick={doLogout}>Logout</Nav.Link>
                </>
 
              ) : (
                <>
                  <Nav.Link eventKey="10" as={NavLink} to="/login">Login</Nav.Link>
                  <Nav.Link eventKey="11" as={NavLink} to="/register">Signup</Nav.Link>
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