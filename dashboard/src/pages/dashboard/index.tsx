import { useApiUrl, useCustom } from "@refinedev/core";
import { Card, Col, List, Row } from "antd";
import { useMemo } from "react";
import dayjs from "dayjs";
import { DailyOrders } from "../../components/dashboard/dailyorders";

export const DashboardPage: React.FC = () => {
    const API_URL = useApiUrl();

    // const [selecetedDateFilter, setSelectedDateFilter] = useState<DateFilter>(
    //     DATE_FILTERS.lastWeek.value,
    //   );

    // const dateFilterQuery = useMemo(() => {
    //     const now = dayjs();
    //     switch (selecetedDateFilter) {
    //       case "lastWeek":
    //         return {
    //           start: now.subtract(6, "days").startOf("day").format(),
    //           end: now.endOf("day").format(),
    //         };
    //       case "lastMonth":
    //         return {
    //           start: now.subtract(1, "month").startOf("day").format(),
    //           end: now.endOf("day").format(),
    //         };
    //       default:
    //         return {
    //           start: now.subtract(7, "days").startOf("day").format(),
    //           end: now.endOf("day").format(),
    //         };
    //     }
    //   }, [selecetedDateFilter]);
    const now = dayjs();
    const { data: dailyOrdersData } = useCustom({

        url: `${API_URL}/dashboard/ordercount`,
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
                    value: now.subtract(1, "months").startOf("day").format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: "order_create_date_lte",
                    operator: "eq",
                    value: now.endOf("day").format('YYYY-MM-DD HH:mm:ss'),
                },
            ],
        }
    });

    console.log(dailyOrdersData)
    const ordersCount = useMemo(() => {
        const data = dailyOrdersData?.data;
        if (!data) return [];

        const plotData = data.map((order) => {
            const date = dayjs(order.order_date);
            return {
                //timeUnix: date.unix(),
                //tor: order.organization_id,
                timeText: date.format("DD MM YYYY"),
                count_orders: order.count_orders,
                state: "Daily Orders",
            };
        });

        return {
            data: plotData,
            //trend: dailyOrdersData?.data?.trend || 0,
        };
    }, [dailyOrdersData]);



    return (
        <List>
            <Row gutter={[16, 16]}>
                <Col md={24}>
                    <Row gutter={[16, 16]}>
                        <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
                            <Card title={'Гродно'}>
                                <DailyOrders data={ordersCount.data} />
                                {/* height={170} data={ordersCount.data} /> */}
                            </Card>
                        </Col>
                        <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
                            <Card>
                                График 2
                            </Card>
                        </Col>
                        <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
                            <Card>
                                График 3
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xl={15} lg={15} md={24} sm={24} xs={24}>
                    Map
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

