import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    // ADICIONA A PROPRIEDADE `ACCESSTOKEN` NO OBJETO `SESSION`
    interface Session extends DefaultSession {
        accessToken?: string;
        dtExpired?  : string;
        user: {
            id      : string;
            name    : string;
            email   : string;
            profile : number;
            company?: number;
        };
    };

    // ADICIONA A PROPRIEDADE `ACCESSTOKEN` NO OBJETO `USER`
    interface User extends DefaultUser {
        id?         : string;
        name?       : string;
        email?      : string;
        profile?    : number;
        company?    : number;
        accessToken?: string;
        dtExpired?  : string;
    };
};

declare module "next-auth/jwt" {
    // ADICIONA A PROPRIEDADE `ACCESSTOKEN` NO OBJETO `JWT`
    interface JWT {
        id?         : string;
        name?       : string;
        email?      : string;
        profile?    : number;
        company?    : number;
        accessToken?: string;
        dtExpired?  : string;
    };
};