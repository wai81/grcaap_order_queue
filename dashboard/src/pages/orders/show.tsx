import { MarkdownField, Show, TextField } from "@refinedev/antd";
import { useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";

export const OrderShow = () => {
    const { query: { data, isLoading }, } = useShow();

    const { data: organizationData, isLoading: organizationIsLoading } = useOne({
        resource: "organizations",
        id: data?.data?.organization_id || "",
        queryOptions: {
            enabled: !!data?.data,
        },
    });

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Show>
            <Typography.Title level={5}>Id</Typography.Title>
            <TextField value={data?.data?.id} />

            <Typography.Title level={5}>Номер заказа</Typography.Title>
            <TextField value={data?.data?.order_number} />

            <Typography.Title level={5}>Дата заказа</Typography.Title>
            <TextField value={data?.data?.order_create_date} />

            <Typography.Title level={5}>Телефон</Typography.Title>
            <MarkdownField value={data?.data?.costumer_contact_phone} />

            <Typography.Title level={5}>ТОР</Typography.Title>
            <TextField
                value={organizationIsLoading ? "Загрузка..." : organizationData?.data?.title}
            />

            <Typography.Title level={5}>Статус</Typography.Title>
            <TextField value={data?.data?.is_completed} />

            <Typography.Title level={5}>Создан</Typography.Title>
            <TextField value={data?.data?.created_at} />
        </Show>);
};