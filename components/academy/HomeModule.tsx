"use client"

import { useState } from "react";
import { ArrowRight, Layers, Lock } from "lucide-react";
import { useModule } from "@/hooks/use-module";
import { moduleIcons } from "@/utils/mapper-icon";
import { Loader, EmptyState, ErrorMessage } from "@/components/common/Loaders";

export function HomeModule() {
    const [page, setPage] = useState(1); // GERENCIA O ESTADO DE PAGINAÇÃO
    const [perPage, setPerPage] = useState(10); // GERENCIA ITENS POR PÁGINA

    // REACT-QUERY
    const {
        data,
        error,
        isError,
        isLoading,
        isFetching
    } = useModule({
        page,
        perPage,
        filters: {
            descricao: ""
        }
    });

    // EXTRAÇÃO DE DADOS
    const modules = data?.data ?? [];

    return (
        <>
            {/* MÓDULOS */}
            <header>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                    Comece por aqui
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Siga a trilha recomendada, do fundamento à criação de soluções reais.
                </p>
            </header>

            {/* 
                RENDERIZAÇÃO CONDICIONAL DA ÁREA PRINCIPAL:
                1. ERRO
                2. CARREGAMENTO
                3. TABELA COM RESULTADOS
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
                <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                    <Loader />
                </div>
            ) : Array.isArray(modules) && modules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {modules.map((module) => {
                        const Icon = moduleIcons[module.icon]; // ÍCONES DOS MÓDULOS

                        return (
                            <article key={module.id} className="flex flex-col bg-white dark:bg-[#0A0A0B] rounded-2xl p-6">
                                <div
                                    className={`
                                        relative flex h-12 w-12 items-center
                                        justify-center rounded-2xl z-10
                                        ${
                                            module.color === "indigo"
                                                ? "bg-indigo-600 text-white"
                                                : module.color === "violet"
                                                    ? "bg-violet-600 text-white"
                                                    : module.color === "orange"
                                                        ? "bg-orange-500 text-white"
                                                        : "bg-slate-300 text-white"
                                        }
                                    `}
                                >
                                    {Icon && (
                                        <Icon className="h-5 w-5" />
                                    )}
                                </div>

                                {/* DETALHES DO MÓDULO */}
                                <div className="relative mt-6 z-10">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600">
                                            {module.level}
                                        </span>
                                        {!module.active && (
                                            <Lock className="h-4 w-4 text-slate-400" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-950">
                                        {module.title}
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                                        {module.description}
                                    </p>
                                </div>

                                {/* BOTÃO */}
                                <div className="flex items-center justify-between mt-auto pt-6">
                                    {module.active ? (
                                        <button
                                            type="button"
                                            className="
                                                inline-flex items-center text-sm font-semibold
                                                text-indigo-600 transition group-hover:gap-3
                                            "
                                        >
                                            {module.status}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </button>
                                    ) : (
                                        <span className="text-sm font-medium text-slate-400">
                                            Em breve
                                        </span>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                /**
                 * MENSAGEM EXIBIDA QUANDO A BUSCA NÃO RETORNA REGISTROS.
                 */
                <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                    <EmptyState
                        icon={<Layers size={28} />}
                        title="Nenhum múdulo disponível"
                        description="Em breve, os módulos serão liberados."
                    />
                </div>
            )}
        </>
    );
};