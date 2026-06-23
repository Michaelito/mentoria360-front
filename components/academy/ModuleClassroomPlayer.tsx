"use client"

import { Clock3, PlayCircle } from "lucide-react";
import { useModuleClassroomView } from "@/hooks/use-module-classroom-view";
import { Loader, ErrorMessage } from "@/components/common/Loaders";

// PROPS
type ModuleClassroomPlayerProps = {
    classroomId: number | null;
};

export function ModuleClassroomPlayer({ classroomId }: ModuleClassroomPlayerProps) {

    // REACT-QUERY
    const {
        data,
        error,
        isError,
        isLoading,
        isFetching
    } = useModuleClassroomView({
        classroomId: classroomId
    });

    // EXTRAÇÃO DE DADOS
    const classroom = data?.data;

    if (isError) {
        return (
            <ErrorMessage
                message={error instanceof Error
                    ? error.message
                    : "Nao foi possivel carregar o video."
                }
            />
        );
    }

    if (!classroom) {
        return (
            <div className="rounded-2xl bg-white p-6 dark:bg-[#0A0A0B]">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Vídeo não encontrado.
                </p>
            </div>
        );
    }

    if (isLoading || isFetching) {
        return <Loader />;
    }

    return (
        <>
            <div className="
                overflow-hidden rounded-2xl bg-black shadow-sm
                ring-1 ring-black/5 dark:ring-white/10
            ">
                <iframe
                    src={classroom.videoUrl}
                    title={classroom.title}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* INFORMAÇÕES DO VÍDEO */}
            <div className="rounded-2xl bg-white dark:bg-[#0A0A0B] p-4">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="
                        inline-flex items-center gap-1 rounded-full
                        bg-indigo-50 px-3 py-1 text-xs font-semibold
                        text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300
                    ">
                        <PlayCircle size={14} />
                        Aula {classroom.order}
                    </span>
                    <span className="
                        inline-flex items-center gap-1 text-xs font-medium
                        text-gray-500 dark:text-gray-400
                    ">
                        <Clock3 size={14} />
                        {classroom.duration}
                    </span>
                </div>
                <h2 className="
                    text-xl font-bold tracking-tight
                    text-gray-900 dark:text-white
                ">
                    {classroom.title}
                </h2>
                <p className="
                    mt-2 text-sm leading-6
                    text-gray-600 dark:text-gray-400
                ">
                    {classroom.description}
                </p>
            </div>
        </>
    );
};