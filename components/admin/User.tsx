"use client"

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, UserRound } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { UserFilter } from "@/components/admin/UserFilter";
import { Loader, EmptyState, ErrorMessage } from "@/components/common/Loaders";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Tables } from "@/components/common/Tables";
import { PerPage } from "@/components/common/PerPage";
import { Paginate } from "@/components/common/Paginate";
import { Button } from "@/components/ui/button";

export function User() {
    const [page, setPage] = useState(1); // GERENCIA O ESTADO DE PAGINAÇÃO
    const [perPage, setPerPage] = useState(10); // GERENCIA ITENS POR PÁGINA

    /**
     * OBJETO COM OS VALORES PADRÃO DOS FILTROS.
     * USEMEMO É USADO PARA EVITAR RECRIAR ESSE OBJETO A CADA RENDERIZAÇÃO.
     */
    const defaultFilters = useMemo(() => ({
        name    : "",
        email   : "",
        document: ""
    }), []);

    /**
     * ESTADO RESPONSÁVEL PELOS FILTROS ATUALMENTE APLICADOS NA LISTAGEM.
     * ESSES FILTROS SÃO ENVIADOS PARA A QUERY DO HOOK.
     */
    const [filters, setFilters] = useState(defaultFilters);

    /**
     * APLICA NOVOS FILTROS À LISTAGEM.
     *
     * REGRAS:
     * - SEMPRE VOLTA PARA A PRIMEIRA PÁGINA AO APLICAR FILTRO
     * - MANTÉM OS FILTROS ANTERIORES E SOBRESCREVE APENAS OS NOVOS VALORES RECEBIDOS
     */
    const handleApplyFilters = (newFilters: Partial<typeof filters>) => {
        setPage(1);
        setFilters((prev) => ({
            ...prev,
            ...newFilters
        }));
    };

    /**
     * REMOVE TODOS OS FILTROS APLICADOS E RESTAURA OS VALORES PADRÃO.
     * TAMBÉM REINICIA A PAGINAÇÃO PARA A PRIMEIRA PÁGINA.
     */
    const handleClearFilters = () => {
        setPage(1);
        setFilters(defaultFilters);
    };

    /**
     * INDICA SE EXISTE PELO MENOS UM FILTRO ATIVO.
     * ESSE VALOR PODE SER USADO PARA MUDAR COMPORTAMENTO VISUAL DO COMPONENTE DE FILTRO,
     * COMO EXIBIR BOTÃO DE LIMPAR OU DESTACAR QUE HÁ FILTROS APLICADOS.
     */
    const isFilterApplied = useMemo(() => {
        return (
            filters.name     !== "" ||
            filters.email    !== "" ||
            filters.document !== ""
        );
    }, [filters]);

    // REACT-QUERY
    const {
        data,
        error,
        isError,
        isLoading
    } = useUser({
        page,
        perPage,
        filters
    });

    // EXTRAÇÃO DE DADOS
    const users = data?.data ?? [];

    // PAGINAÇÃO
    const pagination = data?.pagination;
    const totalItems = pagination?.totalItems ?? 0;
    const totalPages = Math.ceil((pagination?.totalItems ?? 0) / (pagination?.itemsPerPage ?? 1));

    return (
        <>
            {/* CABEÇALHO */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Dashboard", href: "/admin/dashboard" },
                            { label: "Usuários" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        Usuários
                    </h1>
                </div>

                {/* ÁREA DE BOTÕES / AÇÕES */}
                <div className="flex items-center gap-3">
                    <Button
                        asChild
                        className="
                            bg-indigo-600 hover:bg-indigo-600/70
                            text-white
                        "
                    >
                        <Link href="/admin/users/cad">
                            <Plus />
                            Novo Usuário
                        </Link>
                    </Button>
                </div>
            </div>

            {/* FILTROS */}
            <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                <UserFilter
                    appliedFilters={filters}
                    isFilterApplied={isFilterApplied}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />
            </div>

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
                        : "Não foi possível carregar os dados."
                    }
                />
            ) : isLoading ? (
                <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                    <Loader />
                </div>
            ) : Array.isArray(users) && users.length > 0 ? (
                <>
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                        <div className="overflow-y-auto">
                            <Tables
                                headers={[
                                    { key: "codigo", label: "Código" },
                                    { key: "name", label: "Nome" },
                                    { key: "lastname", label: "Sobrenome" },
                                    { key: "document", label: "Documento" },
                                    { key: "profile", label: "Perfil" },
                                    { key: "status", label: "Ativo?" },
                                    { key: "acoes", label: "Ações" }
                                ]}
                                rows={users.map((item) => ({
                                    key     : item.id,
                                    codigo  : item.id,
                                    name    : item.name,
                                    lastname: item.lastname,
                                    document: item.document,
                                    profile : item.profile,
                                    status  : item.status === 0 ? (
                                        <span className="text-white text-xs bg-red-600 rounded px-2 py-0.5">Não</span>
                                    ) : (
                                        <span className="text-white text-xs bg-green-500 rounded px-2 py-0.5">Sim</span>
                                    ),
                                    acoes: (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="link"
                                                className="text-xs p-0"
                                                asChild
                                            >
                                                <Link href={`/admin/users/cad/${item.id}`}>
                                                    Editar
                                                </Link>
                                            </Button>
                                        </div>
                                    )
                                }))}
                            />
                        </div>
                    </div>

                    {/* RODAPÉ DA LISTAGEM COM TOTAL DE REGISTROS E CONTROLES DE PAGINAÇÃO */}
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                        <span className="text-xs whitespace-nowrap text-muted-foreground">
                            total de {totalItems} registros
                        </span>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <PerPage
                                perPage={perPage}
                                onChange={(value) => {
                                    /**
                                     * AO ALTERAR A QUANTIDADE DE ITENS POR PÁGINA,
                                     * A LISTAGEM REINICIA NA PRIMEIRA PÁGINA
                                     * PARA EVITAR INCONSISTÊNCIA DE NAVEGAÇÃO.
                                     */
                                    setPerPage(value);
                                    setPage(1);
                                }}
                            />
                            <Paginate
                                setPage={setPage}
                                page={pagination?.currentPage || 1}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </>
            ) : (
                /**
                 * MENSAGEM EXIBIDA QUANDO A BUSCA NÃO RETORNA REGISTROS.
                 */
                <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl p-4">
                    <EmptyState
                        icon={<UserRound size={28} />}
                        title="Nenhum usuário encontrado"
                        description="Ainda não existem usuários cadastrados."
                    />
                </div>
            )}
        </>
    );
};