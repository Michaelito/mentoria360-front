"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassword } from "@/actions/actions-password";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { handleApiError } from "@/utils/api-error-handle";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";
import { Modal } from "@/components/common/Alert";
import { changePasswordFormSchema, ChangePasswordFormData } from "@/types/type-password";

export function useChangePasswordForm() {
    const router = useRouter(); // HOOK PARA REDIRECIONAMENTO

    // HOOK-FORM
    const form = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordFormSchema),
        mode: "onSubmit",
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        }
    });

    // MUTATION
    const mutation = useMutation<{ message: string }, Error, ChangePasswordFormData>({
        mutationFn: async (data) => {
            // console.log("[useChangePasswordForm] Dados recebidos do formulário:", data);

            // FAZ A REQUISIÇÃO
            const result = await changePassword(data);
            // console.log("[useChangePasswordForm] Resultado bruto da server action:", result);

            // RESOLVE ERRO TÉCNICO
            return resolveApiResponse(result);
        },

        // ON SUCCESS
        onSuccess: () => {
            Modal({
                icon: "success",
                title: "Senha alterada com sucesso",
                text: "Sua senha foi atualizada e já pode ser usada na próxima vez que você entrar na plataforma.",
                callback: (result) => {
                    if (result.isConfirmed) {
                        router.push("/dashboard"); // REDIRECIONA PÁGINA
                    }
                }
            });
        },

        // ON ERROR
        onError: (error) => {
            // console.error("[useChangePasswordForm] Erro ao salvar cliente:", error);
            if (error instanceof ApiTechnicalError) {
                handleApiError(error.status);
                return;
            }

            // RESOLVE ERRO DE NEGÓCIO
            if (error instanceof ApiBusinessError) {
                Modal({
                    icon: "warning",
                    title: "Não foi possível salvar",
                    text: error.message
                });
                return;
            }
            Modal({
                icon: "warning",
                title: "Não foi possível salvar",
                text: "Verifique os dados informados."
            });
        }
    });

    // SUBMIT
    const onSubmit = form.handleSubmit((data) => {
        // console.log("[useChangePasswordForm] Submit disparado com:", data);
        mutation.mutate(data);
    });

    return {
        onSubmit,
        form,
        isSubmitting: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError
    };
};