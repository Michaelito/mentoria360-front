import { z } from "zod";

// AUTH RESPONSE
export type AuthResponse = {
    status : boolean;
    message: string;
    token  : string;
    user: {
        id   : number;
        name : string;
        login: string;
        role : string;
    };
};

// AUTH JWT DECODED
export type AuthResponseJwtDecoded = {
    id   : number;
    role : string;
    login: string;
    name : string;
    iat  : number;
    exp  : number;
};

// AUTH FORM - VALIDAÇÃO COM ZOD
export const authFormSchema = z.object({
    login   : z.string().nonempty("Preenchimento obrigatório").email("Formato de e-mail inválido"),
    password: z.string().nonempty("Preenchimento obrigatório")
});
export type AuthFormData = z.infer<typeof authFormSchema>;