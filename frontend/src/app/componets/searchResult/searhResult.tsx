import {OrderLine} from "../../../interface/orderLine";
import React from "react";
import "./styles.css"

interface SearchResultsProps {
    loading: boolean;
    error: string | null;
    orderLine: {
        OrderLine
    } | undefined;
}

const SearchResults: React.FC<SearchResultsProps> = ({loading, error, orderLine}) => {
    return (
        <div className="searchResult">
            {loading && <div>Поиск...</div>}

            {error && (
                <div>
                    <h3 className="text-lg font-bold">Ошибка поиска:</h3>
                    <div>Ошибка: {error}</div>
                </div>
            )}

            {orderLine ? (
                <div>
                    <h3 className="text-lg font-bold">Результаты поиска:</h3>
                    <ul>
                        <li key={orderLine.id}>
                            Заказ № {orderLine.order_number} - Ваша очередь: {orderLine.row_num}
                        </li>
                    </ul>
                </div>
            ) : (
                !loading && !error && <div>Результатов не найдено.</div>
            )}
        </div>
    )
}

export default SearchResults;