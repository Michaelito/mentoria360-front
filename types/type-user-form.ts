import { z } from "zod";

/**
 * TIPO BASE DO FORMULÁRIO.
 * USADO NO REACT-HOOK-FORM.
 */
export type UserFormData = {
    name     : string;
    login    : string;
    password?: string;
    role     : string;
    status?  : number;
};

// MENSAGEN DE ERRO PADRÃO
const requiredField = "Preenchimento obrigatório";

// USERS FORM - VALIDAÇÃO COM ZOD
const baseUserFormSchema = z.object({
    name: z
        .string({ error: requiredField })
        .nonempty(requiredField),

    login: z
        .string({ error: requiredField })
        .nonempty(requiredField),

    role: z
        .string({ error: "Selecione um perfil" })
        .nonempty("Selecione um perfil"),

    status: z
        .number()
        .int()
        .optional()
});

/**
 * SCHEMA DE CADASTRO:
 * SENHA OBRIGATÓRIA.
 */
export const createUserFormSchema = baseUserFormSchema.extend({
    password: z
        .string({ error: requiredField })
        .nonempty(requiredField)
        .min(8, "A senha deve ter no mínimo 8 caracteres")
});

/**
 * SCHEMA DE EDIÇÃO:
 * SENHA NÃO É UTILIZADA.
 */
export const updateUserFormSchema = baseUserFormSchema;

/**
 * SCHEMA DINÂMICO:
 * - CADASTRO: SENHA OBRIGATÓRIA
 * - EDIÇÃO: SENHA NÃO É EXIBIDA E NEM ENVIADA
 */
export function getUserFormSchema(isEdit: boolean) {
    return isEdit
        ? updateUserFormSchema
        : createUserFormSchema;
};

// TIPOS DE DADOS
export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserFormSchema>;