"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Modal, ModalLoading } from "@/components/common/Alert";
import { AuthFormData, authFormSchema } from "@/types/type-login";

// LOGIN FORM
export function useLoginForm() {
    const router = useRouter(); // HOOK PARA REDIRECIONAMENTO
    const [loading, setLoading] = useState(false); // GERENCIA O ESTADO DE CARREGAMENTO

    // HOOK FORM
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
        resolver: zodResolver(authFormSchema),
        criteriaMode: "all",
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    // HOOK FORM - SUBMIT
    const handleSubmitForm = async (data: AuthFormData) => {
    try {
        setLoading(true);
        ModalLoading(true);
        const result = await signIn("credentials", {
            redirect: false, // NÃO REDIRECIONA AUTOMATICAMENTE
            email: data.email,
            password: data.password
        });
        ModalLoading(false);
        if (result?.error) {
            Modal({
                icon: "error",
                title: "Credenciais incorretas",
                text: "Verifique seu usuário e senha para ter acesso ao portal.",
                showConfirmButton: true
            });
        } else {
            router.push("/academy/home"); // REDIRECIONA PÁGINA
        }
    } catch {
            setLoading(false);
            Modal({
                icon: "error",
                title: "Credenciais incorretas",
                text: "Verifique seu usuário e senha para ter acesso ao portal.",
                showConfirmButton: true
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        handleSubmit,
        handleSubmitForm,
        errors,
        loading
    };
};