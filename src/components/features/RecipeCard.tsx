import type { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
  onViewDetails: (recipe: Recipe) => void;
}

/**
 * 레시피 카드 컴포넌트
 */
export function RecipeCard({
  recipe,
  isSaved,
  onToggleSave,
  onViewDetails,
}: RecipeCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* 저장 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSave(recipe);
        }}
        className={`absolute right-3 top-3 z-10 rounded-full p-2 text-2xl transition-transform hover:scale-110 ${
          isSaved
            ? 'bg-red-100 dark:bg-red-900/30'
            : 'bg-gray-100 dark:bg-zinc-800'
        }`}
        aria-label={isSaved ? '저장 취소' : '저장하기'}
      >
        {isSaved ? '❤️' : '🤍'}
      </button>

      {/* 레시피 아이콘 */}
      <div className="mb-3 text-center text-5xl">{recipe.icon}</div>

      {/* 레시피 이름 */}
      <h3 className="mb-2 text-center text-lg font-bold text-zinc-800 dark:text-zinc-200">
        {recipe.name}
      </h3>

      {/* 태그 */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap justify-center gap-1">
          {recipe.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 영양 정보 */}
      <div className="mb-3 grid grid-cols-4 gap-2 text-center text-xs">
        <div>
          <div className="font-semibold text-zinc-600 dark:text-zinc-400">칼로리</div>
          <div className="text-zinc-800 dark:text-zinc-200">{recipe.calories}</div>
        </div>
        <div>
          <div className="font-semibold text-zinc-600 dark:text-zinc-400">단백질</div>
          <div className="text-zinc-800 dark:text-zinc-200">{recipe.protein}g</div>
        </div>
        <div>
          <div className="font-semibold text-zinc-600 dark:text-zinc-400">탄수화물</div>
          <div className="text-zinc-800 dark:text-zinc-200">{recipe.carbs}g</div>
        </div>
        <div>
          <div className="font-semibold text-zinc-600 dark:text-zinc-400">지방</div>
          <div className="text-zinc-800 dark:text-zinc-200">{recipe.fat}g</div>
        </div>
      </div>

      {/* 설명 */}
      <p className="mb-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {recipe.description}
      </p>

      {/* 상세보기 버튼 */}
      <button
        onClick={() => onViewDetails(recipe)}
        className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 py-2 text-sm font-semibold text-white transition-all hover:from-green-600 hover:to-emerald-700"
        aria-label={`${recipe.name} 상세보기`}
      >
        상세보기
      </button>
    </div>
  );
}
