// API SUCCESS
export interface ApiSuccess<T> {
    type: "success";
    data: T;
};

// API ERROR
export interface ApiError {
    type: "error";
    status: number;
    message?: string;
};

// API RESPONSE
export type ApiResponse<T> = ApiSuccess<T> | ApiError;