import { Nav, Navbar } from "react-bootstrap";
import { BASE_URL } from "./App";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {

  return (
    <Navbar className="bg-body-tertiary">
      <Nav>
        <Nav.Link href={BASE_URL}>Вернутся на главную</Nav.Link>
        {/* <Nav.Link as={Link} to={"/"}>Очередь заказа</Nav.Link> */}
      </Nav>
    </Navbar>
  );
}
export default NavBar;
