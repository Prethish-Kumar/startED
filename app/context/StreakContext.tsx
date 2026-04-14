import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

export type MediaType = "photo" | "video";

export type StreakEntry = {
  id: string;
  date: string;
  mediaType: MediaType;
  uri: string;
  completed: boolean;
};

type StreakContextType = {
  entries: StreakEntry[];
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate: string | null;
  checkIn: (entry: Omit<StreakEntry, "id" | "completed">) => void;
  hasCheckedInToday: () => boolean;
  monthCompletionCount: () => number;
};

const StreakContext = createContext<StreakContextType | undefined>(undefined);

function getDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

function isConsecutiveDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

function generateMockEntries(): StreakEntry[] {
  const entries: StreakEntry[] = [];
  const today = new Date();

  for (let i = 7; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    entries.push({
      id: `mock-${i}`,
      date: getDateString(date),
      mediaType: i % 2 === 0 ? "photo" : "video",
      uri: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100",
      completed: true,
    });
  }

  return entries;
}

export function StreakProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<StreakEntry[]>(generateMockEntries());
  const [lastCheckInDate, setLastCheckInDate] = useState<string | null>(
    getDateString(new Date(Date.now() - 86400000))
  );

  const currentStreak = useMemo(() => {
    if (entries.length === 0) return 0;

    const sortedDates = entries
      .filter((e) => e.completed)
      .map((e) => e.date)
      .sort()
      .reverse();

    if (sortedDates.length === 0) return 0;

    let streak = 0;
    const today = getDateString(new Date());
    const yesterday = getDateString(new Date(Date.now() - 86400000));

    if (sortedDates[0] === today || sortedDates[0] === yesterday) {
      streak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        if (isConsecutiveDay(sortedDates[i - 1], sortedDates[i])) {
          streak++;
        } else {
          break;
        }
      }
    }

    return streak;
  }, [entries]);

  const longestStreak = useMemo(() => {
    if (entries.length === 0) return 0;

    const sortedDates = entries
      .filter((e) => e.completed)
      .map((e) => e.date)
      .sort();

    if (sortedDates.length === 0) return 0;

    let maxStreak = 1;
    let currentRun = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      if (isConsecutiveDay(sortedDates[i - 1], sortedDates[i])) {
        currentRun++;
        maxStreak = Math.max(maxStreak, currentRun);
      } else {
        currentRun = 1;
      }
    }

    return maxStreak;
  }, [entries]);

  const checkIn = useCallback(
    (entry: Omit<StreakEntry, "id" | "completed">) => {
      const today = getDateString(new Date());

      setEntries((prev) => {
        const existingIndex = prev.findIndex((e) => e.date === today);
        const newEntry: StreakEntry = {
          ...entry,
          id: existingIndex >= 0 ? prev[existingIndex].id : `streak-${Date.now()}`,
          completed: true,
        };

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newEntry;
          return updated;
        }
        return [...prev, newEntry];
      });

      setLastCheckInDate(today);
    },
    []
  );

  const hasCheckedInToday = useCallback(() => {
    const today = getDateString(new Date());
    return entries.some((e) => e.date === today && e.completed);
  }, [entries]);

  const monthCompletionCount = useCallback(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStartStr = getDateString(monthStart);

    return entries.filter(
      (e) => e.date >= monthStartStr && e.completed
    ).length;
  }, [entries]);

  return (
    <StreakContext.Provider
      value={{
        entries,
        currentStreak,
        longestStreak,
        lastCheckInDate,
        checkIn,
        hasCheckedInToday,
        monthCompletionCount,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak(): StreakContextType {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error("useStreak must be used within a StreakProvider");
  }
  return context;
}
