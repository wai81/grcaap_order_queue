import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useStore} from "../../stores/store";
//import "./styles.css"
import SearchResults from "../searchResult/searhResult";
import {Button, Card, CardFooter, Col, Form, InputGroup, Row, Stack} from "react-bootstrap";

const OrderLineSearch: React.FC = observer(() => {
    const {organizationStore, orderLineStore} = useStore();
    const [orderNumber, setOrderNumber] = useState('');
    const [selectedOrganizationId, setSelectedOrganizationId] = useState<number | null>(null);

    useEffect(() => {
        organizationStore.fetchOrganizations();
    }, []);

    function useInputValue(defaultValue = ' ') {
        const [value, setValue] = useState(defaultValue)
        return {
            bind: {
                value,
                onChange: event => setValue(event.target.value)
            },
            clear: () => setValue(''),
            value: () => value
        }
    }

    const handleSearch = () => {
        orderLineStore.clearSearchResult();
        if (orderNumber && selectedOrganizationId) {
            orderLineStore.searchRecord(orderNumber, selectedOrganizationId);

        }

    };


    return (
        <div className="p-4">
            <Row>
                <Col xs={0} md={1} >
                </Col>
                <Col xs={12} md={6} className="p-2">
                    <Card className={"bg-light"}>
                        {/*<Card.Header>*/}
                        {/*    <h4 className="text-xl font-bold ">Состояние очереди по техинической инвентаризации:</h4>*/}
                        {/*</Card.Header>*/}
                        <Card.Body>
                            <Card.Title>
                                <h4 className="text-xl font-bold ">Состояние очереди по техинической инвентаризации:</h4>
                            </Card.Title>
                            <div className={"p-3"}>
                                <div className="mb-2">
                                    <Form.Label className="block mb-0">
                                        Заказ/Договор принят
                                    </Form.Label>

                                    <Form.Select
                                        onChange={(e) => setSelectedOrganizationId(Number(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required
                                    >
                                        <option value="">-Выберите организацию-</option>
                                        {organizationStore.organizations.map((organization) => (
                                            <option key={organization.id} value={organization.id}>
                                                {organization.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста выберите Организацию принявшее заявку или договор
                                    </Form.Control.Feedback>
                                </div>
                                <Stack direction="horizontal" gap={2}>
                                    {/*<div className="mb-4">*/}
                                    {/*<Form.Label className="block mb-2">Номер Заказа/Договора</Form.Label>*/}

                                    <Form.Control
                                        type="text"
                                        value={orderNumber}
                                        onChange={(e) => setOrderNumber(e.target.value)}
                                        placeholder={"Введите Номер Заказа/Договора"}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        {...input.bind}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста укажите Номер заявки
                                    </Form.Control.Feedback>


                                    <Button
                                        variant="secondary"
                                        onClick={handleSearch}
                                    >
                                        Поиск
                                    </Button>
                                    {/*</div>*/}
                                </Stack>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={4} className="p-2">
                    <SearchResults
                        loading={orderLineStore.searchLoading}
                        error={orderLineStore.searchError}
                        orderLine={orderLineStore.orderLine}
                    />
                </Col>
                <Col xs={0} md={1} >
                </Col>
            </Row>
        </div>


    );
});

export default OrderLineSearch