import { useAppContext } from '@/contexts/AppContext';

/**
 * 앱 헤더 컴포넌트
 * - 다크모드 토글
 * - 타이틀
 */
export function Header() {
  const { isDarkMode, setIsDarkMode } = useAppContext();

  return (
    <header className="border-b border-gray-200 bg-gradient-to-r from-green-500 to-teal-600 p-4 dark:border-zinc-800 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl sm:text-4xl">🍽️</div>
          <div>
            <h1 className="font-gaegu text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              잇 플레이 (Eat Play)
            </h1>
            <p className="text-xs text-white/80 sm:text-sm">
              AI 맞춤형 건강 식단 추천
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-full bg-white/20 p-3 text-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30"
          aria-label={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </header>
  );
}
