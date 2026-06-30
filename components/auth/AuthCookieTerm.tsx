"use client"

import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import { useCookies } from "react-cookie";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { POLICY_TERMS } from "@/mocks/policy-terms-mock";

export function AuthCookieTerm() {
    const [showSheet, setShowSheet] = useState(false); // VERIFICA SE O AVISO DE COOKIES ESTÁ ATIVO
    const [showPolicyDialog, setShowPolicyDialog] = useState(false); // VERIFICA SE A POLITICA DE PRIVACIDADE ESTÁ ATIVA

    // COOKIES ACEITOS E DATA DE EXPIRACAO
    const [cookies, setCookie] = useCookies([
        "hackeandoCookiesAccepted",
        "hackeandoCookiesExpiration"
    ]);

    // ACEITA OS COOKIES
    const handleAccept = () => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);

        // COOKIES ACEITOS
        setCookie("hackeandoCookiesAccepted", "true", { path: "/", expires: expirationDate });

        // DATA DE EXPIRACAO
        setCookie("hackeandoCookiesExpiration", expirationDate.toISOString(), { path: "/", expires: expirationDate });
        setShowSheet(false);
    };

    // VERIFICA COOKIES E EXPIRAÇÃO
    useEffect(() => {
        const cookiesAccepted = cookies.hackeandoCookiesAccepted;
        const cookiesExpiration = cookies.hackeandoCookiesExpiration;
        if (!cookiesAccepted || (cookiesExpiration && new Date(cookiesExpiration) < new Date())) {
            setShowSheet(true);
        }
    }, [cookies]);

    return (
        <>
            {/* SHEET - AVISO DE COOKIES */}
            <Sheet open={showSheet} onOpenChange={setShowSheet}>
                <SheetContent side="bottom" className="flex justify-center items-center border-none shadow-none bg-transparent p-0">
                    <div className="w-[90%] sm:w-175 bg-white rounded-2xl shadow-xl border border-gray-200 mb-4">
                        <SheetHeader>
                            <div className="flex items-center justify-between">
                                <SheetTitle className="flex items-center gap-2">Ajude-nos a melhorar sua experiência</SheetTitle>
                                <SheetDescription></SheetDescription>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => setShowSheet(false)}
                                >
                                    <XIcon className="h-6 w-6" />
                                </Button>
                            </div>
                        </SheetHeader>
                        <div className="text-sm text-gray-600 space-y-2 px-4">
                            <p>
                                Usamos cookies e outras tecnologias para
                                personalizar conteúdo e oferecer uma experiência
                                otimizada. Alguns cookies são necessários para o
                                funcionamento do site e não podem ser desativados.
                            </p>
                            <p>
                                Ao aceitar, você concorda com nossa{" "}
                                <button
                                    className="text-primary underline hover:text-primary/80"
                                    onClick={() => {
                                        setShowSheet(false);
                                        setShowPolicyDialog(true);
                                    }}
                                >
                                    Política de Cookies.
                                </button>
                            </p>
                        </div>
                        <SheetFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-6">
                            <Button
                                variant="default"
                                className="bg-indigo-600 hover:bg-indigo-600/70 text-white"
                                onClick={handleAccept}
                            >
                                Aceitar
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowSheet(false)}
                            >
                                Recusar
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-1 sm:flex-none"
                                onClick={() => {
                                    setShowSheet(false);
                                    setShowPolicyDialog(true);
                                }}
                            >
                                Ler política de cookies
                            </Button>
                        </SheetFooter>
                    </div>
                </SheetContent>
            </Sheet>

            {/* DIALOG - POLÍTICA DE COOKIES */}
            <Dialog
                open={showPolicyDialog}
                onOpenChange={(open) => {
                    setShowPolicyDialog(open);

                    // REABRE O SHEET AO FECHAR O DIALOG
                    if (!open) {
                        setShowSheet(true);
                    }
                }}
            >
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Política de Cookies</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>
                            Esta Política de Cookies explica como o Grupo
                            Hackeando utiliza cookies e tecnologias similares em
                            sua plataforma. Ao acessar nosso site, você concorda
                            com o uso de cookies conforme descrito nesta política.
                        </p>
                        {POLICY_TERMS.map((term) => (
                            <div key={term.title} className="flex flex-col">
                                <p className="font-semibold">
                                    {term.title}
                                </p>
                                <p className="whitespace-pre-line">
                                    {term.description}
                                </p>
                            </div>
                        ))}
                        <div className="flex flex-col">
                            <p className="font-semibold">
                                5. Contato
                            </p>
                            <p>
                                Dúvidas? Entre em contato pelo e-mail{" "}
                                <a href="mailto:suporte@portalhackeando.com.br" className="text-primary underline">
                                    suporte@portalhackeando.com.br
                                </a>
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Grupo Hackeando — Última atualização: 29/01/2025.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowPolicyDialog(false);
                                setShowSheet(true);
                            }}
                        >
                            Voltar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};