import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../utils";
const Card = React.forwardRef(({ className, asChild, ...props }, ref) => {
    if (asChild) {
        const { children, ...rest } = props;
        // Only clone if children is a valid ReactElement
        if (React.isValidElement(children)) {
            // Only pass className if the child is a DOM element (string type)
            const isDOMElement = typeof children.type === "string";
            const extraProps = isDOMElement
                ? {
                    className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className, children.props && children.props.className),
                    ...rest,
                }
                : { ...rest };
            return React.cloneElement(children, extraProps);
        }
        // If not a valid element, just render children
        return _jsx(_Fragment, { children: children });
    }
    return (_jsx("div", { ref: ref, "data-slot": "card", className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className), ...props }));
});
Card.displayName = "Card";
function CardHeader({ className, ...props }) {
    return (_jsx("div", { "data-slot": "card-header", className: cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className), ...props }));
}
function CardTitle({ className, ...props }) {
    return (_jsx("div", { "data-slot": "card-title", className: cn("leading-none font-semibold", className), ...props }));
}
function CardDescription({ className, ...props }) {
    return (_jsx("div", { "data-slot": "card-description", className: cn("text-muted-foreground text-sm", className), ...props }));
}
function CardAction({ className, ...props }) {
    return (_jsx("div", { "data-slot": "card-action", className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className), ...props }));
}
function CardContent({ className, ...props }) {
    return (_jsx("div", { "data-slot": "card-content", className: cn("px-6", className), ...props }));
}
function CardFooter({ className, ...props }) {
    return (_jsx("div", { "data-slot": "card-footer", className: cn("flex items-center px-6 [.border-t]:pt-6", className), ...props }));
}
export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, };
//# sourceMappingURL=card.js.map