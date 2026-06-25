"use client"

import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export function Favorite() {
    return (
        <>
            {/* CABEÇALHO */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: "Home", href: "/academy/home" },
                            { label: "Favoritos" }
                        ]}
                    />

                    {/* TÍTULO */}
                    <h1 className="
                        text-2xl font-extrabold tracking-tight
                        text-gray-900 dark:text-white
                    ">
                        Meus Favoritos
                    </h1>
                </div>
            </div>
        
            ...
        </>
    );
};