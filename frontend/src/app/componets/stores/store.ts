import OrderLineStore from "./orderLineStore";
import OrganizationStore from "./organizationStore";
import {createContext, useContext} from "react";

interface Store {
    orderLineStore: OrderLineStore;
    organizationStore: OrganizationStore;
}

export const store:Store={
    orderLineStore: new OrderLineStore(),
    organizationStore: new OrganizationStore()
}

export const StoreContext = createContext(store);

export function  useStore() {
    return useContext(StoreContext);
}