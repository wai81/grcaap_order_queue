import { Authenticated, Refine } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { LineOrderShow } from './pages/lineOrders/show'
import { LineOrderEdit } from './pages/lineOrders/edit'
import { LineOrdersList } from './pages/lineOrders/list'
import { LineOrderCreate } from './pages/lineOrders/create'
import { authProvider } from './providers/auth-provider'
import { Login } from './pages/login'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ConfigProvider, App as AntdApp } from 'antd'
import { ThemedLayoutV2, ThemedTitleV2, useNotificationProvider } from "@refinedev/antd";
import "antd/dist/reset.css";
import { OrganizationList } from './pages/organizations/list'
import { DashboardOutlined } from '@ant-design/icons'
import { DashboardPage } from './pages/dashboard'

function App() {


  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Инфа-панель",
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "line_orders",
                list: "/orders",
                show: "/orders/:id",
                edit: "/orders/:id/edit",
                create: "/orders/create",
                meta: { label: "Заказы" },
              },
              {
                name: "organizations",
                list: "/organizations",
                meta: { label: "Организации" },
              }

            ]}
          >
            <Routes>
              <Route element={
                // We're wrapping our routes with the `<Authenticated />` component
                // We're omitting the `fallback` prop to redirect users to the login page if they are not authenticated.
                // If the user is authenticated, we'll render the `<Header />` component and the `<Outlet />` component to render the inner routes.
                <Authenticated key="authenticated-routes" redirectOnFail="/login">
                  {/* <Header /> */}
                  <ThemedLayoutV2 Title={(props) => (<ThemedTitleV2 {...props} text="Состояние заказов" />)}>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }>
                <Route index element={<DashboardPage />} />
                <Route index element={<NavigateToResource resource="line_orders" />} />
                <Route path='/orders'>
                  <Route index element={<LineOrdersList />} />
                  <Route path=":id" element={<LineOrderShow />} />
                  <Route path=":id/edit" element={<LineOrderEdit />} />
                  <Route path="create" element={<LineOrderCreate />} />
                </Route>
                <Route path="/organizations">
                  <Route index element={<OrganizationList />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    {/* We're redirecting the user to `/` if they are authenticated and trying to access the `/login` route */}
                    {/* <NavigateToResource resource="line_orders" /> */}
                    <NavigateToResource resource="dashboard" />
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
