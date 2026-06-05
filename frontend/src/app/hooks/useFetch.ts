import { useEffect, useState } from "react";

export const useFetch = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                const json = (await res.json()) as T;
                setData(json);
                setError(null);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Unable to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};