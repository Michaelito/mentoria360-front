export function normalizeFilters<T extends Record<string, string>>(
    filters: T
): Partial<T> {
    return Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value?.trim())
    ) as Partial<T>;
};