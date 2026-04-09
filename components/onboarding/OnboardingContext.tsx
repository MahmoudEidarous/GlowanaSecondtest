import { createContext, useContext, useState, type ReactNode } from 'react';

export interface OnboardingData {
  goal: string;
  skinType: string;
  concerns: string[];
  routineTime: string;
  routineDuration: string;
  swipedCards: Record<string, boolean>;
}

const defaultData: OnboardingData = {
  goal: '',
  skinType: '',
  concerns: [],
  routineTime: '',
  routineDuration: '',
  swipedCards: {},
};

interface OnboardingContextType {
  data: OnboardingData;
  setData: (updates: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  data: defaultData,
  setData: () => {},
});

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<OnboardingData>(defaultData);

  const setData = (updates: Partial<OnboardingData>) => {
    setDataState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}
