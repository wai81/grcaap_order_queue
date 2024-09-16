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
        {
          loading && (
            <Spinner className={"m-5"} animation="border" role="status">
              <span className="visually-hidden m-5">Поиск...</span>
            </Spinner>
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