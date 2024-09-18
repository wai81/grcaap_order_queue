import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {

    return (
        <header className="text-left text-secondary py-3">
            <Container fluid>
            <Row>
                <Col md={2}>
                    <img src="/assets/Logo_with_Text.png" alt="logo" width={"95%"} className="m-3"/>
                </Col>
                <Col md={7}>
                    <h2 className="mt-3"><b>{title}</b></h2>
                </Col>
                <Col md={3}></Col>
            </Row>
            </Container>
        </header>
    )
}
export default Header;