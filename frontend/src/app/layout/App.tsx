import Header from "./Header";
// import "./styles.css"
import OrderLineSearch from "../componets/orderLineSearch/orderLineSearch";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";

function App() {

    return (
        <Container fluid >
            <Header title={'РУП "Гродненское агентство по государственной регистрации и земельному кадастру"'} nameClas/>
            {/* <ul>
                {organizations.map(organization => (
                    <li key={organization.id}>
                        {organization.id} {organization.fullname}
                    </li>
                ))}

            </ul> */}
            {/* <OrganizationSelect/> */}
            <OrderLineSearch/>
        </Container>
    )
}

export default App
