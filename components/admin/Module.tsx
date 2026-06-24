"use client"

import Link from "next/link";
import { Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";

export function Module() {
    return (
        <>
            {/* CABEÇALHO */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Dashboard", href: "/admin/dashboard" },
                            { label: "Módulos" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        Módulos
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
                        <Link href="/admin/modules/cad">
                            <Plus />
                            Novo Módulo
                        </Link>
                    </Button>
                </div>
            </div>
        
            ...
        </>
    );
};