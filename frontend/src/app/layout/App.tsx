import Header from "./Header";
import "./styles.css"
import OrderLineSearch from "../componets/orderLineSearch/orderLineSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import Footer from "./Footer";

function App() {

    return (
        <div className={"wrapper"}>
            <Container fluid>
                <Header title={'РУП "Гродненское агентство по государственной регистрации и земельному кадастру"'}/>
                <div className={"content"}>
                    <OrderLineSearch/>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}

export default App
