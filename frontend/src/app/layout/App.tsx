import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import OrderLinePage from "../../features/orderLine/orderLinePage";

export const API_URL = import.meta.env.VITE_APP_API_URL
export const BASE_URL = 'http://xn--80aaheb8augcqiln.xn--90ais/'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<OrderLinePage />} />
        </Route>
    )
);

function App() {

    return (
        <RouterProvider router={router} />
        // <div className={"d-flex flex-column min-vh-100"}>
        //     <Header title={'РУП "Гродненское агентство по государственной регистрации и земельному кадастру"'}/>
        //     <NavBar/>
        //     <div className={"main"}>
        //         <Container fluid>
        //             <div className={"content"}>
        //                 <OrderLineSearch/>
        //             </div>
        //         </Container>
        //     </div>
        //     <Footer/>
        // </div>
    )
}

export default App
