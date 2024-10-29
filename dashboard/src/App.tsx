import { Refine, WelcomePage } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { ShowLineOrder } from './pages/lineOrders/show'
import { EditLineOrder } from './pages/lineOrders/edit'
import { ListLineOrders } from './pages/lineOrders/list'



function App() {


  return (
    <Refine dataProvider={dataProvider}>
      {/* <WelcomePage /> */}
      {/* <ShowLineOrder /> */}
      {/* <EditLineOrder /> */}
      < ListLineOrders />
    </Refine>
  )
}

export default App
