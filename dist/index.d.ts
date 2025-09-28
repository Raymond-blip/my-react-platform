import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import React__default from 'react';
export { ComponentProps, ComponentType, FC, ReactNode } from 'react';
import { VariantProps as VariantProps$1 } from 'class-variance-authority';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as ResizablePrimitive from 'react-resizable-panels';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ClassValue } from 'clsx';

declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...props }: React$1.ComponentProps<"div"> & VariantProps$1<typeof alertVariants>): React$1.JSX.Element;
declare function AlertTitle({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function AlertDescription({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;

declare function Avatar({ className, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Root>): React$1.JSX.Element;
declare function AvatarImage({ className, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Image>): React$1.JSX.Element;
declare function AvatarFallback({ className, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Fallback>): React$1.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, asChild, ...props }: React$1.ComponentProps<"span"> & VariantProps$1<typeof badgeVariants> & {
    asChild?: boolean;
}): React$1.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: React$1.ComponentProps<"button"> & VariantProps$1<typeof buttonVariants> & {
    asChild?: boolean;
}): React$1.JSX.Element;

type CardProps = React$1.ComponentProps<"div"> & {
    asChild?: boolean;
};
declare const Card: React$1.ForwardRefExoticComponent<Omit<CardProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare function CardHeader({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function CardTitle({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function CardDescription({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function CardAction({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function CardContent({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;
declare function CardFooter({ className, ...props }: React$1.ComponentProps<"div">): React$1.JSX.Element;

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
    runnable?: boolean;
    onRun?: () => void;
    className?: string;
}
declare function CodeBlock({ code, language, title, showLineNumbers, runnable, onRun, className, }: CodeBlockProps): React$1.JSX.Element;

declare function Collapsible({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>): React$1.JSX.Element;
declare function CollapsibleTrigger({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>): React$1.JSX.Element;
declare function CollapsibleContent({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>): React$1.JSX.Element;

declare function Input({ className, type, ...props }: React$1.ComponentProps<"input">): React$1.JSX.Element;

interface InteractiveDemoProps {
    title: string;
    description: string;
    code: string;
    component: React__default.ComponentType;
    initialProps?: Record<string, any>;
}
declare function InteractiveDemo({ title, description, code, component: DemoComponent, initialProps, }: InteractiveDemoProps): React__default.JSX.Element;

declare function Label({ className, ...props }: React$1.ComponentProps<typeof LabelPrimitive.Root>): React$1.JSX.Element;

interface LoadingDotsProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}
declare function LoadingDots({ className, size }: LoadingDotsProps): React$1.JSX.Element;

declare function Progress({ className, value, ...props }: React$1.ComponentProps<typeof ProgressPrimitive.Root>): React$1.JSX.Element;

declare function ResizablePanelGroup({ className, ...props }: React$1.ComponentProps<typeof ResizablePrimitive.PanelGroup>): React$1.JSX.Element;
declare function ResizablePanel({ ...props }: React$1.ComponentProps<typeof ResizablePrimitive.Panel>): React$1.JSX.Element;
declare function ResizableHandle({ withHandle, className, ...props }: React$1.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}): React$1.JSX.Element;

declare function ScrollArea({ className, children, ...props }: React$1.ComponentProps<typeof ScrollAreaPrimitive.Root>): React$1.JSX.Element;
declare function ScrollBar({ className, orientation, ...props }: React$1.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): React$1.JSX.Element;

declare function Select({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Root>): React$1.JSX.Element;
declare function SelectGroup({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Group>): React$1.JSX.Element;
declare function SelectValue({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Value>): React$1.JSX.Element;
declare function SelectTrigger({ className, size, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
}): React$1.JSX.Element;
declare function SelectContent({ className, children, position, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Content>): React$1.JSX.Element;
declare function SelectLabel({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Label>): React$1.JSX.Element;
declare function SelectItem({ className, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Item>): React$1.JSX.Element;
declare function SelectSeparator({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Separator>): React$1.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): React$1.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): React$1.JSX.Element;

declare function Separator({ className, orientation, decorative, ...props }: React$1.ComponentProps<typeof SeparatorPrimitive.Root>): React$1.JSX.Element;

declare function Tabs({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Root>): React$1.JSX.Element;
declare function TabsList({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.List>): React$1.JSX.Element;
declare function TabsTrigger({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Trigger>): React$1.JSX.Element;
declare function TabsContent({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Content>): React$1.JSX.Element;

declare function Textarea({ className, ...props }: React$1.ComponentProps<"textarea">): React$1.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}
interface VariantProps {
    variant?: string;
    size?: string;
}

export { Alert, AlertDescription, AlertTitle, Avatar, AvatarFallback, AvatarImage, Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CodeBlock, Collapsible, CollapsibleContent, CollapsibleTrigger, Input, InteractiveDemo, Label, LoadingDots, Progress, ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Textarea, badgeVariants, buttonVariants, cn };
export type { BaseComponentProps, VariantProps };
