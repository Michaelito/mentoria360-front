import React from "react";
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

// TYPE
export type BreadcrumbProps = {
    label: string;
    href?: string;
};

// PROPS
type PageProps = {
    breadcrumbs: BreadcrumbProps[];
};

export function Breadcrumbs({ breadcrumbs }: PageProps) {
    return (
        <Breadcrumb className="mb-0">
            <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="text-gray-400 dark:text-gray-500 font-normal">
                                        {item.label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link 
                                            href={item.href ?? "#"} 
                                            className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors font-medium"
                                        >
                                            {item.label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className="text-gray-300 dark:text-white/10" />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};