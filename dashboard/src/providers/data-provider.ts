import type { DataProvider } from "@refinedev/core";

const API_URL =import.meta.env.VITE_API_URL

const fetcher = async (url: string, options?: RequestInit) => {  
  const token = localStorage.getItem("my_access_token");  

  const headers: HeadersInit = {  
    ...(options?.headers || {}),  
    ...(token ? { Authorization: token } : {}), // Only add Authorization if token exists  
  };  

  return fetch(url, {  
    ...options,  
    headers,  
  });  
};  

export const dataProvider: DataProvider = {
  getOne: async({ resource, id, meta }) => {

    const response = await fetch(`${API_URL}/${resource}/${id}`);
   
    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async({ resource, id, variables }) => {

    //const response = await fetch(`${API_URL}/${resource}/${id}`, {
    const response = await fetcher(`${API_URL}/${resource}/${id}`, {
        //method: "PATCH",
        method: "PUT",
        body: JSON.stringify(variables),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status < 200 || response.status > 299) throw response;
  
      const data = await response.json();
  
      return { data };
  },
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();

    if (pagination) {
      params.append("page", pagination.current!.toString());
      params.append("size", pagination.pageSize!.toString());
    }

    if (sorters && sorters.length > 0) {
        params.append("order_by", sorters.map((sorter) => {
          const _sort: string[] = [];
          const _order: string[] = [];
          _sort.push(sorter.field)
          if (sorter.order === "asc") {
            _order.push("+");
          }
          if (sorter.order === "desc") {
            _order.push("-");
          }
          return `${_order}${_sort}`;
        }).join());
        //params.append("",sorters.map((sorter) => sorter.field).join(","));
      }

    if (filters && filters.length > 0) {
      console.log(filters.values)
    filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          if (filter.value !== null && filter.value !== undefined && filter.value !== "" &&   
            !(Array.isArray(filter.value) && filter.value.length === 0) &&  
            !(typeof filter.value === 'object' && Object.keys(filter.value).length === 0)){
            // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
            params.append(filter.field, filter.value);
            }
        }
    });
  }

    //const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);
    const response = await fetcher(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    return {
      data: data.items,
      total: data.total, 
    };
  },
  create: async ({ resource, variables }) => {

    //const response = await fetch(`${API_URL}/${resource}`, {
    const response = await fetcher(`${API_URL}/${resource}`,{
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  deleteOne: () => {
    throw new Error("Not implemented");
  },
  getApiUrl: () => API_URL,
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
};