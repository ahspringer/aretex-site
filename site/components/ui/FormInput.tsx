import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const inputBase =
  "w-full bg-white/5 dark:bg-white/5 border border-gray-700 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200";

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wider"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(inputBase, error && "border-red-500 focus:border-red-500 focus:ring-red-500", className)}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wider"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(inputBase, "resize-none", error && "border-red-500 focus:border-red-500 focus:ring-red-500", className)}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-400 mt-0.5" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
