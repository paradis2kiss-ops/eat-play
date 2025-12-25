import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from '@/contexts/AppContext';
import { useRecipes } from '@/hooks/useRecipes';
import { useMealPlan } from '@/hooks/useMealPlan';

// Components
import { Header } from '@/components/features/Header';
import { DiseaseSelector } from '@/components/features/DiseaseSelector';
import { SearchSection } from '@/components/features/SearchSection';
import { RecipeGrid } from '@/components/features/RecipeGrid';
import { RecipeModal } from '@/components/features/RecipeModal';
import { HealthTipCard } from '@/components/features/HealthTipCard';
import { LoadingSpinner } from '@/components/features/LoadingSpinner';

/**
 * 메인 애플리케이션 컴포넌트
 */
function App() {
  const { isDarkMode, selectedDiseases, viewMode, setViewMode } = useAppContext();

  const {
    filteredRecipes,
    generatedRecipes,
    isLoading: isRecipesLoading,
    savedRecipes,
    generateRecipes,
    searchRecipes,
    toggleSaveRecipe,
    clearGeneratedRecipes,
  } = useRecipes();

  const {
    mealPlan,
    isLoading: isMealPlanLoading,
    canLoadMore,
    generateMealPlan,
    loadNextWeek,
    clearMealPlan,
  } = useMealPlan();

  // UI States
  const [showWarning, setShowWarning] = useState(true);
  const [isHealthSectionVisible, setIsHealthSectionVisible] = useState(true);
  const [isMealPrep, setIsMealPrep] = useState(false);
  const [selectedMealPlanDay, setSelectedMealPlanDay] = useState<number | null>(null);

  // 로딩 상태
  const isLoading = isRecipesLoading || isMealPlanLoading;

  // 경고 화면
  if (showWarning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <div className="w-full max-w-md animate-fadeIn rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
          <div className="mb-6 flex justify-center">
            <span className="text-5xl">⚠️</span>
          </div>
          <h1 className="font-gaegu mb-4 text-2xl font-bold text-zinc-800 dark:text-white md:text-3xl">
            데모 버전 안내
          </h1>
          <div className="mb-8 space-y-4 text-left text-sm text-zinc-700 dark:text-zinc-300 md:text-base">
            <p className="mb-4 text-center">
              이 앱은 <strong>학습 및 시연용</strong>입니다.
            </p>
            <ul className="space-y-2 rounded-lg bg-gray-100 p-4 dark:bg-zinc-800">
              <li className="flex items-start gap-2">
                <span>❌</span>
                <span>실제 개인 건강정보를 입력하지 마세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span>❌</span>
                <span>실제 의료 조언으로 사용하지 마세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✅</span>
                <span>테스트 데이터만 사용해주세요</span>
              </li>
            </ul>
            <p className="pt-2 text-center text-xs text-zinc-500">
              * 프로덕션 환경에서는 백엔드 프록시 서버 필수
            </p>
          </div>
          <button
            onClick={() => setShowWarning(false)}
            className="w-full transform rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:from-green-600 hover:to-emerald-700"
          >
            이해했습니다 (시작하기)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-zinc-800 transition-colors duration-300 dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-300">
        <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-2xl shadow-gray-400/20 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/70 dark:shadow-black/50">
            <Header />

            <main className="p-4 sm:p-6 md:p-10">
              {/* 건강 상태 선택 */}
              <DiseaseSelector
                isVisible={isHealthSectionVisible}
                onToggleVisibility={() => setIsHealthSectionVisible((p) => !p)}
              />

              {/* 검색 섹션 */}
              {isHealthSectionVisible && (
                <SearchSection
                  onSearch={searchRecipes}
                  onGenerateRecipe={generateRecipes}
                />
              )}

              {/* 건강 팁 */}
              <HealthTipCard selectedDiseases={selectedDiseases} />

              {/* 식단표 생성 버튼들 */}
              <div className="mb-6 mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                <button
                  onClick={() => generateMealPlan('week')}
                  disabled={isLoading}
                  className="flex h-[52px] transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed sm:text-base"
                >
                  📅 1주일 식단
                </button>
                <button
                  onClick={() => generateMealPlan('month')}
                  disabled={isLoading}
                  className="flex h-[52px] transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed sm:text-base"
                >
                  🗓️ 1달 식단
                </button>

                {/* 도시락 버튼 with Meal Prep Toggle */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => generateMealPlan('lunchbox', isMealPrep)}
                    disabled={isLoading}
                    className="flex h-[52px] w-full transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed sm:text-base"
                  >
                    🍱 도시락 식단
                  </button>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-white/50 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-teal-300 dark:bg-black/20 dark:text-zinc-400 dark:hover:border-teal-700">
                    <input
                      type="checkbox"
                      checked={isMealPrep}
                      onChange={(e) => setIsMealPrep(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="whitespace-nowrap text-xs font-bold">
                      밀프렙 모드
                    </span>
                  </label>
                </div>

                <button
                  onClick={() => alert('식단 일기 기능은 곧 추가될 예정입니다!')}
                  className="flex h-[52px] transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 sm:text-base"
                >
                  📝 식단 일기
                </button>
              </div>

              {/* View Mode Tabs */}
              <div className="mb-4 mt-8 flex gap-6 border-b border-gray-200 dark:border-zinc-700">
                <button
                  onClick={() => setViewMode('search')}
                  className={`border-b-2 px-2 pb-4 text-lg font-bold transition-all duration-300 ${
                    viewMode === 'search'
                      ? 'border-green-500 text-green-500'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  aria-pressed={viewMode === 'search'}
                >
                  🔍 검색
                </button>
                <button
                  onClick={() => setViewMode('saved')}
                  className={`border-b-2 px-2 pb-4 text-lg font-bold transition-all duration-300 ${
                    viewMode === 'saved'
                      ? 'border-red-500 text-red-500'
                      : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  aria-pressed={viewMode === 'saved'}
                >
                  ❤️ 저장{' '}
                  <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-sm dark:bg-zinc-800">
                    {savedRecipes.length}
                  </span>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="min-h-[300px]">
                {isLoading ? (
                  <LoadingSpinner message="AI가 맞춤 정보를 생성하는 중..." />
                ) : mealPlan ? (
                  <div>
                    <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-zinc-900">
                      <h2 className="mb-4 text-2xl font-bold text-green-500 dark:text-green-400">
                        {mealPlan.title}
                      </h2>
                      <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                        {mealPlan.reason}
                      </p>
                      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
                        {mealPlan.plan.map((day, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              setSelectedMealPlanDay(
                                selectedMealPlanDay === idx ? null : idx
                              )
                            }
                            className={`rounded-xl border-2 bg-white p-4 shadow-sm transition-all hover:border-green-400 dark:bg-zinc-800 ${
                              selectedMealPlanDay === idx
                                ? 'border-green-500 ring-2 ring-green-200 dark:ring-green-800'
                                : 'border-gray-200 dark:border-zinc-700'
                            }`}
                          >
                            <div className="mb-2 text-center text-2xl">{day.icon}</div>
                            <div className="text-center text-sm font-bold">
                              {day.day}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* 선택된 날의 식단 상세 */}
                      {selectedMealPlanDay !== null && (
                        <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-zinc-800">
                          <h3 className="mb-3 font-bold text-zinc-800 dark:text-zinc-200">
                            {mealPlan.plan[selectedMealPlanDay].day} 식단
                          </h3>
                          <div className="space-y-3">
                            {mealPlan.plan[selectedMealPlanDay].meals.map(
                              (meal, idx) => (
                                <div
                                  key={idx}
                                  className="rounded-lg bg-white p-3 dark:bg-zinc-900"
                                >
                                  <div className="mb-1 font-semibold text-green-600 dark:text-green-400">
                                    {meal.time}
                                  </div>
                                  <div className="text-sm text-zinc-800 dark:text-zinc-200">
                                    {meal.menu}
                                  </div>
                                  <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                    {meal.note}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 flex gap-3">
                        {canLoadMore && (
                          <button
                            onClick={loadNextWeek}
                            disabled={isLoading}
                            className="flex-1 rounded-lg bg-green-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600 disabled:opacity-50"
                          >
                            다음 주 추가
                          </button>
                        )}
                        <button
                          onClick={clearMealPlan}
                          className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-semibold text-zinc-700 transition-colors hover:bg-gray-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  </div>
                ) : generatedRecipes && generatedRecipes.length > 0 ? (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-bold">
                        ✨ AI가 생성한 {generatedRecipes.length}개의 레시피
                      </h2>
                      <button
                        onClick={clearGeneratedRecipes}
                        className="rounded-lg border border-gray-300 bg-gray-200 px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-gray-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                      >
                        닫기
                      </button>
                    </div>
                    <RecipeGrid
                      recipes={generatedRecipes.map((r) => ({
                        name: r.name,
                        icon: r.icon || '🍽️',
                        tags: [],
                        description: r.modifiedDescription || r.reason,
                        ingredients: r.modifiedIngredients,
                        calories: r.calories || 0,
                        protein: r.protein || 0,
                        carbs: r.carbs || 0,
                        fat: r.fat || 0,
                        steps: r.instructions,
                        aiReason: r.reason,
                      }))}
                      savedRecipes={savedRecipes}
                      onToggleSave={toggleSaveRecipe}
                    />
                  </div>
                ) : (
                  <RecipeGrid
                    recipes={viewMode === 'search' ? filteredRecipes : savedRecipes}
                    savedRecipes={savedRecipes}
                    onToggleSave={toggleSaveRecipe}
                    emptyMessage={
                      viewMode === 'search'
                        ? '레시피를 검색하거나 AI로 생성해보세요!'
                        : '저장된 레시피가 없습니다. ❤️ 버튼을 눌러 저장해보세요!'
                    }
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#27272a' : '#fff',
            color: isDarkMode ? '#fafafa' : '#18181b',
          },
        }}
      />
    </div>
  );
}

export default App;
