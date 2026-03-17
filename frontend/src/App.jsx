import { createBrowserRouter,RouterProvider } from "react-router"
import RootLayout from "./components/RootLayout"
import Products from './components/Products'
import ProductCard from './components/ProductCard';
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import SignUp from "./components/SignUp";
import SignIn from './components/SignIn';
import UserProfile from './components/UserProfile'
import { Toaster } from "react-hot-toast";
import Orders from "./components/Orders";
import AdminProfile from './components/AdminProfile'
import PublicNavBar from "./components/PublicNavBar";
import UserNavBar from "./components/UserNavBar";
import AdminNavBar from "./components/AdminNavBar";
import PlaceOrder from "./components/PlaceOrder";
import Users from './components/Users'
import AddProduct from "./components/AddProduct";
import AdminProducts from "./components/AdminProduct";
import EditUser from "./components/EditUser";
import ChangePassword from "./components/ChangePassword";

function App() {
   const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"",
          element:<Products/>
        },
        {
          path:"product/:productId",
          element:<ProductCard/>
        },
        {
          path:"wishlist",
          element:<Wishlist/>
        },
        {
          path:"cart",
          element:<Cart/>
        },
        {
          path:"signup",
          element:<SignUp/>
        },
        {
          path:"signin",
          element:<SignIn/>
        },
        {
          path:"user-profile",
          element:<UserProfile/>
        },
        {
          path:"place-order",
          element:<PlaceOrder/>
        },
        {
          path:"admin-profile",
          element:<AdminProfile/>
        },
        {
          path:"public-navbar",
          element:<PublicNavBar/>
        },
        {
          path:"user-navbar",
          element:<UserNavBar/>
        },
        {
          path:"admin-navbar",
          element:<AdminNavBar/>
        },
        {
          path:"orders",
          element:<Orders/>
        },
        {
          path:"users",
          element:<Users/>
        },
        {
            path:"add-product",
            element:<AddProduct/>
        },
        {
          path:"admin-products",
          element:<AdminProducts/>
        },
        {
          path:"edit-user",
          element:<EditUser/>
        },
        {
          path:"change-password",
          element:<ChangePassword/>

        },
      ]
    }

   ])
  return (
    <>
  <Toaster position ='top-center' reverseOrder={false}></Toaster>
  <RouterProvider router={routerObj}></RouterProvider>
  </>
  )
}

export default App
