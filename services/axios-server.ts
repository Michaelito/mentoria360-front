"use server"

import axios from "axios";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth-config";

/**
 * CRIA UMA INSTÂNCIA AXIOS JÁ AUTENTICADA PARA USO SERVER-SIDE
 * DEVE SER CHAMADA DENTRO DE SERVER ACTIONS OU ROUTE HANDLERS
 */
export async function getServerApi() {
    const session = await getServerSession(nextAuthOptions);
    // console.log("session:", session);

    return axios.create({
        baseURL: process.env.NEXT_URL_BASE,
        headers: {
            "Content-Type": "application/json",
            "X-Tenant-Id" : process.env.NEXT_TENANT_TOKEN,
            ...(session?.accessToken && {
                "Authorization": `Bearer ${session.accessToken}`
            })
        }
    });
};