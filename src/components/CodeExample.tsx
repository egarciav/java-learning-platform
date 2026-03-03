import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeExampleProps {
  title: string;
  description: string;
  code: string;
  explanation: string;
  language?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ 
  title, 
  description, 
  code, 
  explanation, 
  language = 'java' 
}) => {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [isExplanationExpanded, setIsExplanationExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Code Section */}
        <div className="mb-4">
          <button
            onClick={() => setIsCodeExpanded(!isCodeExpanded)}
            className="flex items-center justify-between w-full text-left bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all rounded-lg p-3 border border-gray-200"
          >
            <div className="flex items-center gap-2">
              <svg 
                className="w-5 h-5 text-indigo-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="font-medium text-gray-800">Ver Código</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transform transition-transform ${isCodeExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isCodeExpanded && (
            <div className="mt-3 relative">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={handleCopy}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copiado
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  margin: 0,
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          )}
        </div>

        {/* Explanation Section */}
        <div>
          <button
            onClick={() => setIsExplanationExpanded(!isExplanationExpanded)}
            className="flex items-center justify-between w-full text-left bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all rounded-lg p-3 border border-blue-200"
          >
            <div className="flex items-center gap-2">
              <svg 
                className="w-5 h-5 text-blue-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-blue-800">Ver Explicación</span>
            </div>
            <svg
              className={`w-5 h-5 text-blue-600 transform transition-transform ${isExplanationExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExplanationExpanded && (
            <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <p className="text-gray-700 leading-relaxed">{explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeExample;
