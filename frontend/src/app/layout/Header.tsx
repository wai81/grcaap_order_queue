import * as React from "react";
import {Col, Row} from "react-bootstrap";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {

    return (
        <Row>
            <Col md={2}>
            <img src="/assets/Logo_with_Text.png" alt="logo" width={"95%"} className="m-2"/>
            </Col>
            <Col >
                <h2 className="text-left">{title}</h2>
            </Col>
            <Col md={2}></Col>
        </Row>
    )
}
export default Header;