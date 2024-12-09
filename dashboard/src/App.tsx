import { Authenticated, Refine } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { OrderShow } from './pages/orders/show'
import { OrderEdit } from './pages/orders/edit'
import { OrdersList } from './pages/orders/list'
import { OrderCreate } from './pages/orders/create'
import { authProvider } from './providers/auth-provider'
import { Login } from './pages/login'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ConfigProvider, App as AntdApp } from 'antd'
import ru_Ru from 'antd/locale/ru_RU'
import 'dayjs/locale/ru';
import { ThemedLayoutV2, ThemedTitleV2, useNotificationProvider } from "@refinedev/antd";
import "antd/dist/reset.css";
import { OrganizationList } from './pages/organizations/list'
import { DashboardOutlined } from '@ant-design/icons'
import { DashboardPage } from './pages/dashboard'
import { OrdersLineList } from './pages/orders_line/list'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider locale={ru_Ru}>
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
                  label: "Инфо-панель",
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "orders",
                meta: {
                  label: "Заказы"
                }
              },
              {
                name: "line_orders",
                list: "/orders/all_orders",
                show: "/orders/all_orders/:id",
                edit: "/orders/all_orders/:id/edit",
                create: "/orders/all_orders/create",
                meta: {
                  label: "Все Заказы",
                  parent: "orders",
                },
              },
              {
                name: "in_line",
                list: "orders/orders_line",
                meta: {
                  label: "Заказы в очереди",
                  parent: "orders",
                },
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
                <Route index element={<NavigateToResource resource="dashboard" />} />

                <Route path='orders'>
                  <Route path='all_orders'>
                    <Route index element={<OrdersList />} />
                    <Route path=":id" element={<OrderShow />} />
                    <Route path=":id/edit" element={<OrderEdit />} />
                    <Route path="create" element={<OrderCreate />} />
                  </Route>
                  <Route path="orders_line">
                    <Route index element={<OrdersLineList />} />
                  </Route>
                </Route>
                <Route path="organizations">
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
