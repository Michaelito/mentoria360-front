// MODULE ICON
export type IModuleIcon =
    | "BrainCircuit"
    | "Sparkles"
    | "Bot"
    | "Code2";

// MODULE
export type IModule = {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    thumbnail: string;
    thumbnailUrl: string;
    icon: IModuleIcon;
    color: string;
    level: string;
    order: number;
    progress: number;
    estimatedTime: number;
    totalLessons: number;
    status: number;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
};

// MODULE PAGINATION
export interface IModulePagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
};

// MODULE RESPONSE (LISTAR)
export interface IModuleResponse {
    status: boolean;
    message: string;
    data: IModule[];
    pagination: IModulePagination;
};

// MODULE RESPONSE (ITEM ÚNICO)
export interface IModuleViewResponse {
    status: boolean;
    message: string;
    data: IModule;
};