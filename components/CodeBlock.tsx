
import React, { useState } from 'react';
import { CodeBlockProps } from '../types';

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="bg-gray-800 text-xs text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          {copied ? 'コピー済み！' : 'コピー'}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};
