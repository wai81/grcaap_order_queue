import { makeAutoObservable, runInAction } from "mobx";
import { Organization } from "../../../interface/organization";
import axios from "axios";

export default class OrganizationStore {
  organizations: Organization[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchOrganizations() {
    this.loading = true;
    this.error = null;
    try {  
        const response = await axios.get<Organization[]>('http://localhost:8001/organizations');  
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
}
