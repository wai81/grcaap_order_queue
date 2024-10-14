import { observer } from "mobx-react-lite";
import * as React from "react";

import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import { useStore } from "../../stores/store";
import "./styles.css"
import SearchResults from "../searchResult/searhResult";
import { Button, Card, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";



const OrderLineSearch: React.FC = observer(() => {
    const { organizationStore, orderLineStore } = useStore();
    const [orderNumber, setOrderNumber] = useState('');
    const [selectedOrganizationId, setSelectedOrganizationId] = useState<number | null>(null);

    useEffect(() => {
        organizationStore.fetchOrganizations();
    }, []);

    const handleSearch = () => {
        orderLineStore.clearSearchResult();
        // if (orderNumber && selectedOrganizationId) {
        orderLineStore.setOrderNumber(orderNumber);
        orderLineStore.setOrganizationId(selectedOrganizationId);
        orderLineStore.searchRecord();

        // }

    };

    return (
        <div className="p-2 mt-4">
            <Row>
                <Col xs={0} md={1}></Col>
                <Col xs={12} md={6} className="p-2">
                    <Card className={"shadow"}>
                        <Card.Body>
                            <Card.Title>
                                <h4 className="text-xl font-bold ">
                                    Здесь вы можете проверить свою очередь заказа
                                </h4>
                            </Card.Title>
                            <div>
                                <p>Для получения информации по заказу заполните поля формы.</p>
                                <ul>
                                    <li key={'1'}>Выберите "Организацию" где подавался заказ</li>
                                    <li key={'2'}>Укажите "Номер заказа" указанный в расписке или договоре</li>
                                    <li key={'3'}>Нажмите "Поиск"</li>
                                </ul>
                            </div>
                            <div className={"p-0"}>
                                <div className="mb-2">
                                    <InputGroup hasValidation>
                                        <Form.Select
                                            onChange={(e) =>
                                                setSelectedOrganizationId(Number(e.target.value))
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                            isInvalid={orderLineStore.isInvalid}
                                        >
                                            <option value="">-Выберите организацию-</option>
                                            {organizationStore.organizations.map((organization) => (
                                                <option key={organization.id} value={organization.id}>
                                                    {organization.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {orderLineStore.isInvalid && (selectedOrganizationId === null || selectedOrganizationId === 0) && (
                                            <Form.Control.Feedback type="invalid">
                                                Пожалуйста выберите Организацию
                                            </Form.Control.Feedback>
                                        )}

                                    </InputGroup>
                                </div>
                                <Stack direction="horizontal" gap={2} style={{ alignItems: "start" }}>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            value={orderNumber}
                                            onChange={(e) => setOrderNumber(e.target.value)}
                                            placeholder={"Введите Номер Заказа"}
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            {...input.bind}
                                            required
                                            isInvalid={orderLineStore.isInvalid}
                                        />
                                        {orderLineStore.isInvalid && !orderNumber && (
                                            <Form.Control.Feedback type="invalid" >
                                                Пожалуйста введите Номер заявки
                                            </Form.Control.Feedback>
                                        )}
                                    </InputGroup>
                                    <Button variant={'dark'} onClick={handleSearch} >
                                        Поиск
                                    </Button>
                                </Stack>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4} className="p-2">
                    <SearchResults
                        loading={orderLineStore.searchLoading}
                        error={orderLineStore.error}
                        orderLine={orderLineStore.orderLine}
                    />
                </Col>
                <Col xs={0} md={1}></Col>
            </Row>
        </div>
    );
});

export default OrderLineSearch