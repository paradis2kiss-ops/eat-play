import type { DiseaseSelection } from '@/types';

interface HealthTipCardProps {
  selectedDiseases: DiseaseSelection[];
}

const HEALTH_TIPS: Record<string, string[]> = {
  diabetes: [
    '혈당 지수가 낮은 음식을 선택하세요',
    '식사 시간을 규칙적으로 유지하세요',
    '단순 당류 섭취를 줄이세요',
  ],
  'blood-pressure-high': [
    '나트륨 섭취를 하루 2,000mg 이하로 제한하세요',
    '칼륨이 풍부한 채소와 과일을 섭취하세요',
    '규칙적인 운동을 병행하세요',
  ],
  kidney: [
    '단백질 섭취량을 적절히 조절하세요',
    '칼륨과 인 함량이 높은 음식을 제한하세요',
    '충분한 수분 섭취를 유지하세요',
  ],
  general: [
    '균형 잡힌 식사를 하세요',
    '신선한 채소와 과일을 충분히 섭취하세요',
    '규칙적인 운동과 충분한 수면을 취하세요',
  ],
};

/**
 * 건강 팁 카드 컴포넌트
 */
export function HealthTipCard({ selectedDiseases }: HealthTipCardProps) {
  if (selectedDiseases.length === 0) return null;

  // 선택된 첫 번째 질환의 팁 가져오기
  const firstDisease = selectedDiseases[0];
  const tips = HEALTH_TIPS[firstDisease.key] || HEALTH_TIPS.general;

  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:border-blue-900 dark:from-blue-900/20 dark:to-blue-800/10">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-blue-800 dark:text-blue-400">
        <span>💡</span>
        {firstDisease.name} 건강 팁
      </h3>
      <ul className="space-y-2">
        {tips.map((tip, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300"
          >
            <span className="mt-0.5 text-blue-500">✓</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
