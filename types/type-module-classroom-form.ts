import { z } from "zod";

export const moduleClassroomFormSchema = z.object({
    title: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    description: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    thumbnail: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    videoUrl: z
        .string()
        .url("URL inválida"),

    duration: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    order: z.number(),

    completed: z.boolean(),

    active: z.boolean()
});

export type ModuleClassroomFormData = z.infer<typeof moduleClassroomFormSchema>;