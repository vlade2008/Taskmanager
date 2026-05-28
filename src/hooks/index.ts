// ─────────────────────────────────────────────────────────────────────────────
// hooks/index.ts — Custom hooks for task management
//
// Bonus: Implements a useTaskManager hook that encapsulates all task operations.
// This provides a clean, composable interface for consuming task state.
// ─────────────────────────────────────────────────────────────────────────────

import { useTaskContext } from '@/state';
export function useTaskManager() {
  const { tasks, updateTask, completeTask, getTaskById, incompleteCount } = useTaskContext();

  return {
    tasks,
    getTaskById,
    updateTask,
    completeTask,
    incompleteCount,
    totalCount: tasks.length,
    completionPercentage: tasks.length > 0 ? Math.round(((tasks.length - incompleteCount) / tasks.length) * 100) : 0,
  };
}

export default useTaskManager;
