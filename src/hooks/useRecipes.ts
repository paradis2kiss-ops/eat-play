import { useState, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useAppContext } from '@/contexts/AppContext';
import { generateAiRecipes } from '@/services/geminiService';
import { RECIPE_DATABASE } from '@/data/constants';
import type { Recipe, ModifiedRecipe, ErrorState } from '@/types';

/**
 * 레시피 관련 비즈니스 로직을 관리하는 커스텀 훅
 */
export function useRecipes() {
  const {
    selectedDiseases,
    avoidance,
    savedRecipes,
    setSavedRecipes,
  } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [generatedRecipes, setGeneratedRecipes] = useState<ModifiedRecipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({ hasError: false });

  /**
   * 선택된 질환 정보 문자열로 변환
   */
  const getSelectedDiseasesInfo = useCallback(() => {
    return selectedDiseases && selectedDiseases.length > 0
      ? selectedDiseases.map((d) => d.name).join('/')
      : '일반 건강식';
  }, [selectedDiseases]);

  /**
   * 데이터베이스에서 레시피 필터링
   */
  const filteredRecipes = useMemo(() => {
    if (generatedRecipes) return [];

    if (selectedDiseases.length === 0 && !searchQuery) {
      return [];
    }

    const allRecipes = Object.values(RECIPE_DATABASE).flat();
    let filtered: Recipe[] = [];

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = allRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(lowercasedQuery) ||
          recipe.description.toLowerCase().includes(lowercasedQuery) ||
          recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(lowercasedQuery)
          )
      );
    } else if (selectedDiseases.length > 0) {
      const selectedRecipes = new Map<string, Recipe>();
      selectedDiseases.forEach((disease) => {
        const recipesForDisease = RECIPE_DATABASE[disease.key] || [];
        recipesForDisease.forEach((recipe) => {
          if (!selectedRecipes.has(recipe.name)) {
            selectedRecipes.set(recipe.name, recipe);
          }
        });
      });
      filtered = Array.from(selectedRecipes.values());
    }

    return filtered;
  }, [selectedDiseases, searchQuery, generatedRecipes]);

  /**
   * AI 레시피 생성
   */
  const generateRecipes = useCallback(
    async (query: string) => {
      if (!query) {
        toast.error('레시피를 생성하려면 검색어를 입력해주세요.');
        return;
      }

      const diseaseName = getSelectedDiseasesInfo();

      setIsLoading(true);
      setError({ hasError: false });
      setGeneratedRecipes(null);
      setSearchQuery(query);

      const loadingToast = toast.loading(`'${query}' 레시피를 생성하는 중...`);

      try {
        const context = {
          disease: diseaseName,
          avoidance: avoidance || '없음',
          query: query,
        };

        const aiResult = await generateAiRecipes(context);
        setGeneratedRecipes(aiResult);
        
        toast.success(`${aiResult.length}개의 레시피가 생성되었습니다! 🎉`, {
          id: loadingToast,
        });
      } catch (err) {
        console.error('레시피 생성 오류:', err);
        const errorMessage =
          err instanceof Error ? err.message : '레시피 생성 중 오류가 발생했습니다.';
        
        setError({ hasError: true, message: errorMessage });
        toast.error(errorMessage, { id: loadingToast });
      } finally {
        setIsLoading(false);
      }
    },
    [getSelectedDiseasesInfo, avoidance]
  );

  /**
   * 검색 쿼리 업데이트
   */
  const searchRecipes = useCallback((query: string) => {
    setSearchQuery(query);
    setGeneratedRecipes(null);
  }, []);

  /**
   * 레시피 저장/삭제 토글
   */
  const toggleSaveRecipe = useCallback(
    (recipe: Recipe) => {
      setSavedRecipes((prev) => {
        const isSaved = prev.some((r) => r.name === recipe.name);
        
        if (isSaved) {
          toast.success('레시피 저장을 취소했습니다.');
          return prev.filter((r) => r.name !== recipe.name);
        } else {
          toast.success('레시피를 저장했습니다! ❤️');
          return [...prev, recipe];
        }
      });
    },
    [setSavedRecipes]
  );

  /**
   * 레시피 태그 업데이트
   */
  const updateRecipeTags = useCallback(
    (recipe: Recipe, newTags: string[]) => {
      setSavedRecipes((prev) =>
        prev.map((r) =>
          r.name === recipe.name ? { ...r, userTags: newTags } : r
        )
      );
      toast.success('태그가 업데이트되었습니다! 🏷️');
    },
    [setSavedRecipes]
  );

  /**
   * 생성된 레시피 닫기
   */
  const clearGeneratedRecipes = useCallback(() => {
    setGeneratedRecipes(null);
    setSearchQuery('');
  }, []);

  return {
    // State
    searchQuery,
    filteredRecipes,
    generatedRecipes,
    isLoading,
    error,
    savedRecipes,
    
    // Actions
    generateRecipes,
    searchRecipes,
    toggleSaveRecipe,
    updateRecipeTags,
    clearGeneratedRecipes,
    setSearchQuery,
  };
}
