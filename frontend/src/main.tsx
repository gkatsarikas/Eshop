import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App"
import './index.css'
import HomePage from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StoreProvider } from "./Store"
import CartPage from "./pages/CartPage"
import PlaceOrderPage from "./pages/PlaceOrder"
import UserOrdersPage from "./pages/UserOrders"
import CreateProductPage from "./pages/CreateProduct"
import UpdateProductPage from "./pages/UpdateProduct"
import DeleteProductPage from "./pages/DeleteProduct"
import OrderPage from "./pages/OrderPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { AuthProvider } from "./hooks/AuthHook"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} element={<HomePage/>} />
      <Route path="login" element={<LoginPage/>} />
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="product/:title" element={<ProductPage/>}/>
      <Route path="cart" element={<CartPage/>}/>
      <Route path="order/preview" element={<PlaceOrderPage />}/>
      <Route path="order/info/:id" element={<OrderPage />} />
      <Route path="orders/history" element={<UserOrdersPage/>}/>
      <Route path="/product/create" element={<CreateProductPage />} />
      <Route path="/product/update" element={<UpdateProductPage/>} />
      <Route path="/product/delete" element={<DeleteProductPage/>} />
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
        </HelmetProvider>
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
)
