"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveModule } from "@/actions/actions-module";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { handleApiError } from "@/utils/api-error-handle";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";
import { Modal } from "@/components/common/Alert";
import { moduleFormSchema, ModuleFormData } from "@/types/type-module-form";
import type { IModule } from "@/types/type-module";

// PROPS
type ModuleFormProps = {
    moduleId?: number;
};

// FORMULÁRIO
export function useModuleForm({ moduleId }: ModuleFormProps) {
    const router = useRouter(); // HOOK-ROUTER
    const queryClient = useQueryClient(); // HOOK-QUERY

    // CONTROLA MODO DE EDIÇÃO
    const isEdit = !!moduleId;

    // HOOK-FORM
    const form = useForm<ModuleFormData>({
        resolver: zodResolver(moduleFormSchema),
        mode: "onChange",
        defaultValues: {
            title      : "",
            description: "",
            level      : "",
            icon       : "",
            active     : "",
            status     : ""
        }
    });

    // MUTATION
    const mutation = useMutation<IModule, Error, ModuleFormData>({
        mutationFn: async (data) => {
            // console.log("[useModuleForm] Dados recebidos do formulário:", data);
            // console.log("[useModuleForm] moduleId:", moduleId);

            // FAZ A REQUISIÇÃO
            const result = isEdit
                ? await saveModule(data, moduleId)
                : await saveModule(data);
            // console.log("[useModuleForm] Resultado bruto da server action:", result);

            // RESOLVE ERRO TÉCNICO
            return resolveApiResponse(result);
        },

        // ON SUCCESS
        onSuccess: async () => {
            // ATUALIZA A LISTA DE MÓDULOS
            await queryClient.invalidateQueries({
                queryKey: ["module"]
            });

            // ATUALIZA OS DETALHES DO MÓDULO
            if (moduleId) {
                await queryClient.invalidateQueries({
                    queryKey: ["module-view", moduleId]
                });
            }

            // MODAL DE SUCESSO
            Modal({
                icon: "success",
                title: "Salvo com sucesso",
                text: "Cliente salvo com sucesso.",
                callback: (result) => {
                    if (result.isConfirmed) {
                        // REDIRECIONA PÁGINA
                        router.push("/admin/modules");
                    }
                }
            });
        },

        // ON ERROR
        onError: (error) => {
            // console.error("[useModuleForm] Erro ao salvar cliente:", error);
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
        // console.log("[useModuleForm] Submit disparado com:", data);
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