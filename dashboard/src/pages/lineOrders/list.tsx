import { List, EditButton, FilterDropdown, getDefaultSortOrder, ShowButton, useSelect, useTable, BooleanField, DateField } from "@refinedev/antd";
import { getDefaultFilter, useMany } from "@refinedev/core";
import { Select, Space, Table } from "antd";


export const LineOrdersList = () => {
    // We'll use pass `tableProps` to the `<Table />` component,
    // This will manage the data, pagination, filters and sorters for us.
    const { tableProps, sorters, filters } = useTable({
        //resource: "line_orders",
        sorters: { initial: [{ field: "created_at", order: "desc" }] },
        // We're adding default values for our filters
        filters: {
            initial: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: []
                },
                {
                    field: "is_completed__in",
                    operator: "eq",
                    value: []
                }
            ],
        },
        syncWithLocation: true,
    });


    // const { data: organizations, isLoading } = useMany({
    //     resource: "organizations",
    //     //ids: data?.data?.map((order) => order.organization_id) ?? [],
    //     ids: tableProps?.dataSource?.map((order) => order.organization_id) ?? [],
    // });

    const { selectProps: organyzationSelectProps, query: queryResult, } = useSelect({
        resource: "organizations",
        optionLabel: "title",
        optionValue: "id",
        sorters: [{ field: "id", order: "asc" }],
        //defaultValue: getDefaultFilter("organization_id", filters, "in"),
        defaultValue: getDefaultFilter("organization_id", filters, "eq"),
    });

    const organizations = queryResult?.data?.data || [];

    return (
        <List>
            <Table {...tableProps} rowKey={"id"}>
                {/* <Table.Column dataIndex="id" title="ID" /> */}
                <Table.Column dataIndex="order_number" title="Номер заказа"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_number", sorters)} />
                <Table.Column
                    dataIndex={["organization_id", "title"]}
                    title="Организация"
                    key={"organization_id__in"}
                    filterDropdown={(props) => (
                        <FilterDropdown
                            {...props}
                            // We'll store the selected id as number
                            //mapValue={(selectedKey) => Number(selectedKey)}
                            selectedKeys={props.selectedKeys.map((item) => Number(item))}
                        >
                            {/* <Select style={{ minWidth: 200 }} {...selectProps} /> */}
                            <Select {...organyzationSelectProps}
                                allowClear
                                mode="multiple"
                                style={{ width: "200px" }}
                            />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter("organization_id__in", filters, "eq")}
                    render={(_, value) => {
                        const organization = organizations.find(
                            (organization) => organization?.id === value?.organization_id,
                        );

                        return (organization?.title || "-")
                    }}
                />
                <Table.Column dataIndex={["order_create_date"]} title="Дата заказа"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_create_date", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY HH:mm" />} />
                <Table.Column dataIndex="costumer_contact_phone" title="Телефон" />
                <Table.Column dataIndex={["is_completed"]} title="Статус"
                    key={"is_completed__in"}
                    sorter
                    defaultSortOrder={getDefaultSortOrder("is_completed", sorters)}
                    defaultFilteredValue={getDefaultFilter("is_completed__in", filters, "eq")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ width: "250px" }}
                                allowClear
                                mode="multiple"
                            //placeholder={t("products.filter.isActive.placeholder")}
                            >
                                <Select.Option value="true">
                                    {/* {t("products.fields.isActive.true")} */}
                                    Выполенн
                                </Select.Option>
                                <Select.Option value="false">
                                    {/* {t("products.fields.isActive.false")} */}
                                    В работе
                                </Select.Option>
                            </Select>
                        </FilterDropdown>
                    )}
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