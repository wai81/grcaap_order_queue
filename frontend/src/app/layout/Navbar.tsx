import { Container, Nav, Navbar } from "react-bootstrap";
import { BASE_URL } from "./App";

const NavBar: React.FC = () => {

    return (
      <Navbar className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href={BASE_URL}>
            <img
              src="/assets/Logo_with_Text.png"
              alt="logo"
              width={"250"}
              className="mt-2"
            />
          </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href={BASE_URL}>Вернутся на главную</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default NavBar;
