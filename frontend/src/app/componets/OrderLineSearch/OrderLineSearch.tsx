import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {useStore} from "../../stores/store";
import "./styles.css"
import SearchResults from "../searchResult/searhResult";

const OrderLineSearch: React.FC = observer(() => {
    const { organizationStore, orderLineStore } = useStore();
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
            <h2 className="text-xl font-bold mb-4">Состояние очереди по техинической инвентаризации:</h2>
            <div className="mb-4">
                <label className="block mb-2">
                    Выберите организацию принявшую Заказ/Договор:
                </label>
                <select
                    onChange={(e) => setSelectedOrganizationId(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="">-Выберите организацию-</option>
                    {organizationStore.organizations.map((organization) => (
                        <option key={organization.id} value={organization.id}>
                            {organization.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-2">Номер Заказа/Договора:</label>
                <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...input.bind}
                />
            </div>

            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 rounded-md"
            >
                Поиск
            </button>
            <SearchResults
                loading={orderLineStore.searchLoading}
                error={orderLineStore.searchError}
                orderLine={orderLineStore.orderLine}
            />
        </div>
    );
});

export default OrderLineSearch