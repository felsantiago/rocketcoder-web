"use client";

interface CodeBlockProps {
  code: string;
  _language?: string; // Language prop is optional for basic implementation
}

export function CodeBlock({ code, _language }: CodeBlockProps) {
  // Basic implementation using <pre> and <code>
  // For actual syntax highlighting, consider using a library like react-syntax-highlighter
  return (
    <pre className="bg-neutral-800 p-4 rounded-md overflow-x-auto w-full text-left text-sm font-mono text-neutral-300">
      <code>{code}</code>
    </pre>
  );
}