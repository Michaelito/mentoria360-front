import { z } from "zod";

export const moduleFormSchema = z.object({
    title: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    subtitle: z
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
        .nonempty("Selecione um ícone"),

    color: z
        .string()
        .nonempty("Selecione uma cor"),

    order: z
        .number(),

    estimatedTime: z
        .number(),

    featured: z
        .boolean(),

    thumbnail: z
        .instanceof(File)
        .optional()
        .nullable(),

    status: z
        .number(),
});

export type ModuleFormData = z.infer<typeof moduleFormSchema>;