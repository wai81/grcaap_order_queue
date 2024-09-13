export interface Pagination {
    // currentPage: number;
    // itemsPerPage: number;
    // totalItems: number;
    // totalPages: number;
    total: number;
    page: number;
    size: number;
    pages: number;
}

export class PaginatedResult<T>{
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination){
        this.data = data;
        this.pagination = pagination;
    }
}

export class PagingParams {
    page;
    size;

    constructor(page = 1, size = 2){
        this.page = page;
        this.size =  size;
    }
}