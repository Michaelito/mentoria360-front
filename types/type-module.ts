// MODULE ICON
export type IModuleIcon =
    | "BrainCircuit"
    | "Sparkles"
    | "Bot"
    | "Code2";

// MODULE
export type IModule = {
    id: number;
    level: string;
    title: string;
    description: string;
    status: string;
    progress: number;
    icon: IModuleIcon;
    active: boolean;
    color: string;
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