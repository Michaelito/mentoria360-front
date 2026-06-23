"use client"

import { signOut } from "next-auth/react";
import { Modal } from "@/components/common/Alert";

// FUNÇÃO PARA LOGOUT
export function handleSignOut() {
    Modal({
        icon : "question",
        title: "Confirmar?",
        text : "Tem certeza de que deseja sair?",
        showCancelButton : true,
        confirmButtonText: "Sim, Sair",
        cancelButtonText : "Não Sair",
        callback: (result) => {
            if (result.isConfirmed) {
                signOut(); // LOGOUT
            }
        }
    });
};