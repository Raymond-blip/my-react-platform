import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { Copy, Check, Play } from "lucide-react";
import { cn } from "../../utils";
export function CodeBlock({ code, language = "javascript", title, showLineNumbers = false, runnable = false, onRun, className, }) {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs(Card, { className: cn("overflow-hidden", className), children: [title && (_jsxs("div", { className: "flex items-center justify-between border-b bg-muted/30 px-4 py-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium text-sm", children: title }), _jsx(Badge, { variant: "outline", className: "text-xs", children: language })] }), _jsxs("div", { className: "flex items-center gap-2", children: [runnable && (_jsxs(Button, { size: "sm", variant: "ghost", onClick: onRun, children: [_jsx(Play, { className: "h-3 w-3" }), "Run"] })), _jsx(Button, { size: "sm", variant: "ghost", onClick: copyToClipboard, children: copied ? _jsx(Check, { className: "h-3 w-3" }) : _jsx(Copy, { className: "h-3 w-3" }) })] })] })), _jsx("div", { className: "relative", children: _jsx("pre", { className: "overflow-x-auto p-4 text-sm", children: _jsx("code", { className: `language-${language}`, children: showLineNumbers
                            ? code.split("\n").map((line, i) => (_jsxs("div", { className: "flex", children: [_jsx("span", { className: "mr-4 select-none text-muted-foreground w-8 text-right", children: i + 1 }), _jsx("span", { children: line })] }, i)))
                            : code }) }) })] }));
}
//# sourceMappingURL=code-block.js.map