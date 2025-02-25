import React from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TextEditor = React.memo(function TextEditor({ value, onChange, error }: TextEditorProps) {
  return (
    <div className="flex flex-col">
      <Label htmlFor="content" className="text-xl font-semibold text-purple-900">
        Content
      </Label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className={`mt-2 h-56 ${error ? 'border-red-500' : 'border-purple-200'} focus-within:border-purple-400 rounded-lg`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});