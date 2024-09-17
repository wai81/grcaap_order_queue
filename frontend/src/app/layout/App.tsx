import Header from "./Header";
import "./styles.css"
import OrderLineSearch from "../componets/orderLineSearch/orderLineSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import Footer from "./Footer";

export const API_URL = import.meta.env.VITE_APP_API_URL

function App() {

    return (
        <div className={"d-flex flex-column min-vh-100"}>
            <Header title={'РУП "Гродненское агентство по государственной регистрации и земельному кадастру"'}/>
            <div className={"main"}>
                <Container fluid>
                    <div className={"content"}>
                        <OrderLineSearch/>
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default App
