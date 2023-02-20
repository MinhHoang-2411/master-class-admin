export interface ICategory {
    _id: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string
}

export interface ResponseCategory<T> {
    data: [
        category: T
    ],
    status?: string
    statusText?: string
    message?: string
}