import { Authenticated, Refine } from '@refinedev/core'
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
import { ConfigProvider, App as AntdApp } from 'antd'
import { ThemedLayoutV2 } from "@refinedev/antd";
import "antd/dist/reset.css";

function App() {


  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "line_orders",
                list: "/line_orders",
                show: "/line_orders/:id",
                edit: "/line_orders/:id/edit",
                create: "/line_orders/create",
                meta: { label: "Line Orders" },
              },
            ]}
          >
            <Routes>
              <Route element={
                // We're wrapping our routes with the `<Authenticated />` component
                // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                <Authenticated key="authenticated-routes" redirectOnFail="/login">
                  {/* <Header /> */}
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }>
                <Route index element={<Navigate to="/line_orders" />} />
                <Route path='/line_orders'>
                  <Route index element={<ListLineOrders />} />
                  <Route path=":id" element={<ShowLineOrder />} />
                  <Route path=":id/edit" element={<EditLineOrder />} />
                  <Route path="create" element={<CreateOrderLine />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                    <Navigate to="/line_orders" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
