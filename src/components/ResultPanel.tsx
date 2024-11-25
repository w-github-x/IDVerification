import React from 'react';
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import type { ValidationResult } from '../utils/idCardValidator';
import { areaCodeData } from '../utils/areaCodeData';

interface ResultPanelProps {
  results: ValidationResult[];
  isProcessing: boolean;
  filter: string;
}

export function ResultPanel({ results, isProcessing, filter }: ResultPanelProps) {
  const filteredResults = results.filter(result => {
    if (filter === 'valid') return result.isValid;
    if (filter === 'invalid') return !result.isValid;
    return true;
  });

  const getDetailedAreaInfo = (idCard: string) => {
    const areaCode = idCard.substring(0, 6);
    return areaCodeData[areaCode] || '未知地区';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">验证结果</h2>
        {isProcessing && (
          <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
        )}
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {filteredResults.map((result, index) => (
          <div
            key={index}
            className={`flex items-start p-4 rounded-lg ${
              result.isValid
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="w-8 text-xs text-gray-400 flex-shrink-0 select-none">
              {index + 1}
            </div>
            <div className="flex items-start flex-1">
              <div className="flex-shrink-0">
                {result.isValid ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 font-mono">
                    {result.idCard}
                  </p>
                  {!result.isValid && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                      无效
                    </span>
                  )}
                </div>
                {!result.isValid && (
                  <p className="mt-1 text-sm text-red-700">
                    {result.errorMessage}
                  </p>
                )}
                {result.idCard && (
                  <div className="mt-2 text-xs space-y-1">
                    <p className="text-gray-600">
                      地区: {result.details?.province} - {getDetailedAreaInfo(result.idCard)}
                    </p>
                    {result.details?.birthDate && (
                      <p className="text-gray-600">
                        出生日期: {result.details.birthDate}
                      </p>
                    )}
                    <p className="text-gray-500">
                      原始文本: {result.originalText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}