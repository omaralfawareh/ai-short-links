import { useEffect, useRef } from "react";

type TurnstileWidgetProps = {
    container: string;
    widgetRef: React.RefObject<string | null>;
} & Turnstile.RenderParameters;

const currentTheme = (): "light" | "dark" =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark";

const TurnstileWidget = ({ container, widgetRef, ...rest }: TurnstileWidgetProps) => {
    const hasRendered = useRef(false);
    // Latest render params, so a re-render after a theme change uses current callbacks
    const paramsRef = useRef(rest);
    useEffect(() => {
        paramsRef.current = rest;
    });

    useEffect(() => {
        if (!hasRendered.current && typeof turnstile !== "undefined") {
            turnstile.ready(() => {
                widgetRef.current = turnstile.render(`#${container}`, {
                    size: "flexible",
                    theme: currentTheme(),
                    ...paramsRef.current,
                }) || "";
            });
        }
        hasRendered.current = true;
    }, [container, widgetRef]);

    // Turnstile can't change theme after rendering, so when <html data-theme>
    // flips (theme toggle or system change), remove the widget and render it
    // again. The new widget issues a fresh token through the same callback.
    useEffect(() => {
        if (typeof turnstile === "undefined") return;
        let theme = currentTheme();

        const observer = new MutationObserver(() => {
            const next = currentTheme();
            if (next === theme || !widgetRef.current) return;
            theme = next;
            try {
                turnstile.remove(widgetRef.current);
            } catch {
                /* widget already gone */
            }
            widgetRef.current = turnstile.render(`#${container}`, {
                size: "flexible",
                theme: next,
                ...paramsRef.current,
            }) || "";
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });
        return () => observer.disconnect();
    }, [container, widgetRef]);

    return <div id={container} />;
};

export default TurnstileWidget;
