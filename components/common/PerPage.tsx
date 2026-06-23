import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// PROPS
type PerPageProps = {
    perPage: number;
    onChange: (value: number) => void;
};

/*---- =======================
PERPAGE START --------------*/
export function PerPage({ perPage, onChange }: PerPageProps) {
    return (
        <div className="flex items-center gap-2">
            <Select
                value={String(perPage)}
                onValueChange={(value) => onChange(Number(value))}
            >
                <SelectTrigger className="w-20 h-9 bg-white">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
                itens por página
            </span>
        </div>
    );
};
/*---- =======================
PERPAGE END ----------------*/