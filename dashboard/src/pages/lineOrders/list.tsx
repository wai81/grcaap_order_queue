import { List, EditButton, FilterDropdown, getDefaultSortOrder, ShowButton, useSelect, useTable, BooleanField, DateField } from "@refinedev/antd";
import { getDefaultFilter, useMany } from "@refinedev/core";
import { Select, Space, Table } from "antd";


export const LineOrdersList = () => {
    // We'll use pass `tableProps` to the `<Table />` component,
    // This will manage the data, pagination, filters and sorters for us.
    const { tableProps, sorters, filters } = useTable({
        //*resource: "line_orders",
        sorters: { initial: [{ field: "order_number", order: "asc" }] },
        // We're adding default values for our filters
        filters: {
            initial: [{ field: "organization_id", operator: "eq", value: 400 }],
        },
        syncWithLocation: true,
    });


    const { data: organizations, isLoading } = useMany({
        resource: "organizations",
        //ids: data?.data?.map((order) => order.organization_id) ?? [],
        ids: tableProps?.dataSource?.map((order) => order.organization_id) ?? [],
    });

    const { selectProps } = useSelect({
        resource: "organizations",
        //defaultValue: getDefaultFilter("organization_id", filters, "eq"),
    });

    return (
        <List>
            <Table {...tableProps} rowKey={"id"}>
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="order_number" title="Номер заказа"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_number", sorters)} />
                <Table.Column
                    dataIndex={"organization_id"}
                    title="Организация"
                    render={(value) => {
                        if (isLoading) {
                            return "Loading...";
                        }

                        return organizations?.data?.find((organization) => organization.id == value)
                            ?.title;
                    }}
                    filterDropdown={(props) => (
                        <FilterDropdown
                            {...props}
                            // We'll store the selected id as number
                            mapValue={(selectedKey) => Number(selectedKey)}
                        >
                            <Select style={{ minWidth: 200 }} {...selectProps} />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("organization.id", filters, "eq")}
                />
                <Table.Column dataIndex={["order_create_date"]} title="Дата заказа"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_create_date", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY HH:mm" />} />
                <Table.Column dataIndex="costumer_contact_phone" title="Телефон" />
                <Table.Column dataIndex={["is_completed"]} title="Статус"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("is_completed", sorters)}
                    render={(value: any) => <BooleanField value={value} />}
                />
                <Table.Column dataIndex={["created_at"]} title="Создан"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("created_at", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY HH:mm" />} />
                <Table.Column
                    title=""
                    render={(_, record) => (
                        <Space>
                            {/* We'll use the `EditButton` and `ShowButton` to manage navigation easily */}
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <EditButton hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                />

            </Table>
        </List>
    );
};