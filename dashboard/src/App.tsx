import { Refine, WelcomePage } from '@refinedev/core'
import { dataProvider } from './providers/data-provider'
import { ShowLineOrder } from './pages/lineOrders/show'

function App() {


  return (
    <Refine dataProvider={dataProvider}>
      {/* <WelcomePage /> */}
      <ShowLineOrder />
    </Refine>
  )
}

export default App
