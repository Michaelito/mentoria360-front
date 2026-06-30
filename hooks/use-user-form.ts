"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveUser } from "@/actions/actions-user";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { handleApiError } from "@/utils/api-error-handle";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";
import { Modal } from "@/components/common/Alert";
import { userFormSchema, UserFormData } from "@/types/type-user-form";
import type { IUser } from "@/types/type-user";

// PROPS
type UserFormProps = {
    userId?: number;
};

// FORMULÁRIO
export function useUserForm({ userId }: UserFormProps) {
    const router = useRouter(); // HOOK-ROUTER
    const queryClient = useQueryClient(); // HOOK-QUERY

    // CONTROLA MODO DE EDIÇÃO
    const isEdit = !!userId;

    // HOOK-FORM
    const form = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema),
        mode: "onChange",
        defaultValues: {
            name    : "",
            lastname: "",
            document: "",
            profile : "",
            status  : 1
        }
    });

    // MUTATION
    const mutation = useMutation<IUser, Error, UserFormData>({
        mutationFn: async (data) => {
            // console.log("[useUserForm] Dados recebidos do formulário:", data);
            // console.log("[useUserForm] userId:", userId);

            // FAZ A REQUISIÇÃO
            const result = isEdit
                ? await saveUser(data, userId)
                : await saveUser(data);
            // console.log("[useUserForm] Resultado bruto da server action:", result);

            // RESOLVE ERRO TÉCNICO
            return resolveApiResponse(result);
        },

        // ON SUCCESS
        onSuccess: async () => {
            // ATUALIZA A LISTA DE USUÁRIOS
            await queryClient.invalidateQueries({
                queryKey: ["user"]
            });

            // ATUALIZA OS DETALHES DO USUÁRIO
            if (userId) {
                await queryClient.invalidateQueries({
                    queryKey: ["user-view", userId]
                });
            }

            // MODAL DE SUCESSO
            Modal({
                icon: "success",
                title: "Salvo com sucesso",
                text: "Usuário salvo com sucesso.",
                callback: (result) => {
                    if (result.isConfirmed) {
                        // REDIRECIONA PÁGINA
                        router.push("/admin/users");
                    }
                }
            });
        },

        // ON ERROR
        onError: (error) => {
            // console.error("[useUserForm] Erro ao salvar usuário:", error);
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
        // console.log("[useUserForm] Submit disparado com:", data);
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