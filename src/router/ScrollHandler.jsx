import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollHandler() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const type = params.get("type");

        if (type) {
            // Scroll to the type section
            const el = document.getElementById("type-selection");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If not rendered yet, retry after a short delay
                const timeout = setTimeout(() => {
                    const elLater = document.getElementById("type-selection");
                    if (elLater) {
                        elLater.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
                return () => clearTimeout(timeout);
            }
        } else {
            // Scroll to top
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
    }, [pathname, search]);

    return null;
}
