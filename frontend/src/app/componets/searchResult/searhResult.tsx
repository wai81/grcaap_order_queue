import React from "react";
import {Alert, Spinner} from "react-bootstrap";



interface SearchResultsProps {
    loading: boolean;
    error: string | null;
    orderLine: {
        OrderLine
    } | undefined;
}

const SearchResults: React.FC<SearchResultsProps> = ({loading, error, orderLine}) => {
    return (
        <div >
            {
                loading && (
                        <div className={"text-center p-5 m-5 "} >
                        <Spinner animation="border" role="status" >
                            <span className="visually-hidden">Поиск...</span>
                        </Spinner>
                        </div>

                )
                // <div>Поиск...</div>
            }

            {error && (
                <Alert variant={"secondary"}>
                    <Alert.Heading>Ошибка поиска:</Alert.Heading>
                    <div className={"p-2 mb-5 mt-5"}>
                        <h2 className="text-center">{error}</h2>
                        <p className="text-center">Порверьте правильность данных для поиска</p>
                    </div>
                </Alert>
                // <div>
                //     <h3 className="text-lg font-bold">Ошибка поиска:</h3>
                //     <div>Ошибка: {error}</div>
                // </div>
            )}

            {orderLine ? (
                <Alert key={orderLine.id} variant={"secondary"}>
                    <Alert.Heading>Результаты поиска:</Alert.Heading>
                    <div className={"p-2 mb-5 mt-5"}>
                        <h2 className="text-center">Заказ № {orderLine.order_number}</h2>
                        <h2 className="text-center">в очереди: {orderLine.row_num}</h2>
                    </div>
                </Alert>
            ) : (
                !loading && !error && <div></div>
            )}
        </div>
    );
}

export default SearchResults;