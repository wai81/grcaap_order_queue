import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./Navbar";
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

const Layout: React.FC = () => {
    return (
        <div className={"d-flex flex-column min-vh-100"}>
            <Header title={'РУП "Гродненское агентство по государственной регистрации и земельному кадастру"'} />
            <NavBar />
            <div className={"main"}>
                <Container fluid>
                    <div className={"content"}>
                        <Outlet />
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
