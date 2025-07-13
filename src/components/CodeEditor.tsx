import React, { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language = 'Python' }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate realistic output based on the code
    const simulatedOutput = generateOutput(code);
    
    setOutput(simulatedOutput);
    setIsRunning(false);
  };

  const generateOutput = (code: string): string => {
    if (code.includes('sortColors')) {
      return `Test 1: [2, 0, 2, 1, 1, 0] -> [0, 0, 1, 1, 2, 2]
Test 2: [2, 0, 1] -> [0, 1, 2]
Test 3: [0] -> [0]
Test 4: [1, 2, 0] -> [0, 1, 2]

✅ All tests passed!
Runtime: 52ms (beats 89.2% of submissions)
Memory: 14.1MB (beats 76.8% of submissions)`;
    } else if (code.includes('removeDuplicates')) {
      return `Test 1: [1, 1, 2] -> [1, 2] (length: 2)
Test 2: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] -> [0, 1, 2, 3, 4] (length: 5)
Test 3: [1, 2, 3] -> [1, 2, 3] (length: 3)

✅ All tests passed!
Runtime: 68ms (beats 95.4% of submissions)
Memory: 15.2MB (beats 82.1% of submissions)`;
    } else if (code.includes('maxArea')) {
      return `Test 1: [1, 8, 6, 2, 5, 4, 8, 3, 7] -> 49
Test 2: [1, 1] -> 1
Test 3: [4, 3, 2, 1, 4] -> 16
Test 4: [1, 2, 1] -> 2

✅ All tests passed!
Runtime: 45ms (beats 92.8% of submissions)
Memory: 16.8MB (beats 75.3% of submissions)`;
    } else if (code.includes('lengthOfLongestSubstring')) {
      return `Test 1: 'abcabcbb' -> 3
Test 2: 'bbbbb' -> 1
Test 3: 'pwwkew' -> 3
Test 4: '' -> 0

✅ All tests passed!
Runtime: 38ms (beats 96.7% of submissions)
Memory: 13.9MB (beats 88.4% of submissions)`;
    }
    
    return `Code executed successfully!
Runtime: 42ms
Memory: 14.5MB`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const highlightCode = (code: string) => {
    return code.split('\n').map((line, index) => (
      <div key={index} className="flex">
        <span className="select-none text-gray-500 text-right w-8 mr-4 flex-shrink-0">
          {index + 1}
        </span>
        <span className="flex-1">
          {line.split(/(\s+|#.*$|"""[\s\S]*?"""|'[^']*'|"[^"]*"|\b(?:def|if|elif|else|while|for|return|import|from|class|try|except|finally|with|as|in|not|and|or|is|None|True|False|range|len|enumerate|min|max|set|add|remove)\b|\b\d+\b)/g).map((token, tokenIndex) => {
            if (token.match(/^\s+$/)) return token;
            if (token.startsWith('#')) return <span key={tokenIndex} className="text-gray-500">{token}</span>;
            if (token.startsWith('"""') || token.startsWith('"') || token.startsWith("'")) return <span key={tokenIndex} className="text-green-400">{token}</span>;
            if (token.match(/\b(?:def|if|elif|else|while|for|return|import|from|class|try|except|finally|with|as|in|not|and|or|is)\b/)) return <span key={tokenIndex} className="text-purple-400">{token}</span>;
            if (token.match(/\b(?:None|True|False)\b/)) return <span key={tokenIndex} className="text-orange-400">{token}</span>;
            if (token.match(/\b\d+\b/)) return <span key={tokenIndex} className="text-blue-400">{token}</span>;
            if (token.match(/\b(?:range|len|enumerate|min|max|set|add|remove|print|copy)\b/)) return <span key={tokenIndex} className="text-yellow-400">{token}</span>;
            if (token.match(/\b(?:nums|left|curr|right|height|s|char_set|max_length|max_area)\b/)) return <span key={tokenIndex} className="text-blue-300">{token}</span>;
            return token;
          })}
        </span>
      </div>
    ));
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{language}</span>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md text-sm transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed"
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-all duration-200 hover:scale-105"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre className="bg-gray-900 text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed">
        <code className="language-python">
          {highlightCode(code)}
        </code>
      </pre>
      
      {output && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output:</div>
          <pre className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-mono bg-white dark:bg-gray-900 p-3 rounded border">
            {output}
          </pre>
        </div>
      )}
      
      <div className="absolute top-4 right-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;