import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { 
  AppContextState, 
  DiseaseSelection, 
  Recipe, 
  DailyLog, 
  ViewMode 
} from '@/types';

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * 전역 상태 관리를 위한 Context Provider
 */
export function AppProvider({ children }: AppProviderProps) {
  // Theme
  const [isDarkMode, setIsDarkMode] = useLocalStorage('eat-play-dark-mode', true);
  
  // Health Status
  const [selectedDiseases, setSelectedDiseases] = useLocalStorage<DiseaseSelection[]>(
    'eat-play-diseases',
    []
  );
  const [avoidance, setAvoidance] = useLocalStorage<string>('eat-play-avoidance', '');
  
  // Recipes
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>(
    'eat-play-saved-recipes',
    []
  );
  
  // Food Logs
  const [foodLogs, setFoodLogs] = useLocalStorage<DailyLog[]>('eat-play-food-logs', []);
  
  // View State
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('eat-play-view-mode', 'search');

  const value: AppContextState = {
    isDarkMode,
    setIsDarkMode,
    selectedDiseases,
    setSelectedDiseases,
    avoidance,
    setAvoidance,
    savedRecipes,
    setSavedRecipes,
    foodLogs,
    setFoodLogs,
    viewMode,
    setViewMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * App Context Hook
 */
export function useAppContext(): AppContextState {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}
