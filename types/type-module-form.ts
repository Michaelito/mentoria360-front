import { z } from "zod";

export const moduleFormSchema = z.object({
    title: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    description: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    level: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    icon: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    active: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    color: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    status: z
        .string()
        .nonempty("Preenchimento obrigatório"),
});

export type ModuleFormData = z.infer<typeof moduleFormSchema>;