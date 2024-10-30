import { useOne } from "@refinedev/core";

export const ShowLineOrder = () => {
    const { data, isLoading } = useOne({ resource: "line_orders", id: 'f431e951-252f-4f54-8b1e-22759bcccf2d' });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Заказ: {data?.data.order_number}</div>;
};