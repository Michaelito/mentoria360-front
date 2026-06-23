import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

// PROPS
type PaginationProps = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
};

/*---- =======================
PAGINATION START -----------*/
export function Paginate({ page, totalPages, setPage }: PaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => setPage(Math.max(page - 1, 1))}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
                {page > 2 && (
                    <>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() => setPage(1)}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                        {page > 3 && <PaginationEllipsis />}
                    </>
                )}
                {page > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={() => setPage(page - 1)}
                        >
                            {page - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        className="
                            bg-emerald-600 hover:bg-emerald-600/90 text-white hover:text-white
                            dark:bg-white dark:text-gray-900"
                        isActive
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
                {page < totalPages && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={() => setPage(page + 1)}
                        >
                            {page + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}
                {page + 1 < totalPages && (
                    <>
                        {page + 2 < totalPages && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={() => setPage(totalPages)}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => setPage(Math.min(page + 1, totalPages))}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
/*---- =======================
PAGINATION END -------------*/