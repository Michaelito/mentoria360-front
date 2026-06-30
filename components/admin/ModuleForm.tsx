"use client"

import Link from "next/link";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useModuleView } from "@/hooks/use-module-view";
import { useModuleForm } from "@/hooks/use-module-form";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// PROPS
type ModuleFormProps = {
    moduleId?: number;
};

// OPÇÕES DE NÍVEL
const LEVEL_OPTIONS = [
    { value: "beginner", label: "Iniciante" },
    { value: "intermediate", label: "Intermediário" },
    { value: "advanced", label: "Avançado" }
];

// OPÇÕES DE ÍCONE
const ICON_OPTIONS = [
    { value: "BrainCircuit", label: "Cérebro" },
    { value: "Sparkles", label: "Destaque" },
    { value: "Bot", label: "Bot" },
    { value: "Code2", label: "Código" }
];

// OPÇÕES DE COR
const COLOR_OPTIONS = [
    { value: "indigo", label: "Indigo" },
    { value: "purple", label: "Roxo" },
    { value: "blue", label: "Azul" },
    { value: "emerald", label: "Verde" }
];

export function ModuleForm({ moduleId }: ModuleFormProps) {
    // HOOK-REACT-QUERY
    const {
        data,
        isLoading,
        isError
    } = useModuleView({
        moduleId
    });

    // EXTRAÇÃO DE DADOS
    const module = data?.data;

    // VERIFICA SE ESTÁ EDITANDO
    const isEdit = !!moduleId;

    // REACT-HOOK-FORM
    const {
        form: { register, reset, control, formState: { errors } },
        onSubmit,
        isSubmitting
    } = useModuleForm({
        moduleId
    });

    /**
     * QUANDO OS DADOS DO MÓDULO SÃO CARREGADOS NO MODO EDIÇÃO,
     * O FORMULÁRIO É RESETADO COM ESSES VALORES.
     */
    useEffect(() => {
        if (!module) return;
        reset({
            title      : String(module.title ?? ""),
            description: String(module.description ?? ""),
            level      : String(module.level ?? ""),
            icon       : String(module.icon ?? ""),
            color      : String(module.color ?? ""),
            status     : Number(module.status ?? 1)
        });
    }, [module, reset]);

    /**
     * ESTADOS DE RENDERIZAÇÃO:
     * 1. ERRO AO BUSCAR MÓDULO
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
                            { label: "Módulos", href: "/admin/modules" },
                            { label: "Formulário" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        {isEdit ? "Editar Módulo" : "Cadastrar Módulo"}
                    </h1>
                </div>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="bg-white dark:bg-[#0A0A0B] rounded-2xl space-y-4 p-4">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-xs uppercase text-slate-500 tracking-wider">Dados do Módulo</h4>
                        <p className="text-xs text-slate-400">Preencha os campos abaixo para cadastrar ou editar um módulo.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {/* TÍTULO */}
                        <div className="space-y-2">
                            <Label htmlFor="title">* Título</Label>
                            <Input
                                placeholder="Digite o título..."
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* NÍVEL */}
                        <div className="space-y-2">
                            <Label htmlFor="level">* Nível</Label>
                            <Controller
                                name="level"
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
                                            {LEVEL_OPTIONS.map((option) => (
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
                            {errors.level && (
                                <p className="text-xs text-red-600">{errors.level.message}</p>
                            )}
                        </div>

                        {/* ÍCONE */}
                        <div className="space-y-2">
                            <Label htmlFor="icon">* Ícone</Label>
                            <Controller
                                name="icon"
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
                                            {ICON_OPTIONS.map((option) => (
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
                            {errors.icon && (
                                <p className="text-xs text-red-600">{errors.icon.message}</p>
                            )}
                        </div>

                        {/* COR */}
                        <div className="space-y-2">
                            <Label htmlFor="color">* Cor</Label>
                            <Controller
                                name="color"
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
                                            {COLOR_OPTIONS.map((option) => (
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
                            {errors.color && (
                                <p className="text-xs text-red-600">{errors.color.message}</p>
                            )}
                        </div>

                        {/* STATUS */}
                        <div className="space-y-2">
                            <Label htmlFor="status">* Status</Label>
                            <Input
                                placeholder="Ex: publicado, rascunho..."
                                {...register("status")}
                            />
                            {errors.status && (
                                <p className="text-xs text-red-600">{errors.status.message}</p>
                            )}
                        </div>

                        {/* ATIVO */}
                        <div className="space-y-2 md:space-y-4">
                            <Label htmlFor="active">Ativo</Label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="active"
                                            checked={value === 1}
                                            onCheckedChange={(checked) => onChange(checked)}
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

                        {/* THUMBNAIL */}
                        <div className="space-y-2 md:col-span-2 lg:col-span-3">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <Input
                                id="thumbnail"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                {...register("thumbnail")}
                            />
                            {errors.thumbnail && (
                                <p className="text-xs text-red-600">
                                    {String(errors.thumbnail.message)}
                                </p>
                            )}
                            <p className="text-xs text-slate-400">
                                Formatos aceitos: PNG, JPG, JPEG ou WEBP. Recomendado: 1920x1080.
                            </p>
                        </div>

                        {/* DESCRIÇÃO */}
                        <div className="space-y-2 md:col-span-2 lg:col-span-3">
                            <Label htmlFor="description">* Descrição</Label>
                            <Textarea
                                placeholder="Digite a descrição do módulo..."
                                className="min-h-32 resize-none"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-xs text-red-600">{errors.description.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* BOTÕES */}
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="link"
                        asChild
                    >
                        <Link href="/admin/modules">Cancelar</Link>
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