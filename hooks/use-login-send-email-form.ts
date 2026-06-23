"use client"

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail } from "@/actions/actions-password";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { handleApiError } from "@/utils/api-error-handle";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";
import { Modal } from "@/components/common/Alert";
import { forgotPasswordFormSchema, ForgotPasswordFormData } from "@/types/type-password";

// PROPS
type LoginSendEmailFormProps = {
    onSuccess: (login: string) => void;
    onCloseModal: () => void;
};

// FORMULÁRIO
export function useLoginSendEmailForm({ onSuccess, onCloseModal }: LoginSendEmailFormProps) {
    // HOOK-FORM
    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            login: ""
        }
    });

    // MUTATION
    const mutation = useMutation<unknown, Error, ForgotPasswordFormData>({
        mutationFn: async (data) => {
            // console.log("[useLoginSendEmailForm] Dados recebidos do formulário:", data);

            // FAZ A REQUISIÇÃO
            const result = await sendEmail(data);
            // console.log("[useLoginSendEmailForm] Resultado bruto da server action:", result);

            // RESOLVE ERRO TÉCNICO
            return resolveApiResponse(result);
        },

        // ON SUCCESS
        onSuccess: (_, variables) => {
            onCloseModal(); // FECHA O MODAL

            // MODAL DE SUCESSO
            Modal({
                icon: "success",
                title: "Código enviado",
                text: "Verifique seu e-mail para continuar.",
                callback: (result) => {
                    if (result.isConfirmed) {
                        onSuccess(variables.login); // REDIRECIONA PÁGINA
                    }
                }
            });
        },

        // ON ERROR
        onError: (error) => {
            onCloseModal(); // FECHA O MODAL

            // console.error("[useLoginSendEmailForm] Erro ao enviar o e-mail:", error);
            if (error instanceof ApiTechnicalError) {
                handleApiError(error.status);
                return;
            }

            // RESOLVE ERRO DE NEGÓCIO
            if (error instanceof ApiBusinessError) {
                Modal({
                    icon: "warning",
                    title: "Não foi possível enviar o código",
                    text: error.message
                });
                return;
            }
            Modal({
                icon: "warning",
                title: "Não foi possível enviar o código",
                text: "Verifique os dados informados."
            });
        }
    });

    // SUBMIT
    const onSubmit = form.handleSubmit((data) => {
        // console.log("[useLoginSendEmailForm] Submit disparado com:", data);
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