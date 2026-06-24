// USER
export interface IUser {
    id: number;
    uuid: string;
    name: string;
    lastname: string;
    email: string;
    document: string;
    profile: number;
    createdAt: string;
    dt_last_login: string;
    count_login: number;
    status: number;
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