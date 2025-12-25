import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { ReactNode } from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

/**
 * 에러 발생 시 보여줄 Fallback UI
 */
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const isApiKeyError = error.message.includes('API') || error.message.includes('키');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 border border-red-200 dark:border-red-800">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {isApiKeyError ? '🔑' : '😵'}
          </div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            {isApiKeyError ? 'API 키 오류' : '앗! 문제가 발생했습니다'}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {isApiKeyError 
              ? '잇 플레이를 사용하려면 API 키가 필요합니다.'
              : '예상치 못한 오류가 발생했습니다.'}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <h2 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
            <span>⚠️</span>
            오류 상세 내용
          </h2>
          <pre className="text-sm text-red-700 dark:text-red-400 whitespace-pre-wrap font-mono bg-white dark:bg-zinc-800 p-3 rounded overflow-auto max-h-40">
            {error.message}
          </pre>
        </div>

        {isApiKeyError && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
              <span>💡</span>
              해결 방법
            </h3>
            <ol className="text-sm text-blue-900 dark:text-blue-200 space-y-2 list-decimal list-inside">
              <li>
                <a 
                  href="https://makersuite.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600"
                >
                  Google AI Studio
                </a>
                에서 무료 API 키를 발급받으세요
              </li>
              <li>프로젝트 루트에 <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env</code> 파일을 생성하세요</li>
              <li>다음 내용을 추가하세요: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">VITE_GEMINI_API_KEY=your_api_key</code></li>
              <li>개발 서버를 재시작하세요 (<code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">npm run dev</code>)</li>
            </ol>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={resetErrorBoundary}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 다시 시도
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg"
          >
            🔃 페이지 새로고침
          </button>
        </div>

        {!isApiKeyError && (
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              문제가 계속되면 개발자 콘솔(F12)에서 자세한 정보를 확인하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * 전역 에러 바운더리
 */
export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const handleError = (error: Error, info: { componentStack: string }) => {
    console.error('🚨 Error Boundary caught an error:', error);
    console.error('📚 Component Stack:', info.componentStack);
    
    // 여기에 에러 로깅 서비스 연동 가능 (Sentry 등)
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // 에러 복구 시 필요한 정리 작업
        window.location.href = '/';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
