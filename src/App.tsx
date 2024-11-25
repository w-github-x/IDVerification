import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { ResultPanel } from './components/ResultPanel';
import { validateIdCard, type ValidationResult } from './utils/idCardValidator';
import { exportToCSV } from './utils/exportUtils';

function App() {
  const [inputData, setInputData] = useState<string>('');
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const processData = useCallback((text: string) => {
    setIsProcessing(true);
    const lines = text.split('\n');
    const validationResults = lines.map(line => validateIdCard(line.trim()));
    setResults(validationResults);
    setIsProcessing(false);
  }, []);

  const handlePaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    setInputData(text);
    processData(text);
  };

  const handleInputChange = (text: string) => {
    setInputData(text);
    processData(text);
  };

  const clearAll = () => {
    setInputData('');
    setResults([]);
  };

  const handleDownload = () => {
    if (results.length > 0) {
      exportToCSV(results);
    }
  };

  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.filter(r => !r.isValid).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <Header
          totalCount={results.length}
          validCount={validCount}
          invalidCount={invalidCount}
          onDownload={handleDownload}
          onFilterChange={setFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputPanel
            inputData={inputData}
            onInputChange={handleInputChange}
            onPaste={handlePaste}
            onClear={clearAll}
          />
          <ResultPanel
            results={results}
            isProcessing={isProcessing}
            filter={filter}
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">使用说明</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">数据要求</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 支持从Excel直接复制粘贴数据</li>
                <li>• 每行数据仅处理一个身份证号</li>
                <li>• 自动识别18位数字和X的组合</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">验证规则</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 完整的省份地区代码验证</li>
                <li>• 严格的出生日期合法性检查</li>
                <li>• GB11643-1999标准校验码算法</li>
                <li>• 支持末位X/x大小写处理</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">功能特点</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 实时验证和错误提示</li>
                <li>• 支持筛选显示验证结果</li>
                <li>• 导出详细验证报告</li>
                <li>• 显示省份和出生日期信息</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;