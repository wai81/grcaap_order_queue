import { Authenticated, Refine, WelcomePage } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { ShowLineOrder } from './pages/lineOrders/show'
import { EditLineOrder } from './pages/lineOrders/edit'
import { ListLineOrders } from './pages/lineOrders/list'
import { CreateOrderLine } from './pages/lineOrders/create'
import { authProvider } from './providers/auth-provider'
import { Login } from './pages/login'
import { Header } from './components/header'



function App() {


  return (
    <Refine
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Authenticated key="protected" fallback={<div>Вы не авторизованы <Login /></div>}>
        <Header />
        {/* <WelcomePage /> */}
        {/* <ShowLineOrder /> */}
        {/* <EditLineOrder /> */}
        < ListLineOrders />
        {/* <CreateOrderLine /> */}
      </Authenticated>
    </Refine>
  )
}

export default App
