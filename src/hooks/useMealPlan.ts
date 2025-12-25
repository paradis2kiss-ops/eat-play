import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useAppContext } from '@/contexts/AppContext';
import { generateAiMealPlan } from '@/services/geminiService';
import type { AiMealPlan, ErrorState } from '@/types';

interface MealPlanContext {
  period: 'week' | 'month' | 'lunchbox';
  currentQuery: string;
  isMealPrep?: boolean;
}

/**
 * 식단표 관련 비즈니스 로직을 관리하는 커스텀 훅
 */
export function useMealPlan() {
  const { selectedDiseases, avoidance } = useAppContext();

  const [mealPlan, setMealPlan] = useState<AiMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({ hasError: false });
  const [mealPlanContext, setMealPlanContext] = useState<MealPlanContext | null>(null);

  /**
   * 선택된 질환 정보 문자열로 변환
   */
  const getSelectedDiseasesInfo = useCallback(() => {
    return selectedDiseases && selectedDiseases.length > 0
      ? selectedDiseases.map((d) => d.name).join('/')
      : '일반 건강식';
  }, [selectedDiseases]);

  /**
   * 식단표 생성
   */
  const generateMealPlan = useCallback(
    async (
      period: 'week' | 'month' | 'lunchbox',
      isMealPrep: boolean = false
    ) => {
      const diseaseName = getSelectedDiseasesInfo();

      setIsLoading(true);
      setError({ hasError: false });
      setMealPlan(null);

      const periodText =
        period === 'week'
          ? '1주일'
          : period === 'month'
          ? '1개월'
          : isMealPrep
          ? '밀프렙 도시락'
          : '도시락';

      const loadingToast = toast.loading(`${periodText} 식단표를 생성하는 중...`);

      // Context 저장 (월별 식단의 경우 추가 주 생성에 사용)
      if (period) {
        setMealPlanContext({ period, currentQuery: '', isMealPrep });
      }

      try {
        const context = {
          disease: diseaseName,
          avoidance: avoidance || '없음',
          query: '',
          period: period,
          weekOffset: 1,
          isMealPrep: period === 'lunchbox' ? isMealPrep : undefined,
        };

        const aiResult = await generateAiMealPlan(context);
        setMealPlan(aiResult);
        
        toast.success(`${periodText} 식단표가 생성되었습니다! 🎉`, {
          id: loadingToast,
        });
      } catch (err) {
        console.error('식단표 생성 오류:', err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : '식단표 생성 중 오류가 발생했습니다.';
        
        setError({ hasError: true, message: errorMessage });
        toast.error(errorMessage, { id: loadingToast });
      } finally {
        setIsLoading(false);
      }
    },
    [getSelectedDiseasesInfo, avoidance]
  );

  /**
   * 다음 주 식단 로드 (월별 식단용)
   */
  const loadNextWeek = useCallback(async () => {
    if (!mealPlanContext) {
      toast.error('식단 컨텍스트를 찾을 수 없습니다.');
      return;
    }

    const currentDays = mealPlan?.plan.length || 0;
    const nextWeekOffset = Math.floor(currentDays / 7) + 1;

    const diseaseName = getSelectedDiseasesInfo();

    setIsLoading(true);
    const loadingToast = toast.loading(`${nextWeekOffset}주차 식단을 생성하는 중...`);

    try {
      const context = {
        disease: diseaseName,
        avoidance: avoidance || '없음',
        query: mealPlanContext.currentQuery,
        period: mealPlanContext.period,
        weekOffset: nextWeekOffset,
        isMealPrep: mealPlanContext.isMealPrep,
      };

      const newWeekPlan = await generateAiMealPlan(context);

      // 기존 식단에 새 주 추가
      setMealPlan((prev) => {
        if (!prev) return newWeekPlan;
        return {
          ...prev,
          plan: [...prev.plan, ...newWeekPlan.plan],
        };
      });

      toast.success(`${nextWeekOffset}주차 식단이 추가되었습니다! 📅`, {
        id: loadingToast,
      });
    } catch (err) {
      console.error('다음 주 식단 로드 오류:', err);
      const errorMessage =
        err instanceof Error ? err.message : '추가 식단 로드 중 오류가 발생했습니다.';
      
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  }, [mealPlanContext, mealPlan, getSelectedDiseasesInfo, avoidance]);

  /**
   * 식단표 닫기
   */
  const clearMealPlan = useCallback(() => {
    setMealPlan(null);
    setMealPlanContext(null);
  }, []);

  return {
    // State
    mealPlan,
    isLoading,
    error,
    canLoadMore: mealPlanContext?.period === 'month' && (mealPlan?.plan.length || 0) < 28,
    
    // Actions
    generateMealPlan,
    loadNextWeek,
    clearMealPlan,
  };
}
