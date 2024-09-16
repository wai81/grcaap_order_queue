import {OrderLine} from "../../../interface/orderLine";
import React from "react";
import {Alert, Card, Spinner} from "react-bootstrap";

//import "./styles.css"

interface SearchResultsProps {
    loading: boolean;
    error: string | null;
    orderLine: {
        OrderLine
    } | undefined;
}

const SearchResults: React.FC<SearchResultsProps> = ({loading, error, orderLine}) => {
    return (
        <div>
            {loading &&
                <Spinner className={"m-5"} animation="border" role="status">
                    <span className="visually-hidden m-5">Поиск...</span>
                </Spinner>
                // <div>Поиск...</div>
            }

            {error && (
                <div>
                    <h3 className="text-lg font-bold">Ошибка поиска:</h3>
                    <div>Ошибка: {error}</div>
                </div>
            )}

            {orderLine ? (
                <Alert key={orderLine.id} variant={"success"}>
                    <Alert.Heading>
                        Результаты поиска:
                    </Alert.Heading>
                    <div className={"p-3 mb-5 mt-5"}>
                        Заказ № {orderLine.order_number} - Ваша очередь: {orderLine.row_num}
                    </div>

                </Alert>
            ) : (
                !loading && !error && <div></div>
            )}
        </div>
    )
}

export default SearchResults;