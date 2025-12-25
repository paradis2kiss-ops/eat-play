import { GoogleGenAI, Type } from "@google/genai";
import { envValidator } from '@/utils/env';
import type { Recipe, ModifiedRecipe, AiMealPlan, AiRequestContext } from '@/types';

/**
 * Gemini AI 서비스
 * API 호출을 관리하고 에러 처리를 담당
 */
class GeminiService {
  private ai: GoogleGenAI | null = null;
  private readonly model = "gemini-2.0-flash-exp";
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // ms

  /**
   * AI 인스턴스 초기화 (Lazy)
   */
  private getAiInstance(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = envValidator.getApiKey();
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  /**
   * 재시도 로직이 포함된 API 호출
   */
  private async withRetry<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        console.warn(
          `⚠️ ${operationName} 실패 (시도 ${attempt}/${this.maxRetries}):`,
          error
        );

        // 마지막 시도가 아니면 재시도
        if (attempt < this.maxRetries) {
          await this.delay(this.retryDelay * attempt);
        }
      }
    }

    throw new Error(
      `${operationName} ${this.maxRetries}번 시도 후 실패: ${lastError?.message}`
    );
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * JSON 응답 파싱 (에러 처리 포함)
   */
  private parseJsonResponse<T>(jsonText: string, operationName: string): T {
    try {
      const parsed = JSON.parse(jsonText);
      return parsed;
    } catch (error) {
      console.error(`❌ ${operationName} JSON 파싱 오류:`, error);
      console.error('받은 응답:', jsonText);
      throw new Error(
        `AI 응답을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.`
      );
    }
  }

  /**
   * 레시피 재료 수정 제안
   */
  async getIngredientModification(
    diseaseName: string,
    recipe: Recipe
  ): Promise<ModifiedRecipe> {
    const operation = async () => {
      const ai = this.getAiInstance();
      
      const prompt = `
        You are a clinical nutritionist and health expert.
        Your task is to modify a recipe for a user with a specific health condition: "${diseaseName}".

        Here is the original recipe:
        - Name: ${recipe.name}
        - Ingredients: ${recipe.ingredients.join(', ')}
        - Description: ${recipe.description}

        Please modify the ingredients to make it healthier and more suitable for someone with "${diseaseName}".
        For example, for Kidney Disease, you should suggest reducing sodium (salt, mayonnaise) and potassium (some vegetables).
        Explain the nutritional and medical reasons for your changes in Korean.

        Your response MUST be a valid JSON object in the specified format, enclosed in a single-element array.
      `;

      const response = await ai.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                modifiedIngredients: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                modifiedDescription: { type: Type.STRING },
                reason: { type: Type.STRING },
              },
              required: ["name", "modifiedIngredients", "reason"],
            },
          },
        },
      });

      const result = this.parseJsonResponse<ModifiedRecipe[]>(
        response.text.trim(),
        '재료 수정'
      );

      if (Array.isArray(result) && result.length > 0) {
        return result[0];
      }

      throw new Error("AI 응답이 비어있습니다.");
    };

    return this.withRetry(operation, '재료 수정 제안');
  }

  /**
   * AI 레시피 생성
   */
  async generateRecipes(context: AiRequestContext): Promise<ModifiedRecipe[]> {
    const operation = async () => {
      const ai = this.getAiInstance();

      const systemInstruction = `당신은 사용자의 '검색 의도'와 '건강 조건'을 최우선으로 존중하는 레시피 생성 및 재료 대체 전문가입니다.`;

      const userPrompt = `#### [실제 요청 데이터]

현재 사용자의 건강 상태, 알레르기/기피 식품, 그리고 레시피 검색 요청은 다음과 같습니다.

* **1. 사용자 건강 상태:** ${context.disease}
* **2. 알레르기/기피 식품:** ${context.avoidance}
* **3. 음식 검색어:** ${context.query}

#### [최종 요청 사항]

**검색어(${context.query})**에 대한 **최소 5가지 버전의 레시피**를 생성해 주세요.

**🚨 [필수 제약 조건]:**
1.  **반드시 검색어(${context.query})와 관련된 음식**이어야 합니다.
2.  **알레르기/기피 식품(${context.avoidance})**은 **어떤 형태로든 레시피에 포함되어서는 안 됩니다.**
3.  생성된 모든 레시피는 질환/건강 유형(${context.disease})에 맞게 재료가 수정되어야 합니다.
4.  각 레시피의 예상 영양 성분을 최대한 상세하게(미량 영양소 포함) 추정하여 제공해주세요.
5.  **모든 재료는 1인분 기준으로 정확한 계량 단위(g, ml, 개 등)를 명시해야 합니다.**
6.  **각 레시피의 주재료에 맞는 이모지(icon)**를 선정해주세요.

Your response MUST be a valid JSON array containing at least 5 recipe objects.`;

      const response = await ai.models.generateContent({
        model: this.model,
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                icon: { type: Type.STRING },
                modifiedIngredients: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                instructions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                modifiedDescription: { type: Type.STRING },
                reason: { type: Type.STRING },
                calories: { type: Type.INTEGER },
                protein: { type: Type.INTEGER },
                carbs: { type: Type.INTEGER },
                fat: { type: Type.INTEGER },
                fiber: { type: Type.NUMBER },
                sugar: { type: Type.NUMBER },
                sodium: { type: Type.INTEGER },
                potassium: { type: Type.INTEGER },
                cholesterol: { type: Type.INTEGER },
                calcium: { type: Type.INTEGER },
                iron: { type: Type.NUMBER },
                magnesium: { type: Type.INTEGER },
                phosphorus: { type: Type.INTEGER },
              },
              required: [
                "name",
                "icon",
                "modifiedIngredients",
                "instructions",
                "reason",
                "calories",
                "protein",
                "carbs",
                "fat",
              ],
            },
          },
        },
      });

      const result = this.parseJsonResponse<ModifiedRecipe[]>(
        response.text.trim(),
        '레시피 생성'
      );

      if (Array.isArray(result) && result.length > 0) {
        return result;
      }

      throw new Error("생성된 레시피가 없습니다.");
    };

    return this.withRetry(operation, 'AI 레시피 생성');
  }

  /**
   * AI 식단표 생성
   */
  async generateMealPlan(context: AiRequestContext): Promise<AiMealPlan> {
    const operation = async () => {
      const ai = this.getAiInstance();

      const systemInstruction = `당신은 사용자의 건강 상태와 식이 제한 사항을 바탕으로 맞춤형 식단표를 생성하는 전문 영양사입니다.`;

      const isMonth = context.period === 'month';
      const isLunchbox = context.period === 'lunchbox';
      const isMealPrep = context.isMealPrep;
      const weekOffset = context.weekOffset || 1;

      let periodDescription = '1주일';
      let extraInstruction = '';

      if (isMonth) {
        periodDescription = `1달 (총 4주) 중 **${weekOffset}주차** (7일치)`;
        extraInstruction = `이번 생성은 1달 식단 중 **${weekOffset}주차**에 해당합니다.`;
      } else if (isLunchbox) {
        periodDescription = '1주일치 점심 도시락 (하루 1끼: 점심)';
        extraInstruction = `**직장인 점심 도시락 전용 식단**: 아침, 저녁을 제외하고 오직 **'점심'** 메뉴 하나만 추천해주세요.`;

        if (isMealPrep) {
          extraInstruction += `\n**[밀프렙 모드 적용]**: 바쁜 직장인을 위해 주말이나 전날 밤에 미리 만들어두고, 아침에 통에 담기만 하면 되는 '밀프렙' 가능한 메뉴 위주로 구성해주세요.`;
        }
      }

      const userPrompt = `#### [입력 데이터]

사용자가 식단표 생성을 요청했습니다.

* **1. 사용자 건강 상태:** ${context.disease}
* **2. 알레르기/기피 식품:** ${context.avoidance}
* **3. 요청 기간:** ${periodDescription}

#### [요청 사항]

위의 건강 상태와 요청 기간에 맞는 요일별, 끼니별 상세 식단표를 생성하여 JSON 형식으로 반환해 주세요.

**🚨 [필수 제약 조건]:**
1.  알레르기/기피 식품은 식단표에 포함되어서는 안 됩니다.
2.  식단표 목표: 기간 내 영양 균형과 체중 관리에 도움이 되는 메뉴를 제공해야 합니다.
3.  ${extraInstruction}
4.  **각 요일의 식단을 대표하는 이모지(icon)**를 선정해주세요.

Your response MUST be a valid JSON object in the specified format.`;

      const response = await ai.models.generateContent({
        model: this.model,
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reason: { type: Type.STRING },
              plan: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    icon: { type: Type.STRING },
                    meals: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING },
                          menu: { type: Type.STRING },
                          note: { type: Type.STRING },
                        },
                        required: ["time", "menu", "note"],
                      },
                    },
                  },
                  required: ["day", "meals", "icon"],
                },
              },
            },
            required: ["title", "reason", "plan"],
          },
        },
      });

      return this.parseJsonResponse<AiMealPlan>(
        response.text.trim(),
        '식단표 생성'
      );
    };

    return this.withRetry(operation, 'AI 식단표 생성');
  }
}

// Singleton instance
export const geminiService = new GeminiService();

// 편의를 위한 export
export const getAiIngredientModification = (diseaseName: string, recipe: Recipe) =>
  geminiService.getIngredientModification(diseaseName, recipe);

export const generateAiRecipes = (context: AiRequestContext) =>
  geminiService.generateRecipes(context);

export const generateAiMealPlan = (context: AiRequestContext) =>
  geminiService.generateMealPlan(context);
