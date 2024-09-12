import { makeAutoObservable, runInAction } from "mobx";

import axios from "axios";
import { LineOrder } from "../../../interface/line_order";

class OrderLineStore {
  orderLine: LineOrder | undefined;
  searchLoading: boolean = false;  
  searchError: string | null = null; 
  

  constructor() {
    makeAutoObservable(this);
  }

  async searchRecord( orderNumber: string, organizationId: number) {
    this.searchLoading  = true;
    this.searchError = null;
    try {  
        const response = await axios.get<LineOrder>(`http://localhost:8001/line_orders/search?organization_id=${organizationId}&order_number=${orderNumber}`);  
        runInAction(() => {  
          this.orderLine = response.data;  
          this.searchLoading = false;  
        });  
      } catch (searchError) {  
        runInAction(() => {
          //console.log(searchError.response.data.detail)  
          // this.searchError = 'Failed to fetch orderLine';  
          this.searchError = searchError.response.data.detail;
          this.searchLoading = false;  
        });  
      }  
  }
}
export const orderLineStore = new OrderLineStore();  