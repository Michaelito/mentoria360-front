"use client"

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCode } from "@/actions/actions-password";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { handleApiError } from "@/utils/api-error-handle";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";
import { Modal } from "@/components/common/Alert";
import { verifyCodeFormSchema, VerifyCodeFormData } from "@/types/type-password";

// PROPS
type LoginVerifyCodeFormProps = {
    email: string;
    onSuccess: () => void;
    onCloseModal: () => void;
};

// FORMULÁRIO
export function useLoginVerifyCodeForm({ email, onSuccess, onCloseModal }: LoginVerifyCodeFormProps) {
    // HOOK-FORM
    const form = useForm<VerifyCodeFormData>({
        resolver: zodResolver(verifyCodeFormSchema),
        mode: "onChange",
        defaultValues: {
            code: "",
            password_new: "",
            confirm_password: ""
        }
    });

    // MUTATION
    const mutation = useMutation<unknown, Error, VerifyCodeFormData>({
        mutationFn: async (data) => {
            // console.log("[useLoginVerifyCodeForm] Dados recebidos do formulário:", data);

            // PAYLOAD
            const payload = {
                email: email,
                code : data.code,
                password_new: data.password_new
            };

            // FAZ A REQUISIÇÃO
            const result = await verifyCode(payload);
            // console.log("[useLoginVerifyCodeForm] Resultado bruto da server action:", result);

            // RESOLVE ERRO TÉCNICO
            return resolveApiResponse(result);
        },

        // ON SUCCESS
        onSuccess: () => {
            form.reset(); // LIMPA O FORMULÁRIO
            onCloseModal(); // FECHA O MODAL

            // MODAL DE SUCESSO
            Modal({
                icon: "success",
                title: "Senha alterada",
                text: "Sua nova senha foi definida com sucesso.",
                callback: (result) => {
                    if (result.isConfirmed) {
                        form.reset(); // LIMPA O FORMULÁRIO
                        onSuccess();  // REDIRECIONA PÁGINA
                    }
                }
            });
        },

        // ON ERROR
        onError: (error) => {
            onCloseModal(); // FECHA O MODAL

            // console.error("[useLoginVerifyCodeForm] Erro ao enviar o e-mail:", error);
            if (error instanceof ApiTechnicalError) {
                handleApiError(error.status);
                return;
            }

            // RESOLVE ERRO DE NEGÓCIO
            if (error instanceof ApiBusinessError) {
                Modal({
                    icon: "warning",
                    title: "Não foi possível validar o código",
                    text: error.message
                });
                return;
            }
            Modal({
                icon: "warning",
                title: "Não foi possível validar o código",
                text: "Código inválido ou expirado."
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