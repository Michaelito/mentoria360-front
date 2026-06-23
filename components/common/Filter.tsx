"use client"

import { ReactNode, useEffect, useState } from "react";
import { Search, X, Filter as FilterIcon } from "lucide-react";
import { useMobileFilter } from "@/hooks/use-mobile-filter";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter
} from "@/components/ui/sheet";

// PROPS
type FilterProps<T extends Record<string, unknown>> = {
    appliedFilters: T;
    isFilterApplied: boolean; // CONTROLE TOTAL VEM DO COMPONENTE PAI
    onApplyFilters: (filters: T) => void;
    onClearFilters: () => void;
    children: (props: {
        draft: T;
        setDraft: React.Dispatch<React.SetStateAction<T>>;
    }) => ReactNode;
};

/*---- =======================
FILTER START ---------------*/
export function Filter<T extends Record<string, unknown>>({
    appliedFilters,
    isFilterApplied,
    onApplyFilters,
    onClearFilters,
    children
}: FilterProps<T>) {
    const isMobile = useMobileFilter(); // VERIFICA SE O DISPOSITIVO É MOBILE
    const [open, setOpen] = useState(false); // ESTADO DO SHEET

    // FILTROS (DRAFT - NÃO APLICA AUTOMÁTICO)
    const [draftFilters, setDraftFilters] = useState<T>(appliedFilters);

    // SINCRONIZA O DRAFT QUANDO O PAI ATUALIZAR FILTROS
    useEffect(() => {
        setDraftFilters(appliedFilters);
    }, [appliedFilters]);

    // APLICAR FILTROS
    const handleApply = () => {
        onApplyFilters(draftFilters);
        setOpen(false); // FECHA O SHEET
    };

    // LIMPAR FILTROS
    const handleClear = () => {
        onClearFilters();
        setOpen(false); // FECHA O SHEET
    };

    // MOBILE - FILTERS
    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="secondary" className="w-full">
                        <FilterIcon />
                        Filtros
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-3 px-4">
                        {children({
                            draft: draftFilters,
                            setDraft: setDraftFilters
                        })}
                    </div>

                    {/* BOTÕES */}
                    <SheetFooter className="flex gap-2">
                        <Button
                            variant="default"
                            className="flex-1"
                            onClick={handleApply}
                        >
                            <Search />
                            Aplicar
                        </Button>

                        {/* BOTÃO LIMPAR */}
                        {isFilterApplied && (
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={handleClear}
                            >
                                <X />
                                Limpar
                            </Button>
                        )}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );
    }

    // DESKTOP - FILTERS
    return (
        <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-1 flex-wrap items-end gap-3">
                {children({
                    draft: draftFilters,
                    setDraft: setDraftFilters
                })}
            </div>

            {/* BOTÕES */}
            <div className="flex items-end gap-2">
                <div>
                    <Button
                        variant="default"
                        className="h-9 min-w-30"
                        onClick={handleApply}
                    >
                        <Search />
                        Aplicar
                    </Button>
                </div>

                {/* BOTÃO LIMPAR */}
                {isFilterApplied && (
                    <div>
                        <Button
                            variant="link"
                            className="h-9"
                            onClick={handleClear}
                        >
                            <X />
                            Limpar
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
/*---- =======================
FILTER END -----------------*/