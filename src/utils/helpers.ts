import clsx, { ClassValue } from 'clsx';

/**
 * 조건부 클래스명을 결합하는 유틸리티
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function getTodayDate(): string {
  return formatDate(new Date());
}

/**
 * 숫자를 천 단위로 콤마 포맷
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * 에러 객체에서 메시지 추출
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return '알 수 없는 오류가 발생했습니다.';
}
