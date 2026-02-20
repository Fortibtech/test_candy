import React, { forwardRef } from "react";
import { Search } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", icon, error, ...props }, ref) => {
        return (
            <div className="w-full relative group">
                {icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-200">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
            w-full bg-stone-50 border-0 ring-1 ring-stone-200 
            focus:ring-2 focus:ring-primary/10 focus:bg-white
            rounded-xl px-4 py-3 
            ${icon ? "pl-11" : ""} 
            outline-none transition-all duration-300
            placeholder:text-stone-400 text-primary font-medium
            ${error ? "ring-error focus:ring-error" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && <span className="text-xs text-error mt-1 ml-1">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
