import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white/50 backdrop-blur-sm
          border border-gray-200
          focus:border-blue-400 focus:ring-4 focus:ring-blue-100
          transition-all duration-200
          outline-none
          placeholder-gray-400
          min-h-[150px]
          resize-y
          ${className}
        `}
      />
    </div>
  );
}