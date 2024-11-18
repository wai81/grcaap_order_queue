import {
    BellOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";

type OrderStatusProps = {
    status: boolean
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    const t = useTranslate();
    let color;
    let icon;
    let textStatus;

    switch (status) {
        case true:
            color = "green";
            icon = <CheckCircleOutlined />;
            break;
        case false:
            color = "blue";
            icon = <BellOutlined />;
            break;
    }

    if (status === true) {
        textStatus = "Выполнен"
    } else {
        textStatus = "В работе"
    }

    return (
        <Tag color={color} icon={icon}>
            {/* {t(`enum.orderStatuses.${status}`)}  */}
            {textStatus}
        </Tag>
    );
};