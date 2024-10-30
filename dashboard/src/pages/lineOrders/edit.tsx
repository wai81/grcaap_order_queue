import { useOne, useUpdate } from "@refinedev/core";

export const EditLineOrder = () => {
    const { data, isLoading } = useOne({ resource: "line_orders/order", id: 'c8314ed7-40b3-4e00-8f3f-e664227ed7ef' });
    const { mutate, isLoading: isUpdating } = useUpdate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const updateStatus = async () => {
        await mutate({
            resource: "line_orders",
            id: 'f431e951-252f-4f54-8b1e-22759bcccf2d',
            values: {
                is_completed: true,
            },
        });
    };

    return (
        <div>
            <div>Заказ: {data?.data.order_number}</div>
            <div>Очередь: {data?.data.row_num}</div>
            <div>Статус: {data?.data.is_completed}</div>
            <button onClick={updateStatus}>Изменить статус</button>
        </div>
    );
};