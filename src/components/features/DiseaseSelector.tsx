import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { DISEASE_CATEGORIES } from '@/data/constants';
import type { Disease, DiseaseSelection } from '@/types';

interface DiseaseSelectorProps {
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

/**
 * 질환 선택 컴포넌트
 * - Context API로 전역 상태 관리
 */
export function DiseaseSelector({ isVisible, onToggleVisibility }: DiseaseSelectorProps) {
  const { selectedDiseases, setSelectedDiseases, avoidance, setAvoidance } =
    useAppContext();

  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(null);

  const isSelected = (key: string) => selectedDiseases.some((d) => d.key === key);

  const handleToggleSelect = (selection: DiseaseSelection) => {
    setSelectedDiseases((prev) => {
      const exists = prev.some((d) => d.key === selection.key);
      if (exists) {
        return prev.filter((d) => d.key !== selection.key);
      } else {
        return [...prev, selection];
      }
    });
  };

  const handleReset = () => {
    setSelectedDiseases([]);
    setAvoidance('');
  };

  const handleGeneralSelect = () => {
    setSelectedDiseases([{ key: 'general', name: '일반 건강식' }]);
  };

  const handleDiseaseClick = (disease: Disease) => {
    if (disease.subOptions) {
      setExpandedDiseaseId((prev) => (prev === disease.id ? null : disease.id));
    } else {
      handleToggleSelect({ key: disease.id, name: disease.name });
    }
  };

  const handleSubOptionClick = (
    disease: Disease,
    subOption: { id: string; name: string }
  ) => {
    handleToggleSelect({
      key: `${disease.id}-${subOption.id}`,
      name: `${disease.name} (${subOption.name})`,
    });
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-black/50">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={onToggleVisibility}
        role="button"
        aria-expanded={isVisible}
        aria-controls="health-condition-content"
      >
        <h2 className="flex items-center gap-3 text-xl font-semibold">
          <span className="text-green-400">👩🏻‍⚕️</span>
          나의 건강 상태 (선택)
        </h2>
        <ChevronIcon
          className={`transform text-zinc-500 transition-transform duration-300 dark:text-zinc-400 ${
            isVisible ? '' : 'rotate-180'
          }`}
        />
      </div>

      {isVisible && (
        <div id="health-condition-content" className="mt-5 animate-fadeIn">
          <div className="mb-4 flex justify-end space-x-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 text-xs font-medium text-zinc-800 transition-colors hover:bg-gray-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
              title="선택 초기화"
              aria-label="선택 초기화"
            >
              ↻
            </button>
            <button
              onClick={handleGeneralSelect}
              className="rounded-lg bg-green-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
              aria-label="일반 건강식 선택"
            >
              일반 건강식
            </button>
          </div>

          {/* 선택된 질환 표시 */}
          {selectedDiseases.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              {selectedDiseases.map((disease) => (
                <span
                  key={disease.key}
                  className="inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white"
                >
                  {disease.name}
                  <button
                    onClick={() => handleToggleSelect(disease)}
                    className="ml-1 hover:text-green-200"
                    aria-label={`${disease.name} 제거`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* 질환 카테고리 */}
          <div className="space-y-4">
            {DISEASE_CATEGORIES.map((category) => (
              <div key={category.name}>
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  <span>{category.icon}</span>
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {category.diseases.map((disease) => (
                    <div key={disease.id}>
                      <button
                        onClick={() => handleDiseaseClick(disease)}
                        className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all ${
                          isSelected(disease.id)
                            ? 'border-green-500 bg-green-500 text-white dark:border-green-600 dark:bg-green-600'
                            : 'border-gray-300 bg-white text-zinc-700 hover:border-green-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-green-600'
                        }`}
                        aria-pressed={isSelected(disease.id)}
                      >
                        <span className="mr-2">{disease.icon}</span>
                        {disease.name}
                        {disease.subOptions && (
                          <span className="ml-1 text-xs opacity-70">▼</span>
                        )}
                      </button>

                      {/* 서브 옵션 */}
                      {disease.subOptions &&
                        expandedDiseaseId === disease.id && (
                          <div className="mt-2 space-y-1 pl-4">
                            {disease.subOptions.map((subOption) => {
                              const subKey = `${disease.id}-${subOption.id}`;
                              return (
                                <button
                                  key={subKey}
                                  onClick={() =>
                                    handleSubOptionClick(disease, subOption)
                                  }
                                  className={`w-full rounded-md border px-2 py-1 text-left text-xs transition-all ${
                                    isSelected(subKey)
                                      ? 'border-green-500 bg-green-500 text-white'
                                      : 'border-gray-200 bg-white text-zinc-600 hover:border-green-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                                  }`}
                                  aria-pressed={isSelected(subKey)}
                                >
                                  {subOption.name}
                                </button>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 기피 식품 입력 */}
          <div className="mt-6">
            <label
              htmlFor="avoidance-input"
              className="mb-2 block text-sm font-bold text-zinc-700 dark:text-zinc-300"
            >
              🚫 알레르기/기피 식품 (선택)
            </label>
            <input
              id="avoidance-input"
              type="text"
              value={avoidance}
              onChange={(e) => setAvoidance(e.target.value)}
              placeholder="예: 땅콩, 우유, 새우 등"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-zinc-800 transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:focus:border-green-600"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              쉼표(,)로 구분하여 여러 개 입력 가능
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
