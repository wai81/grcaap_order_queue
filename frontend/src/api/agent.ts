import axios, {AxiosResponse} from "axios";
// import {PaginatedResult} from "../interface/pagination";
import {Organization} from "../interface/organization";
import {OrderLine} from "../interface/orderLine";


// const sleep = (delay: number) => {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay)
//     })
// }

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;// 'http://localhost:5000/api/';



const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Organizations = {
    //list: (params: URLSearchParams) => axios.get<PaginatedResult<Organization[]>>('/organizations'),
    details: (id: number) => requests.get<Organization>(`/organizations/${id}`),
}

const OrderLines = {
    search: (order_number: string, organization_id: number) => requests.get<OrderLine>(`line_orders/search?organization_id=${organization_id}order_number=${order_number}`)
}

const agent = {
    Organizations,
    OrderLines,
}

export default agent