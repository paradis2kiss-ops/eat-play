import { useState } from 'react';
import { RecipeCard } from './RecipeCard';
import { RecipeModal } from './RecipeModal';
import type { Recipe } from '@/types';

interface RecipeGridProps {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  onToggleSave: (recipe: Recipe) => void;
  emptyMessage?: string;
}

/**
 * 레시피 그리드 컴포넌트
 */
export function RecipeGrid({
  recipes,
  savedRecipes,
  onToggleSave,
  emptyMessage = '레시피를 검색하거나 AI로 생성해보세요!',
}: RecipeGridProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const isSaved = (recipe: Recipe) =>
    savedRecipes.some((r) => r.name === recipe.name);

  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4 text-6xl">🍽️</div>
        <p className="text-zinc-600 dark:text-zinc-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe, idx) => (
          <RecipeCard
            key={`${recipe.name}-${idx}`}
            recipe={recipe}
            isSaved={isSaved(recipe)}
            onToggleSave={onToggleSave}
            onViewDetails={setSelectedRecipe}
          />
        ))}
      </div>

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </>
  );
}
