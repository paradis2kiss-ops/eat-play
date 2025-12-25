import { useState } from 'react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  onGenerateRecipe: (query: string) => void;
}

/**
 * 검색 섹션 컴포넌트
 */
export function SearchSection({ onSearch, onGenerateRecipe }: SearchSectionProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleGenerate = () => {
    if (query.trim()) {
      onGenerateRecipe(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="레시피나 식재료 검색 (예: 닭가슴살, 샐러드)"
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            aria-label="레시피 검색"
          />
        </div>
        
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="rounded-lg bg-gray-200 px-4 py-3 font-semibold text-zinc-700 transition-all hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
          aria-label="검색"
        >
          검색
        </button>

        <button
          onClick={handleGenerate}
          disabled={!query.trim()}
          className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 font-semibold text-white transition-all hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="AI 레시피 생성"
        >
          ✨ AI 생성
        </button>
      </div>

      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        검색: 기존 레시피 찾기 | AI 생성: 맞춤 레시피 새로 만들기
      </p>
    </div>
  );
}
