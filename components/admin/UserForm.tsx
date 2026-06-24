"use client"

import Link from "next/link";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useUserView } from "@/hooks/use-user-view";
import { useUserForm } from "@/hooks/use-user-form";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// PROPS
type UserFormProps = {
    userId?: number;
};

// OPÇÕES DE PERFIL
const PROFILE_OPTIONS = [
    { value: "1", label: "Administrador" },
    { value: "2", label: "Usuário" }
];

export function UserForm({ userId }: UserFormProps) {
    // HOOK-REACT-QUERY
    const {
        data,
        isLoading,
        isError
    } = useUserView({
        userId
    });

    // EXTRAÇÃO DE DADOS
    const user = data?.data;

    // VERIFICA SE ESTÁ EDITANDO
    const isEdit = !!userId;

    // REACT-HOOK-FORM
    const {
        form: { register, reset, control, formState: { errors } },
        onSubmit,
        isSubmitting
    } = useUserForm({
        userId
    });

    // DEBUG
    // const debugFormValues = watch();

    /**
     * QUANDO OS DADOS DO CLIENTE SÃO CARREGADOS NO MODO EDIÇÃO,
     * O FORMULÁRIO É RESETADO COM ESSES VALORES.
     */
    useEffect(() => {
        if (!user) return;
        reset({
            name    : String(user.name ?? ""),
            lastname: String(user.lastname ?? ""),
            document: String(user.document ?? ""),
            profile : String(user.profile ?? ""),
            status  : Number(user.status ?? 1)
        });
    }, [user, reset]);

    /**
     * ESTADOS DE RENDERIZAÇÃO:
     * 1. ERRO AO BUSCAR CLIENTE
     * 2. CARREGAMENTO DOS DADOS
     */
    if (isError) return <p className="text-sm text-gray-500 text-center">Nenhum registro encontrado.</p>;
    if (isLoading) return <p className="text-sm text-gray-500 text-center">Carregando...</p>;

    return (
        <>
            {/* CABEÇALHO */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Dashboard", href: "/admin/dashboard" },
                            { label: "Cadastros" },
                            { label: "Usuários", href: "/admin/users" },
                            { label: "Formulário" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        {isEdit ? "Editar Indústria" : "Cadastrar Indústria"}
                    </h1>
                </div>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl space-y-4 p-4">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Dados do Usuário</h4>
                        <p className="text-xs text-slate-400">Preencha os campos abaixo para cadastrar ou editar um usuário.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="name">* Nome</Label>
                            <Input
                                placeholder="Digite o nome..."
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* SOBRENOME */}
                        <div className="space-y-2">
                            <Label htmlFor="lastname">* Sobrenome</Label>
                            <Input
                                placeholder="Digite o sobrenome..."
                                {...register("lastname")}
                            />
                            {errors.lastname && (
                                <p className="text-xs text-red-600">{errors.lastname.message}</p>
                            )}
                        </div>

                        {/* DOCUMENTO */}
                        <div className="space-y-2">
                            <Label htmlFor="document">* Documento</Label>
                            <Input
                                placeholder="Digite o documento..."
                                {...register("document")}
                            />
                            {errors.document && (
                                <p className="text-xs text-red-600">{errors.document.message}</p>
                            )}
                        </div>

                        {/* PERFIL */}
                        <div className="space-y-2">
                            <Label htmlFor="role">* Perfil</Label>
                            <Controller
                                name="profile"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={String(field.value) ?? ""}
                                        onValueChange={(value) => value && field.onChange(value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PROFILE_OPTIONS.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={String(option.value)}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.profile && (
                                <p className="text-xs text-red-600">{errors.profile.message}</p>
                            )}
                        </div>

                        {/* SENHA */}
                        {!userId && (
                            <div className="space-y-2">
                                <Label htmlFor="password">* Senha</Label>
                                <Input
                                    type="password"
                                    placeholder="Digite a senha..."
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-600">{errors.password.message}</p>
                                )}
                            </div>
                        )}

                        {/* STATUS */}
                        <div className="space-y-2 md:space-y-4">
                            <Label htmlFor="status">Status</Label>
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={0}
                                render={({ field: { value, onChange } }) => (
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="status"
                                            checked={value === 1}
                                            onCheckedChange={(checked) => onChange(checked ? 1 : 0)}
                                        />
                                        <span className="text-sm text-gray-600">
                                            {value === 1
                                                ? "Ativo"
                                                : "Inativo"
                                            }
                                        </span>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* BOTÕES */}
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="link"
                        asChild
                    >
                        <Link href="/admin/users">Cancelar</Link>
                    </Button>
                    <Button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-600/70 text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Salvando..."
                            : "Salvar"
                        }
                    </Button>
                </div>
            </form>
        </>
    );
};