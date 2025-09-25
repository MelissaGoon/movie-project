import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Didn't end up using this but left here for my future reference
            // Scroll to hash if present
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If not, wait for it to load in
                const timeout = setTimeout(() => {
                    const elLater = document.querySelector(hash);
                    if (elLater) {
                        elLater.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
                return () => clearTimeout(timeout);
            }
        } else {
            // Else scroll to top of page
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
    }, [pathname, hash]);

    return null;
}
