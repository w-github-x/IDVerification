import React from 'react';
import { FileDown, Filter } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  validCount: number;
  invalidCount: number;
  onDownload: () => void;
  onFilterChange: (filter: string) => void;
}

export function Header({ totalCount, validCount, invalidCount, onDownload, onFilterChange }: HeaderProps) {
  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">身份证号码批量验证系统</h1>
        <p className="text-gray-600">支持Excel数据粘贴，自动识别并验证身份证号码</p>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-600">总数: </span>
            <span className="font-semibold text-gray-900">{totalCount}</span>
          </div>
          <div className="px-4 py-2 bg-green-50 rounded-md">
            <span className="text-sm text-green-600">有效: </span>
            <span className="font-semibold text-green-900">{validCount}</span>
          </div>
          <div className="px-4 py-2 bg-red-50 rounded-md">
            <span className="text-sm text-red-600">无效: </span>
            <span className="font-semibold text-red-900">{invalidCount}</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <select
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">显示全部</option>
            <option value="valid">仅显示有效</option>
            <option value="invalid">仅显示无效</option>
          </select>
          
          <button
            onClick={onDownload}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FileDown className="w-4 h-4 mr-2" />
            导出结果
          </button>
        </div>
      </div>
    </div>
  );
}