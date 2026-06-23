"use client"

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useLoginSendEmailForm } from "@/hooks/use-login-send-email-form";
import { AuthVerifyCode } from "@/components/auth/AuthVerifyCode";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export function AuthSendEmail() {
    const [userEmail, setUserEmail] = useState(""); // ARMAZENA O E-MAIL DO USUÁRIO

    // CONTROLA A VISIBILIDADE DO MODAL
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showSecondModal, setShowSecondModal] = useState(false);

    // HOOK ENVIAR E-MAIL
    const firstForm = useLoginSendEmailForm({
        onCloseModal: () => setShowFirstModal(false), // FECHA O MODAL QUANDO O FORMULÁRIO FOR ENVIADO
        onSuccess: (email) => {
            setUserEmail(email);
            setShowSecondModal(true);
        }
    });

    return (
        <>
            {/* BOTÃO PARA ABRIR O PRIMEIRO MODAL */}
            <div className="text-right">
                <button
                    type="button"
                    className="text-sm text-gray-400 hover:text-indigo-800 transition-colors underline-offset-4 hover:underline cursor-pointer"
                    onClick={() => setShowFirstModal(true)}
                >
                    Esqueci minha senha
                </button>
            </div>

            {/* PRIMEIRO MODAL: ENVIAR E-MAIL */}
            <Dialog open={showFirstModal} onOpenChange={setShowFirstModal}>
                <DialogContent className="sm:max-w-105 bg-white border-none overflow-hidden p-0">
                    <DialogHeader className="px-6 py-4">
                        <DialogTitle className="flex items-center text-indigo-800 font-bold tracking-tight gap-2">
                            <Lock className="w-4 h-4" />
                            Esqueci minha senha
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="px-8 pb-8 space-y-6">
                        <div className="flex flex-col items-center justify-center text-center space-y-3">
                            <div className="rounded-2xl border border-indigo-800/30 bg-indigo-800/10 text-indigo-800 p-4">
                                <Mail className="h-8 w-8" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-gray-800">Verifique seu e-mail</h2>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Enviaremos um código de segurança para validar sua identidade.
                                </p>
                            </div>
                        </div>

                        {/* FORMULÁRIO */}
                        <form onSubmit={firstForm.onSubmit} autoComplete="off" className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="login" className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1">
                                    E-mail Cadastrado
                                </Label>
                                <div className="relative group">
                                    <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-800 transition-colors" />
                                    <Input
                                        type="email"
                                        className="pl-11 h-10 border-black/10 focus-visible:ring-indigo-800 focus-visible:border-indigo-800 transition-all"
                                        placeholder="Digite seu e-mail..."
                                        {...firstForm.form.register("login")}
                                    />
                                </div>
                                {firstForm.form.formState.errors.login && (
                                    <p className="text-[11px] font-medium text-red-600 ml-1 mt-1">
                                        {firstForm.form.formState.errors.login.message}
                                    </p>
                                )}
                            </div>

                            {/* BOTÕES */}
                            <div className="flex flex-col gap-3 pt-2">
                                <Button
                                    type="submit"
                                    className="w-full h-10 bg-indigo-800 hover:bg-indigo-800/70 text-white"
                                    disabled={firstForm.isSubmitting}
                                >
                                    {firstForm.isSubmitting ? "Processando..." : "Enviar Código de Segurança"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="w-full h-10 text-gray-400 hover:text-indigo-800"
                                    onClick={() => setShowFirstModal(false)}
                                >
                                    Voltar para o login
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            {/* SEGUNDO MODAL: CONFIRMAR CÓDIGO E NOVA SENHA */}
            <AuthVerifyCode
                open={showSecondModal}
                onOpenChange={setShowSecondModal}
                email={userEmail}
                onBack={() => {
                    setShowSecondModal(false);
                    setShowFirstModal(true);
                }}
            />
        </>
    );
};