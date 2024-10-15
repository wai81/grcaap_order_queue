import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.css"

const Footer: React.FC = () => {
    return (
        <footer className={"footer"}>
            <Container fluid>
                <Row>
                    <Col className="footer-branch" xs={6} sm={4} md={3} lg={2}>


                        <h4 className="branch-title">
                            Гродненское агентство
                        </h4>
                        <div>г. Гродно, 230003</div>
                        <div>ул. Захарова, 27</div>
                        <div><span>Телефон: </span> (0152) 62 21 62</div>
                        <div><span>Факс: </span> (0152) 62 21 34</div>
                        <div><span>Email: </span><a href="mailto:d400@nca.by">d400@nca.by</a></div>
                    </Col>
                    <Col className="footer-branch" xs={6} sm={4} md={3} lg={2}>


                        <h4 className="branch-title">
                            Волковысский филиал
                        </h4>
                        <div>г. Волковыск, 231900</div>
                        <div>ул. Ленина, 37</div>
                        <div><span>Телефон: </span>(01512) 2 36 19</div>
                        <div><span>Факс: </span> (01512) 2 36 08</div>
                        <div><span>Email: </span><a href="mailto:d410@nca.by">d410@nca.by</a></div>
                    </Col>
                    <Col className="footer-branch" xs={6} sm={4} md={3} lg={2}>


                        <h4 className="branch-title">
                            Лидский филиал
                        </h4>
                        <div>г. Лида, 231281</div>
                        <div>ул. Чапаева, 20</div>
                        <div><span>Телефон: </span>(0154) 52 58 55</div>
                        <div><span>Факс: </span> (0154) 52 58 55</div>
                        <div><span>Email: </span><a href="mailto:d420@nca.by">d420@nca.by</a></div>
                    </Col>
                    <Col className="footer-branch" xs={6} sm={4} md={3} lg={2}>


                        <h4 className="branch-title" >
                            Новогрудский филиал
                        </h4>
                        <div>г. Новогрудок, 231244</div>
                        <div>ул. Мицкевича, 20</div>
                        <div><span>Телефон: </span>(01597) 3 50 02</div>
                        <div><span>Факс: </span> (01597) 3 50 02</div>
                        <div><span>Email: </span> <a href="mailto:d430@nca.by">d430@nca.by</a></div>
                    </Col>
                    <Col className="footer-branch" xs={6} sm={4} md={3} lg={2}>


                        <h4 className="branch-title">
                            Ошмянский филиал
                        </h4>
                        <div>г. Ошмяны, 231103</div>
                        <div>ул. Первомайская, 9а</div>
                        <div><span>Телефон: </span>(01593) 2 23 81</div>
                        <div><span>Факс: </span> (01593) 2 23 81</div>
                        <div><span>Email: </span> <a href="mailto:d440@nca.by">d440@nca.by</a></div>
                    </Col>
                    <Col className="footer-branch" xs={6} sm={4} md={3} lg={2}>


                        <h4 className="branch-title">
                            Слонимский филиал
                        </h4>
                        <div>г. Слоним, 231800</div>
                        <div>ул. Первомайская, 1</div>
                        <div><span>Телефон: </span>(01562) 6 28 90</div>
                        <div><span>Факс: </span> (01562) 6 28 96</div>
                        <div><span>Email: </span> <a href="mailto:d450@nca.by">d450@nca.by</a></div>
                    </Col>

                </Row>
            </Container>
            {/*Footer bottom*/}
            <div className={"footer-bottom"}>
                <p className={"text-center"}>
                    &copy;
                    {new Date().getFullYear()} РУП "Гродненское агентство по государственной регистрации и
                    земельному кадастру"
                </p>
            </div>

        </footer>

    )
}

export default Footer