import { Refine, WelcomePage } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { ShowLineOrder } from './pages/lineOrders/show'
import { EditLineOrder } from './pages/lineOrders/edit'



function App() {


  return (
    <Refine dataProvider={dataProvider}>
      {/* <WelcomePage /> */}
      {/* <ShowLineOrder /> */}
      <EditLineOrder />
    </Refine>
  )
}

export default App
