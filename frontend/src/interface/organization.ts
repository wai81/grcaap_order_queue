export interface Organization {
    id: number
    title: string
    fullname: string
    is_active: boolean
    created_at: string
}

export interface OrganizationList {
    items: Organization[]
    total: number;
    page: number;
    size: number;
    pages: number;
}