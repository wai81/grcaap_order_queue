import { useShow } from "@refinedev/core";

export const ShowLineOrder = () => {
    const { query: { data, isLoading }, } = useShow();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div>Заказ: {data?.data.order_number}</div>;
};