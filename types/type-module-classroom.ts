// CLASSROOM
export type IModuleClassroom = {
    id: number;
    moduleId: number;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    duration: string;
    order: number;
    completed: boolean;
    active: boolean;
};

// CLASSROOM PAGINATION
export interface IModuleClassroomPagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
};

// CLASSROOM RESPONSE
export interface IModuleClassroomResponse {
    status: boolean;
    message: string;
    data: IModuleClassroom[];
    pagination: IModuleClassroomPagination;
};

// CLASSROOM VIEW RESPONSE
export interface IModuleClassroomViewResponse {
    status: boolean;
    message: string;
    data: IModuleClassroom;
};