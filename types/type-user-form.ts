import { z } from "zod";

export const userFormSchema = z.object({
    name: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    lastname: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    document: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    profile: z
        .string({ error: "Selecione um perfil" })
        .nonempty("Selecione um perfil"),

    status: z
        .number()
});

export type UserFormData = z.infer<typeof userFormSchema>;