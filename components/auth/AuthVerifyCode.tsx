"use client"

import { useState } from "react";
import { ShieldCheck, Key, Eye, EyeOff, CircleCheckBig } from "lucide-react";
import { useLoginVerifyCodeForm } from "@/hooks/use-login-verify-code-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

// PROPS
type AuthVerifyCodeProps = {
    open: boolean;
    email: string;
    onOpenChange: (open: boolean) => void;
    onBack: () => void;
};

export function AuthVerifyCode({ open, email, onOpenChange, onBack }: AuthVerifyCodeProps) {
    // EXIBIR SENHA
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // HOOK VERIFICAR CÓDIGO
    const secondForm = useLoginVerifyCodeForm({
        email,
        onCloseModal: () => onOpenChange(false), // FECHA O MODAL QUANDO O FORMULÁRIO FOR ENVIADO
        onSuccess: () => {
            onOpenChange(false);
            setShowPassword(false);
            setShowPasswordConfirm(false);
        }
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-105 bg-white border-none overflow-hidden p-0">
                <DialogHeader className="px-6 py-4">
                    <DialogTitle className="flex items-center text-indigo-600 font-bold tracking-tight gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        Redefinir Senha
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="px-8 pb-8 space-y-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-3">
                        <div className="rounded-2xl border border-indigo-600/30 bg-indigo-600/10 text-indigo-600 p-4">
                            <CircleCheckBig className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-800">Código Enviado</h2>
                            <p className="text-gray-400 text-sm">
                                Insira o código enviado para <span className="text-gray-800 font-medium italic">{email}</span>
                            </p>
                        </div>
                    </div>

                    {/* FORMULÁRIO */}
                    <form onSubmit={secondForm.onSubmit} autoComplete="off" className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="code" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                                    Código de Verificação
                                </Label>
                                <div className="relative group">
                                    <ShieldCheck className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-600 transition-colors" />
                                    <Input
                                        type="text"
                                        placeholder="000000"
                                        className="pl-11 h-10 border-black/10 focus-visible:ring-indigo-600 focus-visible:border-indigo-600 transition-all"
                                        {...secondForm.form.register("code")}
                                    />
                                </div>
                                {secondForm.form.formState.errors.code && (
                                    <p className="text-[11px] font-medium text-red-600 ml-1 mt-1">
                                        {secondForm.form.formState.errors.code.message}
                                    </p>
                                )}
                            </div>

                            {/* NOVA SENHA */}
                            <div className="space-y-2">
                                <Label htmlFor="password_new" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                                    Nova Senha
                                </Label>
                                <div className="relative group">
                                    <Key className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-600 transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua nova senha..."
                                        className="pl-11 h-10 border-black/10 focus-visible:ring-indigo-600 focus-visible:border-indigo-600 transition-all"
                                        {...secondForm.form.register("password_new")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword
                                            ? <EyeOff className="h-4 w-4" />
                                            : <Eye className="h-4 w-4" />
                                        }
                                    </button>
                                </div>
                                {secondForm.form.formState.errors.password_new && (
                                    <p className="text-[11px] font-medium text-red-600 ml-1 mt-1">
                                        {secondForm.form.formState.errors.password_new.message}
                                    </p>
                                )}
                            </div>

                            {/* CONFIRMAR SENHA */}
                            <div className="space-y-2">
                                <Label htmlFor="confirm_password" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">
                                    Confirmar Nova Senha
                                </Label>
                                <div className="relative group">
                                    <Key className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-600 transition-colors" />
                                    <Input
                                        type={showPasswordConfirm ? "text" : "password"}
                                        placeholder="Repita a nova senha..."
                                        className="pl-11 h-10 border-black/10 focus-visible:ring-indigo-600 focus-visible:border-indigo-600 transition-all"
                                        {...secondForm.form.register("confirm_password")}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors cursor-pointer"
                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                    >
                                        {showPasswordConfirm
                                            ? <EyeOff className="h-4 w-4" />
                                            : <Eye className="h-4 w-4" />
                                        }
                                    </button>
                                </div>
                                {secondForm.form.formState.errors.confirm_password && (
                                    <p className="text-[11px] font-medium text-red-600 ml-1 mt-1">
                                        {secondForm.form.formState.errors.confirm_password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* BOTÕES */}
                        <DialogFooter className="flex flex-col gap-3 pt-4 sm:flex-col sm:space-x-0">
                            <Button
                                type="submit"
                                className="w-full h-10 bg-indigo-600 hover:bg-indigo-600/70 text-white"
                                disabled={secondForm.isSubmitting}
                            >
                                {secondForm.isSubmitting ? "Atualizando..." : "Alterar Senha"}
                            </Button>
                            <Button
                                type="button"
                                className="w-full h-10 text-gray-400 hover:text-indigo-600"
                                onClick={onBack}
                            >
                                Voltar
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};