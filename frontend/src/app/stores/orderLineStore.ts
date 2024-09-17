import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { OrderLine } from "../../interface/orderLine";
import {API_URL} from "../layout/App";

export default class OrderLineStore {
  orderLine: OrderLine | undefined;
  searchLoading: boolean = false;  
  error: string | null = null; 
  

  constructor() {
    makeAutoObservable(this);
  }

  clearSearchResult() {
    this.orderLine = undefined;
    this.searchLoading = false;
    this.error = null;
  }

  async searchRecord( orderNumber: string, organizationId: number) {
    this.searchLoading  = true;
    this.error = null;
    try {  
        const response = await axios.get<OrderLine>(`${API_URL}/line_orders/search?organization_id=${organizationId}&order_number=${orderNumber}`);
        runInAction(() => {  
          this.orderLine = response.data;  
          this.searchLoading = false;  
        });  
      } catch (error) {  
        runInAction(() => {
          //console.log(searchError.response.data.detail)  
          // this.searchError = 'Failed to fetch orderLine';  
          //this.error = error.response.data.detail;
          this.error = 'Заказ не найден';
          this.searchLoading = false;  
        });  
      }  
  }
}
