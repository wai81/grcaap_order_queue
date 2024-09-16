import * as React from "react";
import {Col, Row} from "react-bootstrap";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({title}) => {

    return (
        <Row>
            <Col>
                <h1 className="align-items-center">{title}</h1>
            </Col>

        </Row>
    )
}
export default Header;