"use client"

import { Filter } from "@/components/common/Filter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// PROPS
interface FilterProps {
    appliedFilters: {
        name    : string;
        email   : string;
        document: string;
    };
    isFilterApplied: boolean; // GERENCIA O ESTADO DOS FILTROS (DERIVADO)
    onApplyFilters: (filters: {
        name    : string;
        email   : string;
        document: string;
    }) => void;
    onClearFilters: () => void;
};

export function UserFilter({
    appliedFilters,
    isFilterApplied,
    onApplyFilters,
    onClearFilters
}: FilterProps) {
    return (
        <Filter
            appliedFilters={appliedFilters}
            isFilterApplied={isFilterApplied}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
        >
            {({ draft, setDraft }) => (
                <>
                    {/* NOME */}
                    <div className="flex min-w-55 flex-1 flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Nome</Label>
                        <Input
                            placeholder="Pesquisar nome..."
                            className="h-9"
                            value={draft.name}
                            onChange={(e) =>
                                setDraft((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }
                        />
                    </div>

                    {/* E-MAIL */}
                    <div className="flex min-w-55 flex-1 flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">E-mail</Label>
                        <Input
                            placeholder="Pesquisar e-mail..."
                            className="h-9"
                            value={draft.email}
                            onChange={(e) =>
                                setDraft((prev) => ({
                                    ...prev,
                                    email: e.target.value
                                }))
                            }
                        />
                    </div>

                    {/* DOCUMENTO */}
                    <div className="flex min-w-55 flex-1 flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Documento</Label>
                        <Input
                            placeholder="00.000.000/0000-00"
                            className="h-9"
                            value={draft.document}
                            onChange={(e) =>
                                setDraft((prev) => ({
                                    ...prev,
                                    document: e.target.value
                                }))
                            }
                        />
                    </div>
                </>
            )}
        </Filter>
    );
};