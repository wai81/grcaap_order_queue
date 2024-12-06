import { List, EditButton, FilterDropdown, getDefaultSortOrder, ShowButton, useSelect, useTable, BooleanField, DateField, CreateButton, rangePickerFilterMapper } from "@refinedev/antd";
import { getDefaultFilter, HttpError, useMany } from "@refinedev/core";
import { DatePicker, Input, Select, Space, Table, Tag, theme, Typography } from "antd";
import { ILineOrder, IOrganization } from "../../interfaces";
import { PaginationTotal } from "../../components/paginationTotal";
import { OrderStatus } from "../../components/order/status";
import { SearchOutlined, TagOutlined, TagsOutlined } from "@ant-design/icons";


export const OrdersLineList = () => {
    const { token } = theme.useToken();
    // We'll use pass `tableProps` to the `<Table />` component,
    // This will manage the data, pagination, filters and sorters for us.
    const { tableProps, sorters, filters } = useTable<ILineOrder, HttpError>({
        resource: "line_orders/in_line",
        sorters: { initial: [{ field: "created_at", order: "desc" }] },
        // We're adding default values for our filters
        filters: {
            initial: [
                {
                    field: "order_number",
                    operator: "eq",
                    value: "",
                },
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: []
                },
                {
                    field: "order_create_date",
                    operator: "between",
                    value: ["", ""],
                },
            ],
        },
        syncWithLocation: true,
    });


    // const { data: organizations, isLoading } = useMany({
    //     resource: "organizations",
    //     //ids: data?.data?.map((order) => order.organization_id) ?? [],
    //     ids: tableProps?.dataSource?.map((order) => order.organization_id) ?? [],
    // });

    const { selectProps: organyzationSelectProps, query: queryResult, } = useSelect<IOrganization>({
        resource: "organizations",
        optionLabel: "title",
        optionValue: "id",
        sorters: [{ field: "id", order: "asc" }],
        //defaultValue: getDefaultFilter("organization_id", filters, "in"),
        defaultValue: getDefaultFilter("organization_id", filters, "eq"),
        pagination: {
            pageSize: 25,
        },
    });

    const organizations = queryResult?.data?.data || [];

    return (
        <List
        >
            <Table
                {...tableProps}
                rowKey={"id"}
                pagination={{
                    ...tableProps.pagination,
                    showTotal: (total) => (
                        <PaginationTotal total={total} entityName="Orders" />
                    ),
                }}
            >
                <Table.Column dataIndex="row_num" title="Очередь"
                    render={(value: any) => {
                        return (
                            <Tag color="orange" icon={<TagOutlined />}>
                                {value}
                            </Tag>
                        )
                    }}
                />
                <Table.Column dataIndex="order_number" title="Номер заказа"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("order_number", sorters)}
                    key={"order_number"}
                    filterIcon={(filtered) => (
                        <SearchOutlined
                            style={{
                                color: filtered ? token.colorPrimary : undefined,
                            }}
                        />
                    )}
                    defaultFilteredValue={getDefaultFilter("order_number", filters, "eq")}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input
                                placeholder={"Введите Номер заказа"}
                            //placeholder={t("products.filter.name.placeholder")} 
                            />
                        </FilterDropdown>
                    )}
                    render={(value: string) => {
                        return (
                            <Typography.Text
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {value}
                            </Typography.Text>
                        );
                    }}
                />
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
                <Table.Column dataIndex={["order_create_date"]}
                    title="Дата заказа"
                    sorter
                    filterDropdown={(props) => (
                        <FilterDropdown
                            {...props}
                            mapValue={(selectedKeys, event) => {
                                return rangePickerFilterMapper(selectedKeys, event);
                            }}
                        >
                            <DatePicker.RangePicker />
                        </FilterDropdown>
                    )}
                    defaultFilteredValue={getDefaultFilter(
                        "order_create_date",
                        filters,
                        "between",
                    )}
                    defaultSortOrder={getDefaultSortOrder("order_create_date", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY" />} />
                <Table.Column dataIndex="costumer_contact_phone" title="Телефон" />
                <Table.Column dataIndex={["is_completed"]} title="Статус"
                    key={"is_completed__in"}
                    render={(value: boolean) => <OrderStatus status={value} />}
                />
                <Table.Column dataIndex={["created_at"]} title="Создан"
                    sorter
                    defaultSortOrder={getDefaultSortOrder("created_at", sorters)}
                    render={(value: any) => <DateField value={value} format=" DD.MM.YYYY HH:mm" />} />
                {/* <Table.Column
                    title=""
                    render={(_, record) => (
                        <Space>
                            <ShowButton hideText size="small" recordItemId={record.id} />
                            <EditButton disabled hideText size="small" recordItemId={record.id} />
                        </Space>
                    )}
                /> */}

            </Table>
        </List>
    );
};