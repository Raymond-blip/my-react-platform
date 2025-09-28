"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Play, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export function InteractiveDemo({ title, description, code, component: DemoComponent, initialProps = {}, }) {
    const [isRunning, setIsRunning] = useState(false);
    const [key, setKey] = useState(0);
    const runDemo = () => {
        setIsRunning(true);
        setTimeout(() => setIsRunning(false), 2000);
    };
    const resetDemo = () => {
        setKey((prev) => prev + 1);
    };
    return (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: title }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: resetDemo, children: _jsx(RotateCcw, { className: "h-4 w-4" }) }), _jsxs(Button, { size: "sm", onClick: runDemo, disabled: isRunning, children: [_jsx(Play, { className: "h-4 w-4" }), isRunning ? "Running..." : "Run"] })] })] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs(Tabs, { defaultValue: "preview", className: "w-full", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "preview", children: "Preview" }), _jsx(TabsTrigger, { value: "code", children: "Code" })] }), _jsx(TabsContent, { value: "preview", className: "space-y-4", children: _jsx("div", { className: "border rounded-lg p-6 bg-muted/20 min-h-[200px] flex items-center justify-center", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.3 }, children: _jsx(DemoComponent, { ...initialProps }) }, key) }) }) }), _jsx(TabsContent, { value: "code", children: _jsx(CodeBlock, { code: code, language: "tsx", showLineNumbers: true }) })] }) })] }));
}
//# sourceMappingURL=interactive-demo.js.map