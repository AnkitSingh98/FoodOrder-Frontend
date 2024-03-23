import './App.css';
import './index.css'
//import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/Profile';
import CustomNavbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/users/Home';
import UserProvider from './context/UserProvider';
import Order from './pages/users/Order';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import AddCategory from './pages/admin/AddCategory';
import ViewCategories from './pages/admin/ViewCategories';
import ViewProducts from './pages/admin/ViewProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import StorePage from './pages/users/StorePage';
import ProductView from './pages/users/ProductView';
import CategoryStorePage from './pages/users/CategoryStorePage';
import CartProvider from './context/CartProvider';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import { privateAxios, publicAxios } from './services/AxiosService';

function App() {

  const [ loading, setLoading ] = useState(false)

  useEffect(()=>{

    // request interceptor
    privateAxios.interceptors.request.use(
      (config) => {
        setLoading(true)
        return config
      },
      (error)=>{
        return Promise.reject(error)
      }
    );

        // response interceptor
    privateAxios.interceptors.response.use(
      (config) => {
        setLoading(false)
        return config
      },
      (error)=>{
        
        setLoading(false)
        if(error.code === "ERR_NETWORK")
        toast.error("Backend Server is down ! Try Again")
      
        return Promise.reject(error)
      }
    );


        // request interceptor
        publicAxios.interceptors.request.use(
          (config) => {
            setLoading(true)
            return config
          },
          (error)=>{
            return Promise.reject(error)
          }
        );
    
        // response interceptor
        publicAxios.interceptors.response.use(
          (config) => {
            setLoading(false)
            return config
          },
          (error)=>{
            return Promise.reject(error)
          }
        );
    


  },[])


  return (
    <>

    <UserProvider>
    <CartProvider>
    <BrowserRouter>

    <ToastContainer position="bottom-center" theme='dark'  />

    <CustomNavbar/>
    <Loading show={loading} />
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/about" element= { <About/> } />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/store' element={<StorePage />} />
        <Route path='/store/products/:productId' element={<ProductView />} />
        <Route path='/store/:categoryId/:categoryTitle' element={<CategoryStorePage/>}/>   {/* This Page is not used so pls ignore */}

        <Route path="/users" element={<Dashboard/>} >
          <Route path="/users/profile/:userId" element={<Profile/>} />
          <Route path="/users/about" element={<About/>} />
          <Route path="/users/home" element={<Home />} />
          <Route path="/users/orders" element={<Order />} />
        </Route>  

        <Route path="/admin" element={<AdminDashboard/>} >
          <Route path="/admin/home" element={<AdminHome/>} />
          <Route path="/admin/add-category" element={<AddCategory/>} />
          <Route path="/admin/categories" element={<ViewCategories/>} />
          <Route path="/admin/add-product" element={<AddProduct/>} />
          <Route path="/admin/products" element={<ViewProducts/>} />
          <Route path="/admin/orders" element={<AdminOrders/>} />
          <Route path="/admin/users" element={<AdminUsers/>} />
          <Route path="/admin/user-dashboard" element={<Home/>} /> 
        </Route>
      </Routes>

    </BrowserRouter>

    </CartProvider>
    </UserProvider>

    </>
  );
}

export default App;
