"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";

export interface FileInputProps {
  value?: FileList;
  onChange?: (files: FileList | null) => void;
  label?: string;
  error?: boolean;
  accept?: string;
  className?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, label, error, onChange, value, accept }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const fileName = value?.[0]?.name;

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.files);
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium">
            {label} <span className="text-red-600">*</span>
          </label>
        )}

        <input
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />

        <div
          onClick={handleClick}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-xl border px-4 cursor-pointer transition",
            "bg-white",
            error ? "border-red-600" : "border-zinc-300 hover:border-zinc-400",
            className
          )}
        >
          <span className="text-sm text-zinc-500 truncate">{fileName}</span>

          <span className="flex items-center gap-2 text-red-600 font-medium text-sm">
            <Upload size={16} />
            Upload file
          </span>
        </div>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };
