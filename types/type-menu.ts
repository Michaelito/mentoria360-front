// MENU ICON
export type IMenuIcon =
    | "LayoutDashboard"
    | "GraduationCap"
    | "Heart"
    | "Lock";

// MENU
export type IMenu = {
    id: number;
    icon?: IMenuIcon;
    label: string;
    url? : string;
    children?: IMenu[];
};

// MENU RESPONSE
export interface IMenuResponse {
    status: boolean;
    message: string;
    data: IMenu[];
};