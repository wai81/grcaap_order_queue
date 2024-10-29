import type { DataProvider } from "@refinedev/core";

const API_URL = 'http://10.2.5.219:8000'//import.meta.env.VITE_APP_API_URL

export const dataProvider: DataProvider = {
  getOne: async({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`);
   
    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },
  update: () => {
    throw new Error("Not implemented");
  },
  getList: () => {
    throw new Error("Not implemented");
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