import React from 'react';
import { ClipboardPaste, Trash2 } from 'lucide-react';

interface InputPanelProps {
  inputData: string;
  onInputChange: (text: string) => void;
  onPaste: (e: React.ClipboardEvent) => void;
  onClear: () => void;
}

export function InputPanel({ inputData, onInputChange, onPaste, onClear }: InputPanelProps) {
  const lines = inputData.split('\n');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">数据输入</h2>
        <button
          onClick={onClear}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          清除
        </button>
      </div>
      
      <div
        onPaste={onPaste}
        className="relative min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg"
      >
        {!inputData && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <ClipboardPaste className="w-8 h-8 mx-auto mb-2" />
              <p>从Excel复制数据后粘贴到此处</p>
              <p className="text-sm mt-2">支持批量验证，每行一个身份证号</p>
            </div>
          </div>
        )}
        <div className="flex">
          <div className="p-4 bg-gray-50 border-r-2 border-gray-100 text-right select-none">
            {lines.map((_, i) => (
              <div key={i} className="text-xs text-gray-400 leading-6">
                {i + 1}
              </div>
            ))}
            {!inputData && <div className="text-xs text-gray-400 leading-6">1</div>}
          </div>
          <textarea
            value={inputData}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1 p-4 resize-none focus:outline-none font-mono text-gray-900 bg-transparent leading-6"
            style={{ minHeight: '400px' }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}