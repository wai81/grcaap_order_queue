import { Authenticated, Refine, WelcomePage } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { ShowLineOrder } from './pages/lineOrders/show'
import { EditLineOrder } from './pages/lineOrders/edit'
import { ListLineOrders } from './pages/lineOrders/list'
import { CreateOrderLine } from './pages/lineOrders/create'
import { authProvider } from './providers/auth-provider'
import { Login } from './pages/login'
import { Header } from './components/header'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import routerProvider from "@refinedev/react-router-v6";


function App() {


  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
        routerProvider={routerProvider}
      >
        <Routes>
          <Route element={
            // We're wrapping our routes with the `<Authenticated />` component
            // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
            // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
            <Authenticated key="authenticated-routes" redirectOnFail="/login">
              <Header />
              <Outlet />
            </Authenticated>
          }>
            <Route index element={<ListLineOrders />} />
          </Route>
          <Route
            element={
              <Authenticated key="auth-pages" fallback={<Outlet />}>
                {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                <Navigate to="/" />
              </Authenticated>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  )
}

export default App
