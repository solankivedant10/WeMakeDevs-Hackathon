'use client';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'hcl' }: CodeBlockProps) {
  return (
    <div className="rounded-xl bg-[#1e1e1e] border border-gray-800 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="ml-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            alert('✅ Code copied to clipboard!');
          }}
          className="px-3 py-1 rounded-md text-xs font-medium bg-gray-700/50 hover:bg-gray-700 text-gray-300 transition-colors"
        >
          📋 Copy
        </button>
      </div>
      <div className="overflow-x-auto">
        <pre className="p-6 text-sm leading-relaxed">
          <code className="text-gray-300 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}
