import { makeAutoObservable, runInAction } from "mobx";
import {Organization, OrganizationList} from "../../interface/organization";
import axios from "axios";
//import agent from "../../api/agent";
import {PagingParams} from "../../interface/pagination";
import {API_URL} from "../layout/App";

export default class OrganizationStore {
  organizations: Organization[] = [];
  loading: boolean = false;
  error: string | null = null;
  pagingParams = new PagingParams();
  predicate =  new Map().set('all', true);

  constructor() {
    makeAutoObservable(this);
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append('page', this.pagingParams.page.toString());
    params.append('size', this.pagingParams.size.toString());
    this.predicate.forEach((value, key) => {
      if (key === 'created_at') {
        params.append(key, (value as Date).toISOString())
      }
      else if (key === 'order_create_date'){
        params.append(key, (value as Date).toISOString())
      }
      else {
        params.append(key, value);
      }
    })
    return params;
  }

  async fetchOrganizations() {
    this.loading = true;
    this.error = null;
    try {  
        const response = await axios.get<OrganizationList>(`${API_URL}/organizations`);
        runInAction(() => {  
          this.organizations = response.data.items;  
          this.loading = false;  
        });  
      } catch (error) {  
        runInAction(() => {  
          this.error = 'Failed to fetch organizations';  
          this.loading = false;  
        });  
      }  
  }

  // getOrganizations = async () =>{
  //   this.loading = true
  //   try {
  //     const response = await agent.Organizations.list(this.axiosParams);
  //     runInAction(() => {
  //       console.log(response)
  //       this.organizations = response.data;
  //       this.loading = false;
  //     });
  //
  //   }catch (error) {
  //
  //   }
  //}
}
