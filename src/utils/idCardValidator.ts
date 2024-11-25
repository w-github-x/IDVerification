interface AreaCodes {
  [key: string]: string;
}

// 完整的省份代码列表
const areaCodes: AreaCodes = {
  '11': '北京市',
  '12': '天津市',
  '13': '河北省',
  '14': '山西省',
  '15': '内蒙古自治区',
  '21': '辽宁省',
  '22': '吉林省',
  '23': '黑龙江省',
  '31': '上海市',
  '32': '江苏省',
  '33': '浙江省',
  '34': '安徽省',
  '35': '福建省',
  '36': '江西省',
  '37': '山东省',
  '41': '河南省',
  '42': '湖北省',
  '43': '湖南省',
  '44': '广东省',
  '45': '广西壮族自治区',
  '46': '海南省',
  '50': '重庆市',
  '51': '四川省',
  '52': '贵州省',
  '53': '云南省',
  '54': '西藏自治区',
  '61': '陕西省',
  '62': '甘肃省',
  '63': '青海省',
  '64': '宁夏回族自治区',
  '65': '新疆维吾尔自治区',
  '71': '台湾省',
  '81': '香港特别行政区',
  '82': '澳门特别行政区',
};

export interface ValidationDetails {
  province: string;
  birthDate: string;
}

export interface ValidationResult {
  originalText: string;
  idCard: string;
  isValid: boolean;
  errorMessage?: string;
  details?: ValidationDetails;
}

// 提取身份证号码
function extractIdCard(text: string): string {
  const idCardPattern = /[0-9xX]{17,19}/;
  const matches = text.replace(/\s+/g, '').match(idCardPattern);
  return matches ? matches[0].toUpperCase() : '';
}

// 验证日期
function isValidDate(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    year >= 1900 &&
    year <= new Date().getFullYear()
  );
}

// 验证地区码
function isValidAreaCode(areaCode: string): boolean {
  return areaCodes.hasOwnProperty(areaCode.substring(0, 2));
}

// 获取地区名称
function getProvinceName(areaCode: string): string {
  return areaCodes[areaCode.substring(0, 2)] || '未知地区';
}

// 格式化出生日期
function formatBirthDate(idNumber: string): string {
  const year = idNumber.substring(6, 10);
  const month = idNumber.substring(10, 12);
  const day = idNumber.substring(12, 14);
  return `${year}年${month}月${day}日`;
}

// 计算校验码
function calculateVerificationCode(idNumber: string): string {
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const codes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idNumber[i]) * weights[i];
  }
  
  return codes[sum % 11];
}

export function validateIdCard(text: string): ValidationResult {
  const originalText = text;
  const idCard = extractIdCard(text);

  if (!idCard) {
    return {
      originalText,
      idCard: '',
      isValid: false,
      errorMessage: '未找到有效的身份证号码',
    };
  }

  // 长度验证
  if (idCard.length < 18) {
    return {
      originalText,
      idCard,
      isValid: false,
      errorMessage: '身份证号码位数不足（应为18位）',
    };
  }

  if (idCard.length > 18) {
    return {
      originalText,
      idCard,
      isValid: false,
      errorMessage: '身份证号码位数过多（应为18位）',
    };
  }

  // 地区码验证
  if (!isValidAreaCode(idCard)) {
    return {
      originalText,
      idCard,
      isValid: false,
      errorMessage: '无效的地区代码',
    };
  }

  // 出生日期验证
  const year = parseInt(idCard.substring(6, 10));
  const month = parseInt(idCard.substring(10, 12));
  const day = parseInt(idCard.substring(12, 14));

  if (!isValidDate(year, month, day)) {
    return {
      originalText,
      idCard,
      isValid: false,
      errorMessage: '无效的出生日期',
    };
  }

  // 校验码验证
  const verificationCode = calculateVerificationCode(idCard);
  if (verificationCode !== idCard[17]) {
    return {
      originalText,
      idCard,
      isValid: false,
      errorMessage: `校验码错误（正确校验码应为：${verificationCode}）`,
    };
  }

  return {
    originalText,
    idCard,
    isValid: true,
    details: {
      province: getProvinceName(idCard),
      birthDate: formatBirthDate(idCard),
    },
  };
}