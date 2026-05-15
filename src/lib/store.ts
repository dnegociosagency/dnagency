import { create } from 'zustand'

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface LMSState {
  currentCourseId: string | null;
  currentLessonId: string | null;
  setCurrentLesson: (courseId: string, lessonId: string) => void;
  // Progress tracking
  activeWatchedSeconds: number;
  incrementWatchedSeconds: (seconds: number) => void;
  resetWatchedSeconds: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export const useLMSStore = create<LMSState>((set) => ({
  currentCourseId: null,
  currentLessonId: null,
  setCurrentLesson: (courseId, lessonId) => set({ currentCourseId: courseId, currentLessonId: lessonId, activeWatchedSeconds: 0 }),
  activeWatchedSeconds: 0,
  incrementWatchedSeconds: (seconds) => set((state) => ({ activeWatchedSeconds: state.activeWatchedSeconds + seconds })),
  resetWatchedSeconds: () => set({ activeWatchedSeconds: 0 }),
}));
