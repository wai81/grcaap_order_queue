import { useApiUrl, useCustom } from "@refinedev/core";
import { Button, Card, Col, Dropdown, Row, type MenuProps } from "antd";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { DailyOrders } from "../../components/dashboard/dailyOrders";
import { DownOutlined } from "@ant-design/icons";
import { List } from "@refinedev/antd";
import { MapOrders } from "../../components/dashboard/mapOrders";
import { StatusOrdersBarChart } from "../../components/dashboard/statusOrders";

type DateFilter = "lastWeek" | "lastMonth" | "last3Month" | "last6Month" | "last9Month";

const DATE_FILTERS: Record<
    DateFilter,
    {
        text: string;
        value: DateFilter;
    }
> = {
    lastWeek: {
        text: "за неделю",
        value: "lastWeek",
    },
    lastMonth: {
        text: "за меясяц",
        value: "lastMonth",
    },
    last3Month: {
        text: "за 3 месяцев",
        value: "last3Month",
    },
    last6Month: {
        text: "за 6 месяцев",
        value: "last6Month",
    },
    last9Month: {
        text: "за 9 месяцев",
        value: "last9Month",
    },
};

export const DashboardPage: React.FC = () => {
    const API_URL = useApiUrl();

    const [selecetedDateFilter, setSelectedDateFilter] = useState<DateFilter>(
        DATE_FILTERS.lastWeek.value,
    );

    const dateFilters: MenuProps["items"] = useMemo(() => {
        const filters = Object.keys(DATE_FILTERS) as DateFilter[];

        return filters.map((filter) => {
            return {
                key: DATE_FILTERS[filter].value,
                label: DATE_FILTERS[filter].text,//t(`dashboard.filter.date.${DATE_FILTERS[filter].text}`),
                onClick: () => {
                    setSelectedDateFilter(DATE_FILTERS[filter].value);
                },
            };
        });
    }, []);

    const dateFilterQuery = useMemo(() => {
        const now = dayjs();
        switch (selecetedDateFilter) {
            case "lastWeek":
                return {
                    start: now.subtract(6, "days").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                };
            case "lastMonth":
                return {
                    start: now.subtract(1, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "last3Month":
                return {
                    start: now.subtract(3, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "last6Month":
                return {
                    start: now.subtract(6, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            case "last9Month":
                return {
                    start: now.subtract(9, "month").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format(),
                };
            default:
                return {
                    start: now.subtract(7, "days").startOf("day").format('YYYY-MM-DD HH:mm:ss'),
                    end: now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                };
        }
    }, [selecetedDateFilter]);

    const now = dayjs();

    const { data: dailyOrdersAllData } = useCustom({

        // url: `${API_URL}/dashboard/ordercount`,
        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                // {
                //     field: "organization_id__in",
                //     operator: "eq",
                //     value: "400"
                // },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const allOrdersCount = useMemo(() => {
        const data = dailyOrdersAllData?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
                // state: "Daily Orders",
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrdersAllData]);

    const { data: dailyOrders400Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "400,401"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const orders400Count = useMemo(() => {
        const data = dailyOrders400Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrders400Data]);


    const { data: dailyOrders410Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "410,411,412,413"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const orders410Count = useMemo(() => {
        const data = dailyOrders410Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrders410Data]);

    const { data: dailyOrders420Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "420,421,422"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const orders420Count = useMemo(() => {
        const data = dailyOrders420Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrders420Data]);

    const { data: dailyOrders430Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "430,431"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const orders430Count = useMemo(() => {
        const data = dailyOrders430Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrders430Data]);

    const { data: dailyOrders440Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "440,441,442,443"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const orders440Count = useMemo(() => {
        const data = dailyOrders440Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrders440Data]);

    const { data: dailyOrders450Data } = useCustom({

        url: `${API_URL}/dashboard/ordercount_by_status`,
        method: "get",
        config: {
            filters: [
                {
                    field: "organization_id__in",
                    operator: "eq",
                    value: "450,451,452"
                },
                {
                    field: "order_create_date_gte",
                    operator: "eq",
                    value: dateFilterQuery.start,//now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: dateFilterQuery.end,//now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    const orders450Count = useMemo(() => {
        const data = dailyOrders450Data?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD.MM.YYYY"),
                completed: order.completed_orders,
                work: order.not_completed_orders,
                count_orders: order.count_orders,
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrders450Data]);

    return (
        <List

            headerButtons={() => (
                <Dropdown menu={{ items: dateFilters }}>
                    <Button>
                        {/* {t(
                            `dashboard.filter.date.${DATE_FILTERS[selecetedDateFilter].text}`,
                        )} */}
                        {DATE_FILTERS[selecetedDateFilter].text}
                        <DownOutlined />
                    </Button>
                </Dropdown>

            )}
        >
            <Row gutter={[16, 16]}>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 24 }} lg={24} md={24} sm={24} xs={24}>
                            <Card title={'Гронднеская область'}>
                                <StatusOrdersBarChart data={allOrdersCount.data} width={1500} height={270} />
                                {/* height={170} data={ordersCount.data} /> */}
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 12 }} lg={24} md={24} sm={24} xs={24}>
                            <Card title={'Грондно'}>
                                {/* <DailyOrders data={orders400Count.data} width={440} height={170} barSize={10} /> */}
                                <StatusOrdersBarChart data={orders400Count.data} width={440} height={170} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                            <Card title={'Волковыск'}>
                                <StatusOrdersBarChart data={orders410Count.data} width={440} height={170} />
                            </Card>
                        </Col>

                    </Row>
                </Col>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                            <Card title={'Лида'}>
                                <StatusOrdersBarChart data={orders420Count.data} width={440} height={170} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 12 }} lg={24} md={24} sm={24} xs={24}>
                            <Card title={'Новогрудок'}>
                                <StatusOrdersBarChart data={orders430Count.data} width={440} height={170} />
                            </Card>
                        </Col>

                    </Row>
                </Col>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                            <Card title={'Ошмяны'}>
                                <StatusOrdersBarChart data={orders440Count.data} width={440} height={170} />
                            </Card>
                        </Col>
                        <Col xl={{ span: 12 }} lg={12} md={24} sm={24} xs={24}>
                            <Card title={'Слоним'}>
                                <StatusOrdersBarChart data={orders450Count.data} width={440} height={170} />
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <Card>
                        <MapOrders />
                    </Card>
                </Col>
                <Col xl={9} lg={9} md={24} sm={24} xs={24}>
                    Timeline
                </Col>
                <Col xl={15} lg={15} md={24} sm={24} xs={24}>
                    Заказы
                </Col>
                <Col xl={9} lg={9} md={24} sm={24} xs={24}>
                    Меню
                </Col>
            </Row>
        </List >
    )
};

