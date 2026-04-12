import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import Products from "./components/Products";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";
import UserDashboard from "./components/UserDashboard";
import Orders from "./components/Orders";
import AdminProfile from "./components/AdminProfile";
import AdminDashboard from "./components/AdminDashboard";
import PlaceOrder from "./components/PlaceOrder";
import Users from "./components/Users";
import AddProduct from "./components/AddProduct";
import AdminProducts from "./components/AdminProduct";
import EditUser from "./components/EditUser";
import ChangePassword from "./components/ChangePassword";
import AdminOrders from "./components/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Products />
        },
        {
          path: "product/:productId",
          element: <ProductCard />
        },
        {
          path: "wishlist",
          element: <Wishlist />
        },
        {
          path: "cart",
          element: <Cart />
        },
        {
          path: "signup",
          element: <SignUp />
        },
        {
          path: "signin",
          element: <SignIn />
        },
        {
          path: "unauthorized",
          element: <Unauthorized />
        },

        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <UserDashboard />
            },
            {
              path: "edit-user",
              element: <EditUser />
            },
            {
              path: "change-password",
              element: <ChangePassword />
            }
          ]
        },

        {
          path: "admin-profile",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <AdminDashboard />
            },
            {
              path: "orders",
              element: <Orders />
            },
            {
              path: "users",
              element: <Users />
            },
            {
              path: "add-product",
              element: <AddProduct />
            },
            {
              path: "admin-products",
              element: <AdminProducts />
            },
            {
              path: "admin-orders",
              element: <AdminOrders />
            }
          ]
        },

        {
          path: "place-order",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <PlaceOrder />
            </ProtectedRoute>
          )
        }
      ]
    }
  ]);

  return <RouterProvider router={routerObj} />;
}

export default App;