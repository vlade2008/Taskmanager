// ─────────────────────────────────────────────────────────────────────────────
// state/TaskContext.tsx — State management using React Context
//
// This implementation uses React Context + useState for simplicity and
// avoids external dependencies. It meets all requirements:
//   1. Stores the full task list (seeded from MOCK_TASKS on startup)
//   2. Updates a single task (used by EditTaskScreen)
//   3. Toggles a task's completion status (optimistic update on TaskListScreen)
//   4. Derives incomplete task count (used by tab badge and ProfileScreen)
//   5. Accessible from both Tasks tab and Profile tab without prop drilling
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '@/types';
import { MOCK_TASKS } from '@/data/mockData';

interface TaskContextType {
  tasks: Task[];
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  completeTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  incompleteCount: number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { readonly children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize tasks on mount
  useEffect(() => {
    setTasks([...MOCK_TASKS]);
  }, []);

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const completeTask = (taskId: string) => {
    updateTask(taskId, { status: 'done' });
  };

  const getTaskById = (taskId: string) => {
    return tasks.find((task) => task.id === taskId);
  };

  const incompleteCount = tasks.filter(
    (task) => task.status !== 'done'
  ).length;

  const contextValue: TaskContextType = {
    tasks,
    updateTask,
    completeTask,
    getTaskById,
    incompleteCount,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
