"use client"

import { Filter } from "@/components/common/Filter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// PROPS
interface FilterProps {
    appliedFilters: {
        descricao: string;
    };
    isFilterApplied: boolean; // GERENCIA O ESTADO DOS FILTROS (DERIVADO)
    onApplyFilters: (filters: {
        descricao: string;
    }) => void;
    onClearFilters: () => void;
};

export function ModuleFilter({
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
                    {/* DESCRIÇÃO */}
                    <div className="flex min-w-55 flex-1 flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Descrição</Label>
                        <Input
                            placeholder="Pesquisar descrição..."
                            className="h-9"
                            value={draft.descricao}
                            onChange={(e) =>
                                setDraft((prev) => ({
                                    ...prev,
                                    descricao: e.target.value
                                }))
                            }
                        />
                    </div>
                </>
            )}
        </Filter>
    );
};