import Header from "./Header";
import "./styles.css"
import OrderLineSearch from "../componets/orderLineSearch/orderLineSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import Footer from "./Footer";

function App() {
    console.log(import.meta.env.REACT_APP_API_URL);
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
