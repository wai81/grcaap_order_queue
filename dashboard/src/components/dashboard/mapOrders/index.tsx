import { useNavigation } from "@refinedev/core";
import { Map, MapMarker } from "../../map";

export const MapOrders: React.FC = () => {

    const defaultProps = {
        center: {
            lat: 40.73061,
            lng: -73.935242,
        },
        zoom: 10,
    };

    const { show } = useNavigation();

    return (
        <Map mapProps={defaultProps}>
            {/* {orderData?.data.map((order) => {
                return (
                    <MapMarker
                        key={order.id}
                        onClick={() => show("orders", order.id)}
                        icon={{
                            url: "/images/marker-courier.svg",
                        }}
                        position={{
                            lat: Number(order.adress.coordinate[0]),
                            lng: Number(order.adress.coordinate[1]),
                        }}
                    />
                );
            })}
            {orderData?.data.map((order) => {
                return (
                    <MapMarker
                        key={order.id}
                        onClick={() => show("orders", order.id)}
                        icon={{
                            url: "/images/marker-customer.svg",
                        }}
                        position={{
                            lat: Number(order.store.address.coordinate[0]),
                            lng: Number(order.store.address.coordinate[1]),
                        }}
                    />
                );
            })} */}
        </Map>
    );
};