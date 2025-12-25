import type { Recipe, ModifiedRecipe } from '@/types';

interface RecipeModalProps {
  recipe: Recipe | ModifiedRecipe | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 레시피 상세 모달
 */
export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  if (!isOpen || !recipe) return null;

  const isModified = 'modifiedIngredients' in recipe;
  const ingredients = isModified
    ? recipe.modifiedIngredients
    : (recipe as Recipe).ingredients;
  const steps = isModified ? recipe.instructions : (recipe as Recipe).steps;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {recipe.icon && <span className="text-4xl">{recipe.icon}</span>}
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
              {recipe.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-2xl hover:bg-gray-100 dark:hover:bg-zinc-800"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* AI 생성 이유 */}
        {isModified && recipe.reason && (
          <div className="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 className="mb-2 font-semibold text-blue-800 dark:text-blue-400">
              💡 AI 추천 이유
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">{recipe.reason}</p>
          </div>
        )}

        {/* 영양 정보 */}
        <div className="mb-4 grid grid-cols-4 gap-3 rounded-lg bg-gray-50 p-4 dark:bg-zinc-800">
          <div className="text-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">칼로리</div>
            <div className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {recipe.calories}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">단백질</div>
            <div className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {recipe.protein}g
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">탄수화물</div>
            <div className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {recipe.carbs}g
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">지방</div>
            <div className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              {recipe.fat}g
            </div>
          </div>
        </div>

        {/* 재료 */}
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
            🥘 재료
          </h3>
          <ul className="space-y-1">
            {ingredients.map((ingredient, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span className="mt-1 text-green-500">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 조리 방법 */}
        {steps && steps.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
              👨‍🍳 조리 방법
            </h3>
            <ol className="space-y-2">
              {steps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full rounded-lg bg-gray-200 py-3 font-semibold text-zinc-700 transition-colors hover:bg-gray-300 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
