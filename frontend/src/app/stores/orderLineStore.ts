import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { OrderLine } from "../../interface/orderLine";
import {API_URL} from "../layout/App";

export default class OrderLineStore {
  orderNumber: string = '';  
  organizationId: number | null = null;  
  orderLine: OrderLine | undefined;
  searchLoading: boolean = false;  
  error: string | null = null;
  validationError: string | null = null;   
  isInvalid: boolean = false; 
  

  constructor() {
    makeAutoObservable(this);
  }

  setOrderNumber(number: string) {

    this.orderNumber = number;  
  }  

  setOrganizationId(id: number | null) {  
    this.organizationId = id;  
  }  

  clearSearchResult() {
    this.orderLine = undefined;
    this.searchLoading = false;
    this.error = null;
    this.isInvalid = false;
  }

  validateFields(): boolean {  
    
    if (this.organizationId === null || this.organizationId === 0) {  

        this.validationError = 'Данное поле обязательное для заполнения.';
        this.isInvalid = true;  
        return false;  
    }
    if (!this.orderNumber) {  
      this.validationError = 'Данное поле обязательное для заполнения';  
      this.isInvalid = true;
      return false;  
    }    
    this.validationError = null; // очищаем если прошло валидацию
    return true;  
}  

  async searchRecord() {
    if (!this.validateFields()){
      return; // перкращает если непрошло валидацию
    }
    this.searchLoading  = true;
    this.error = null;
    try {  
        const response = await axios.get<OrderLine>(`${API_URL}/line_orders/search?organization_id=${this.organizationId}&order_number=${this.orderNumber}`);
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
