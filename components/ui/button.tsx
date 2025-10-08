import * as React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "secondary" | "ghost";
    size?: "sm" | "md" | "icon";
};
export function Button({ className = "", variant = "default", size = "md", ...props }: ButtonProps) {
    const v = {
        default: "bg-black text-white hover:opacity-90",
        secondary: "bg-neutral-100 text-black hover:bg-neutral-200",
        ghost: "bg-transparent hover:bg-neutral-100"
    }[variant];
    const s = {
        sm: "px-3 py-1.5 text-sm rounded-xl",
        md: "px-4 py-2 text-sm rounded-xl",
        icon: "p-2 rounded-xl"
    }[size];
    return <button className={`${v} ${s} ${className}`} {...props} />;
}
