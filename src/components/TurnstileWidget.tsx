import { useEffect, useRef } from "react";

const TurnstileWidget = ({ container, widgetRef, ...rest }:
    { container: string, widgetRef: React.RefObject<string | null> }
    & Turnstile.RenderParameters) => {
    const hasRendered = useRef(false);

    useEffect(() => {
        if (!hasRendered.current) {

            widgetRef.current = turnstile.render(`#${container}`, {
                size: "flexible",
                theme: "dark",
                ...rest,
            }) || ""
            console.log("widgetId", widgetRef.current);
        }



        hasRendered.current = true;
    }, [container, widgetRef, rest]);

    return <div id={container}> </div>;
}

export default TurnstileWidget;