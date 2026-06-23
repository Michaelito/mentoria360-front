// USER
export interface IUser {
    id: number;
    uuid: string;
    name: string;
    login: string;
    role: string;
    status?: number;
    createdAt: string;
    dt_last_login: string;
    count_login: number;
};

// USER PAGINATION
export interface IUserPagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
};

// USER RESPONSE (LISTAR)
export interface IUserResponse {
    status: boolean;
    total: number;
    data: IUser[];
    pagination: IUserPagination;
};

// USER RESPONSE (VISUALIZAR)
export interface IUserViewResponse {
    status: boolean;
    data: IUser;
};