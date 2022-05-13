import { useEffect, useState } from "react";

export function useRecipeId(pathname: string): number | undefined {
    const [id, setId] = useState<undefined | number>(undefined);

    useEffect(() => {
        const id = pathname.split('/')[3];

        if (id !== undefined) {
            setId(Number.parseInt(id));
        }

    }, [pathname]);

    return id;
}