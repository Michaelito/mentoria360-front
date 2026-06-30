"use client"

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Layers, Lock } from "lucide-react";
import { useModule } from "@/hooks/use-module";
import { moduleIcons } from "@/utils/mapper-icon";
import { Loader, EmptyState, ErrorMessage } from "@/components/common/Loaders";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";

export function Module() {
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
            {/* CABEÇALHO */}
            <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Home", href: "/academy/home" },
                            { label: "Trilha de Aprendizado" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        Trilha de Aprendizado
                    </h1>
                </div>
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
                            <article
                                key={module.id}
                                className="
                                    bg-white dark:bg-[#0A0A0B]
                                    rounded-2xl flex flex-col p-6
                                "
                            >
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
                                        {module.status === 0 && (
                                            <Lock className="h-4 w-4 text-slate-400" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                                        {module.title}
                                    </h3>
                                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                                        {module.description}
                                    </p>
                                </div>

                                {/* BOTÃO */}
                                <div className="flex items-center justify-between mt-auto pt-6">
                                    {module.status === 1 ? (
                                        <Button
                                            variant="link"
                                            className="p-0"
                                            asChild
                                        >
                                            <Link
                                                href={`/academy/modules/classroom/${module.id}`}
                                            >
                                                {module.status}
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
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