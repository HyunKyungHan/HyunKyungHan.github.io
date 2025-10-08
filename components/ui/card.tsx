import * as React from "react";
export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 ${className}`} {...props} />;
}
export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`p-4 ${className}`} {...props} />;
}
