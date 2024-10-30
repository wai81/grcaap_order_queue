import { useList } from "@refinedev/core";

export const ListLineOrders = () => {
    const { data, isLoading } = useList({
        resource: "line_orders",
        pagination: { current: 1, pageSize: 10 },
        sorters: [{ field: "order_number", order: "asc" }],
        filters: [{ field: "costumer_contact_phone", operator: "eq", value: "375298882999" }],
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Заказы</h1>
            <ul>
                {data?.data?.map((order) => (
                    <li key={order.id}>
                        <p>
                            {order.order_number}
                            <br />
                            Дата: {order.order_create_date}
                            <br />
                            Телефон: {order.costumer_contact_phone}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};