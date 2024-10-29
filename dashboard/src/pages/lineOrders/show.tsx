import { useOne } from "@refinedev/core";

export const ShowLineOrder = () => {
    const { data, isLoading } = useOne({ resource: "line_orders/order", id: 'c8314ed7-40b3-4e00-8f3f-e664227ed7ef' });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Заказ: {data?.data.order_number}</div>;
};