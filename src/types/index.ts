/**
 * 애플리케이션 전체에서 사용되는 타입 정의
 */

// ==================== Recipe Types ====================

export interface Recipe {
  name: string;
  icon: string;
  tags: string[];
  description: string;
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  steps?: string[];
  aiReason?: string;
  
  // User defined tags for categorization
  userTags?: string[];

  // Detailed Nutritional Breakdown
  fiber?: number; // g
  sugar?: number; // g
  sodium?: number; // mg
  potassium?: number; // mg
  cholesterol?: number; // mg
  calcium?: number; // mg
  iron?: number; // mg
  magnesium?: number; // mg
  phosphorus?: number; // mg
}

export interface ModifiedRecipe {
  name: string;
  icon?: string;
  modifiedIngredients: string[];
  modifiedDescription?: string;
  reason: string;
  instructions?: string[];
  
  // Estimated Nutrition for generated recipes
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;

  // Detailed Estimated Nutrition
  fiber?: number;
  sugar?: number;
  sodium?: number;
  potassium?: number;
  cholesterol?: number;
  calcium?: number;
  iron?: number;
  magnesium?: number;
  phosphorus?: number;
}

// ==================== Disease Types ====================

export interface Disease {
  id: string;
  name: string;
  icon: string;
  subOptions?: { id: string; name: string }[];
}

export interface DiseaseCategory {
  name: string;
  icon: string;
  diseases: Disease[];
}

export interface DiseaseSelection {
  key: string;
  name: string;
}

// ==================== Meal Plan Types ====================

export type MealTime = '아침' | '점심' | '저녁' | '간식';

export interface Meal {
  time: MealTime;
  menu: string;
  note: string;
}

export interface DailyPlan {
  day: string;
  icon?: string;
  meals: Meal[];
}

export interface AiMealPlan {
  title: string;
  reason: string;
  plan: DailyPlan[];
}

export interface MealPlan {
  [day: string]: string[];
}

export interface SavedPlan {
  name: string;
  date: string;
  period: 'week' | 'month';
  plan: MealPlan;
}

// ==================== Food Diary Types ====================

export interface FoodLogEntry {
  id: string;
  time: MealTime;
  menu: string;
  calories: number;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  entries: FoodLogEntry[];
}

// ==================== UI State Types ====================

export type ViewMode = 'search' | 'saved';
export type TabMode = 'diary' | 'stats';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

// ==================== App Context Types ====================

export interface AppContextState {
  // Theme
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  
  // Health Status
  selectedDiseases: DiseaseSelection[];
  setSelectedDiseases: (diseases: DiseaseSelection[]) => void;
  avoidance: string;
  setAvoidance: (value: string) => void;
  
  // Recipes
  savedRecipes: Recipe[];
  setSavedRecipes: (recipes: Recipe[]) => void;
  
  // Food Logs
  foodLogs: DailyLog[];
  setFoodLogs: (logs: DailyLog[]) => void;
  
  // View State
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

// ==================== API Types ====================

export interface AiRequestContext {
  disease: string;
  avoidance: string;
  query?: string;
  period?: 'week' | 'month' | 'lunchbox';
  weekOffset?: number;
  isMealPrep?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ==================== Hook Types ====================

export interface UseRecipesReturn {
  recipes: Recipe[];
  isLoading: boolean;
  error: ErrorState;
  generateRecipes: (query: string) => Promise<void>;
  searchRecipes: (query: string) => void;
  toggleSaveRecipe: (recipe: Recipe) => void;
  updateRecipeTags: (recipe: Recipe, tags: string[]) => void;
}

export interface UseMealPlanReturn {
  mealPlan: AiMealPlan | null;
  isLoading: boolean;
  error: ErrorState;
  generateMealPlan: (period: 'week' | 'month' | 'lunchbox', isMealPrep?: boolean) => Promise<void>;
  loadNextWeek: () => Promise<void>;
  clearMealPlan: () => void;
}

// ==================== Component Props Types ====================

export interface BaseComponentProps {
  className?: string;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
}
