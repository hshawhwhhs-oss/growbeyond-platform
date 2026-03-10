import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ExamModeContextType {
  isExamMode: boolean;
  enterExamMode: () => void;
  exitExamMode: () => void;
  onExamExit: (() => void) | null;
  setOnExamExit: (cb: (() => void) | null) => void;
}

const ExamModeContext = createContext<ExamModeContextType>({
  isExamMode: false,
  enterExamMode: () => {},
  exitExamMode: () => {},
  onExamExit: null,
  setOnExamExit: () => {},
});

export function ExamModeProvider({ children }: { children: ReactNode }) {
  const [isExamMode, setIsExamMode] = useState(false);
  const [onExamExit, setOnExamExitState] = useState<(() => void) | null>(null);

  const enterExamMode = useCallback(() => setIsExamMode(true), []);
  const exitExamMode = useCallback(() => {
    setIsExamMode(false);
    setOnExamExitState(null);
  }, []);
  const setOnExamExit = useCallback((cb: (() => void) | null) => setOnExamExitState(() => cb), []);

  return (
    <ExamModeContext.Provider value={{ isExamMode, enterExamMode, exitExamMode, onExamExit, setOnExamExit }}>
      {children}
    </ExamModeContext.Provider>
  );
}

export const useExamMode = () => useContext(ExamModeContext);
