"use client"

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, Play } from "lucide-react";
import { useModuleClassroom } from "@/hooks/use-module-classroom";
import { Loader, EmptyState, ErrorMessage } from "@/components/common/Loaders";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ModuleClassroomPlayer } from "@/components/academy/ModuleClassroomPlayer";

// PROPS
type ModuleClassroomProps = {
    moduleId: number;
};

export function ModuleClassroom({ moduleId }: ModuleClassroomProps) {
    const [page, setPage] = useState(1); // GERENCIA O ESTADO DE PAGINAÇÃO
    const [perPage, setPerPage] = useState(10); // GERENCIA ITENS POR PÁGINA
    const [classroomId, setClassroomId] = useState<number | null>(null); // GERENCIA A AULA SELECIONADA

    // REACT-QUERY
    const {
        data,
        error,
        isError,
        isLoading,
        isFetching
    } = useModuleClassroom({
        moduleId: moduleId,
        page,
        perPage,
        filters: {
            descricao: ""
        }
    });

    // EXTRAÇÃO DE DADOS
    const classrooms = data?.data ?? [];

    // DEFINE A PRIMEIRA AULA COMO SELECIONADA
    useEffect(() => {
        if (!classroomId && classrooms.length > 0) {
            setClassroomId(classrooms[0].id);
        }
    }, [classroomId, classrooms]);

    return (
        <>
            {/* CABEÇALHO */}
            <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Home", href: "/academy/home" },
                            { label: "Trilha de Aprendizado", href: "/academy/modules" },
                            { label: "Aulas" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        Aulas
                    </h1>
                </div>
            </header>

            {/* PLAYLIST */}
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="xl:col-span-8 space-y-5">
                    <ModuleClassroomPlayer
                        classroomId={classroomId}
                    />
                </div>

                {/* LISTA DE AULAS */}
                <div className="xl:col-span-4">
                    <div className="rounded-2xl bg-white dark:bg-[#0A0A0B] p-4">
                        {/* 
                            RENDERIZAÇÃO CONDICIONAL DA ÁREA PRINCIPAL:
                            1. ERRO
                            2. CARREGAMENTO
                            3. LISTA COM RESULTADOS
                            4. MENSAGEM DE LISTA VAZIA
                        */}
                        {isError ? (
                            <ErrorMessage
                                message={error instanceof Error
                                    ? error.message
                                    : "Nao foi possivel carregar os dados."
                                }
                            />
                        ) : isLoading || isFetching ? (
                            <Loader />
                        ) : Array.isArray(classrooms) && classrooms.length > 0 ? (
                            <div className="space-y-3">
                                <div className="mb-4">
                                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                                        Vídeos do módulo
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {classrooms.length} aulas disponíveis
                                    </p>
                                </div>

                                {/* PLAYLIST */}
                                {classrooms.map((item) => {
                                    const active = classroomId === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setClassroomId(item.id)}
                                            className={`
                                                group flex w-full gap-3 rounded-xl p-2 text-left
                                                transition-all hover:bg-gray-100
                                                dark:hover:bg-white/5
                                                ${active
                                                    ? "bg-indigo-50 ring-1 ring-indigo-200 dark:bg-indigo-500/10 dark:ring-indigo-500/30"
                                                    : ""
                                                }
                                            `}
                                        >
                                            {/* THUMBNAIL */}
                                            <div className="
                                                relative h-20 w-32 shrink-0 overflow-hidden
                                                rounded-lg bg-gray-200 dark:bg-white/10
                                            ">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="
                                                    absolute inset-0 flex items-center justify-center
                                                    bg-black/20 opacity-0 transition group-hover:opacity-100
                                                ">
                                                    <Play
                                                        size={26}
                                                        className="fill-white text-white"
                                                    />
                                                </div>
                                                <span className="
                                                    absolute bottom-1 right-1 rounded-md
                                                    bg-black/80 px-1.5 py-0.5
                                                    text-[11px] font-medium text-white
                                                ">
                                                    {item.duration}
                                                </span>
                                            </div>

                                            {/* CONTEÚDO */}
                                            <div className="min-w-0 flex-1">
                                                <h3
                                                    className={`
                                                        line-clamp-2 text-sm font-semibold
                                                        text-gray-900 dark:text-white
                                                        ${active
                                                            ? "text-indigo-700 dark:text-indigo-300"
                                                            : ""
                                                        }
                                                    `}
                                                >
                                                    {item.title}
                                                </h3>
                                                <p className="
                                                    mt-1 line-clamp-2 text-xs
                                                    text-gray-500 dark:text-gray-400
                                                ">
                                                    {item.description}
                                                </p>
                                                <div className="
                                                    mt-2 flex items-center justify-between gap-2
                                                    text-xs text-gray-500 dark:text-gray-400
                                                ">
                                                    <span className="flex items-center gap-1">
                                                        <Clock3 size={13} />
                                                        Aula {item.order}
                                                    </span>
                                                    {item.completed && (
                                                        <span className="
                                                            flex items-center gap-1
                                                            font-medium text-emerald-600
                                                            dark:text-emerald-400
                                                        ">
                                                            <CheckCircle2 size={13} />
                                                            Concluída
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            /**
                             * MENSAGEM EXIBIDA QUANDO A BUSCA NÃO RETORNA REGISTROS.
                             */
                            <div className="rounded-2xl bg-white p-4 dark:bg-[#0A0A0B]">
                                <EmptyState
                                    icon={<Play size={28} />}
                                    title="Nenhum vídeo disponível"
                                    description="Em breve, os vídeos serão liberados."
                                />
                            </div>
                        )}
                   </div>
                </div>
            </div>
        </>
    );
};