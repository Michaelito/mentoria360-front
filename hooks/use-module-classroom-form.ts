"use client"

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveModuleClassroom } from "@/actions/actions-module-classroom";
import { resolveApiResponse } from "@/utils/api-result-resolve";
import { handleApiError } from "@/utils/api-error-handle";
import { ApiBusinessError, ApiTechnicalError } from "@/utils/api-error";
import { Modal } from "@/components/common/Alert";
import { moduleClassroomFormSchema, ModuleClassroomFormData } from "@/types/type-module-classroom-form";
import type { IModuleClassroom } from "@/types/type-module-classroom";

// PROPS
type ModuleClassroomFormProps = {
    moduleId?: number;
    classroomId?: number;
};

// FORMULÁRIO
export function useModuleClassroomForm({ moduleId, classroomId }: ModuleClassroomFormProps) {
    const router = useRouter(); // HOOK-ROUTER
    const queryClient = useQueryClient(); // HOOK-QUERY

    // CONTROLA MODO DE EDIÇÃO
    const isEdit = !!classroomId;

    // HOOK-FORM
    const form = useForm<ModuleClassroomFormData>({
        resolver: zodResolver(moduleClassroomFormSchema),
        mode: "onChange",
        defaultValues: {
            title       : "",
            description : "",
            thumbnail   : "",
            videoUrl    : "",
            duration    : "",
            order       : 1,
            completed   : false,
            active      : true
        }
    });

    // MUTATION
    const mutation = useMutation<IModuleClassroom, Error, ModuleClassroomFormData>({
        mutationFn: async (data) => {
            // console.log("[useModuleClassroomForm] Dados recebidos do formulário:", data);
            // console.log("[useModuleClassroomForm] moduleId:", moduleId, "classroomId:", classroomId);

            // FAZ A REQUISIÇÃO
            const result = isEdit
                ? await saveModuleClassroom(data, classroomId)
                : await saveModuleClassroom(data);
            // console.log("[useModuleClassroomForm] Resultado bruto da server action:", result);

            // RESOLVE ERRO TÉCNICO
            return resolveApiResponse(result);
        },

        // ON SUCCESS
        onSuccess: async () => {
            // ATUALIZA A LISTA CLASSROOM
            await queryClient.invalidateQueries({
                queryKey: ["module-classroom-playlist", moduleId]
            });

            // ATUALIZA OS DETALHES DA CLASSROOM
            if (classroomId) {
                await queryClient.invalidateQueries({
                    queryKey: ["module-classroom-view", classroomId]
                });
            }

            // MODAL DE SUCESSO
            Modal({
                icon: "success",
                title: "Salvo com sucesso",
                text: "Aula salva com sucesso.",
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
        // console.log("[useModuleClassroomForm] Submit disparado com:", data);
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