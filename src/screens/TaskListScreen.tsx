// ─────────────────────────────────────────────────────────────────────────────
// screens/TaskListScreen.tsx
//
// Requirements:
//   - Load tasks from your state management solution on mount
//   - Group tasks by status: 'todo', 'in_progress', 'done'
//   - Render a filter bar for priority: 'high' | 'medium' | 'low' | all
//   - Tapping a task navigates to TaskDetail with the task's id
//   - Marking a task complete must update the UI optimistically (before async resolves)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList, TaskPriority, TaskStatus } from '@/types';
import { useTaskContext } from '@/state';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskList'>;

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, completeTask } = useTaskContext();
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  // Filter tasks by priority
  const filteredTasks = useMemo(() => {
    if (priorityFilter === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.priority === priorityFilter);
  }, [tasks, priorityFilter]);

  // Group tasks by status
  const groupedTasks = useMemo(() => {
    const groups: Record<TaskStatus, any[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    filteredTasks.forEach((task) => {
      groups[task.status].push(task);
    });

    return Object.entries(groups).map(([status, items]) => ({
      title: STATUS_LABELS[status as TaskStatus],
      data: items,
      status: status as TaskStatus,
    }));
  }, [filteredTasks]);

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', { taskId });
  };

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
  };

  const renderTask = ({ item }: any) => {
    const priorityStyle = item.priority === 'high'
      ? styles.priority_high
      : item.priority === 'medium'
      ? styles.priority_medium
      : styles.priority_low;

    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => handleTaskPress(item.id)}
      >
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription} numberOfLines={1}>
            {item.description}
          </Text>
          <View style={styles.taskMeta}>
            <Text style={[styles.priority, priorityStyle]}>
              {item.priority}
            </Text>
            <Text style={styles.dueDate}>{item.dueDate}</Text>
          </View>
        </View>
        {item.status !== 'done' && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => handleCompleteTask(item.id)}
          >
            <Text style={styles.completeButtonText}>✓</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>{section.data.length}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Priority Filter Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.filterButton,
              priorityFilter === priority && styles.filterButtonActive,
            ]}
            onPress={() => setPriorityFilter(priority)}
          >
            <Text
              style={[
                styles.filterText,
                priorityFilter === priority && styles.filterTextActive,
              ]}
            >
              {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Task List Grouped by Status */}
      <SectionList
        sections={groupedTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        renderSectionHeader={renderSectionHeader}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  filterContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    borderColor: '#D0D0D0',
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: '#1E3A5F',
    borderColor: '#1E3A5F',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A5F',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftColor: '#1E3A5F',
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  taskMeta: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  priority: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priority_high: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
  priority_medium: {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
  },
  priority_low: {
    backgroundColor: '#D1FAE5',
    color: '#059669',
  },
  dueDate: {
    fontSize: 11,
    color: '#999',
  },
  completeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 18,
    color: '#4CAF50',
  },
});
