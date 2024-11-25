import type { ValidationResult } from './idCardValidator';

export function exportToCSV(results: ValidationResult[]): void {
  const headers = ['身份证号码', '验证结果', '错误信息', '省份', '出生日期', '原始文本'];
  const rows = results.map(result => [
    result.idCard,
    result.isValid ? '有效' : '无效',
    result.errorMessage || '',
    result.details?.province || '',
    result.details?.birthDate || '',
    result.originalText,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `身份证验证结果_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}