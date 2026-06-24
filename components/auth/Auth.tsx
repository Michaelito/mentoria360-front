"use client"

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useLoginForm } from "@/hooks/use-login-form";
import { AuthSendEmail } from "@/components/auth/AuthSendEmail";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Auth() {
    const [showPassword, setShowPassword] = useState(false); // GERENCIA O ESTADO DE VISUALIZAR SENHA

    // REACT-HOOK-FORM
    const {
        register,
        handleSubmit,
        handleSubmitForm,
        errors,
        loading
    } = useLoginForm();

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                    Bem-vindo de volta
                </h1>
                <p className="text-muted-foreground text-sm">
                    Acesse sua conta para gerenciar sua segurança.
                </p>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6" autoComplete="off">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1">
                        Qual seu e-mail?
                    </Label>
                    <div className="relative group">
                        <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-800 transition-colors" />
                        <Input
                            type="email"
                            className="pl-11 h-10 border-black/10 focus-visible:ring-indigo-800 focus-visible:border-indigo-800 transition-all"
                            placeholder="Digite seu e-mail..."
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-[11px] font-medium text-red-600 ml-1 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* SENHA */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Qual sua senha?
                        </Label>
                    </div>
                    <div className="relative group">
                        <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-800 transition-colors" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha..."
                            className="pl-11 h-10 border-black/10 focus-visible:ring-indigo-800 focus-visible:border-indigo-800 transition-all"
                            {...register("password")}
                        />

                        {/* BOTÃO PARA MOSTRAR / OCULTAR SENHA */}
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword
                                ? <EyeOff className="w-4 h-4" />
                                : <Eye className="w-4 h-4" />
                            }
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-[11px] font-medium text-red-600 ml-1 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* BOTÃO */}
                <Button
                    type="submit"
                    className="w-full h-10 bg-indigo-800 hover:bg-indigo-800/70 text-white"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Autenticando...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            Acessar Plataforma
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    )}
                </Button>
            </form>

            {/* ESQUECEU A SENHA */}
            <div className="flex justify-end">
                <AuthSendEmail />
            </div>
        </div>
    );
};