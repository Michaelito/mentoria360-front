import { z } from "zod";

// AUTH RESPONSE
export type AuthResponse = {
    status: boolean;
    message: string;
    user: {
        access_token: string;
        dt_expired: string;
    }
};

// AUTH JWT DECODED
export type AuthResponseJwtDecoded = {
    id: number;
    uuid: string;
    email: string;
    name: string;
    profile: number;
    iat: number;
    exp: number;
};

// AUTH FORM - VALIDAÇÃO COM ZOD
export const authFormSchema = z.object({
    email   : z.string().nonempty("Preenchimento obrigatório").email("Formato de e-mail inválido"),
    password: z.string().nonempty("Preenchimento obrigatório")
});
export type AuthFormData = z.infer<typeof authFormSchema>;