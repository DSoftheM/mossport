import React, { useEffect } from "react";

export function useClickOutside(ref: React.MutableRefObject<HTMLElement | null>, handler: (event?: MouseEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent | Event) => {
            if (!ref) return;
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event as MouseEvent);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
