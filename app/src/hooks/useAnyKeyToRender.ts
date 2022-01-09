import { useEffect, useState } from "react";

export function useAnyKeyToRender() {
    const[, forceRender] = useState<Event>();

    useEffect(() => {
        window.addEventListener("keypress", forceRender);
        return () => window.removeEventListener("keypress", forceRender);
    }, [])
}