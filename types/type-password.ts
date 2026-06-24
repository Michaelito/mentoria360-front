import { z } from "zod";

/*---- =======================
CHANGE-PASSWORD START ------*/
export const changePasswordFormSchema = z.object({
    currentPassword: z
        .string()
        .nonempty("Preenchimento obrigatório")
        .min(8, "A senha deve ter no mínimo 8 caracteres"),

    newPassword: z
        .string()
        .nonempty("Preenchimento obrigatório")
        .min(8, "A senha deve ter no mínimo 8 caracteres")
});

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
/*---- =======================
CHANGE-PASSWORD END --------*/

/*---- =======================
FORGOT-PASSWORD START ------*/
export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .nonempty("Preenchimento obrigatório")
        .email("E-mail inválido")
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;
/*---- =======================
FORGOT-PASSWORD END --------*/

/*---- =======================
VERIFY-CODE START ----------*/
export type IVerifyCodeForgotPasswordPayload = {
    email: string;
    code: string;
    password_new: string;
};

// VERIFY CODE FORM - VALIDAÇÃO COM ZOD
export const verifyCodeFormSchema = z.object({
    code: z
        .string()
        .nonempty("Preenchimento obrigatório"),

    password_new: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),

    confirm_password: z
        .string()
        .min(8, "A confirmação deve ter no mínimo 8 caracteres")
}).refine((data) => data.password_new === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"]
});

export type VerifyCodeFormData = z.infer<typeof verifyCodeFormSchema>;
/*---- =======================
VERIFY-CODE END ------------*/