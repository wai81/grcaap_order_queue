import type { DataProvider } from "@refinedev/core";

export const API_URL = 'http://10.2.5.219:8000'//import.meta.env.API_URL

export const dataProvider: DataProvider = {
  getOne: async({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);
   
    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: async({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: "PATCH",
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
      params.append("page", pagination.current?.toString() ?? "1");
      params.append("size", pagination.pageSize?.toString() ?? "10");
    }

    if (sorters && sorters.length > 0) {
        params.append("_sort", sorters.map((sorter) => sorter.field).join(","));
        params.append("_order", sorters.map((sorter) => sorter.order).join(","));
      }

    if (filters && filters.length > 0) {
    filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
        // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
        params.append(filter.field, filter.value);
        }
    });
    }
    const response = await fetch(`${API_URL}/${resource}?${params.toString()}`);

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    console.log(data);
    return {
      data: data.items,
      total: data.total, // We'll cover this in the next steps.
    };
  },
  create: () => {
    throw new Error("Not implemented");
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