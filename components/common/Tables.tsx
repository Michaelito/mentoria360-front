import { ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

// INTERFACE
type TableHeaderItem = {
    key: string;
    label: ReactNode;
};

// PROPS
type TablesProps<T extends ReactNode> = {
    headers: TableHeaderItem[];
    rows: Array<Record<string, T>>; 
};

/*---- =======================
TABLE START ----------------*/
export function Tables<T extends ReactNode>({ headers, rows }: TablesProps<T>) {
    return (
        <Table className="min-w-full">
            <TableHeader>
                <TableRow className="bg-gray-50 text-gray-600 dark:text-gray-300">
                    {headers.map((headerItem, index) => (
                        <TableHead key={index} className="text-xs font-semibold text-gray-600">
                            {headerItem.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                        {headers.map((headerItem, colIndex) => (
                            <TableCell
                                key={colIndex}
                                className="text-sm text-gray-500 dark:text-gray-200 border-t border-gray-100 dark:border-gray-800 py-1"
                            >
                                {row[headerItem.key]} 
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
/*---- =======================
TABLE END ------------------*/