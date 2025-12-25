interface LoadingSpinnerProps {
  message?: string;
}

/**
 * 로딩 스피너 컴포넌트
 */
export function LoadingSpinner({ message = '로딩 중...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-500 dark:border-zinc-700 dark:border-t-green-400"></div>
      <p className="text-green-500 dark:text-green-400">{message}</p>
    </div>
  );
}
