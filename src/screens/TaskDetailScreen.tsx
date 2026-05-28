// ─────────────────────────────────────────────────────────────────────────────
// screens/TaskDetailScreen.tsx
//
// Requirements:
//   - Receive taskId via route.params
//   - Display all task fields: title, description, priority, status, assignee, dueDate
//   - Button to navigate to EditTask screen, passing taskId
//   - Back button (handled by React Navigation header) returns to TaskList
// ─────────────────────────────────────────────────────────────────────────────

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList, TaskPriority, TaskStatus } from '@/types';
import { useTaskContext } from '@/state';

type Props = NativeStackScreenProps<TasksStackParamList, 'TaskDetail'>;

const STATUS_COLORS: Record<TaskStatus, string> = {
  todo: '#EF4444',
  in_progress: '#F59E0B',
  done: '#10B981',
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  high: '#DC2626',
  medium: '#D97706',
  low: '#059669',
};

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { getTaskById } = useTaskContext();
  const task = useMemo(() => getTaskById(taskId), [taskId, getTaskById]);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </SafeAreaView>
    );
  }

  const handleEditPress = () => {
    navigation.navigate('EditTask', { taskId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badge, { backgroundColor: STATUS_COLORS[task.status] }]}>
              <Text style={styles.badgeText}>{task.status.replace('_', ' ')}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: PRIORITY_COLORS[task.priority] }]}>
              <Text style={styles.badgeText}>{task.priority}</Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Assignee</Text>
            <Text style={styles.detailValue}>{task.assignee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Due Date</Text>
            <Text style={styles.detailValue}>{task.dueDate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Created</Text>
            <Text style={styles.detailValue}>{task.createdAt}</Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>Edit Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  headerSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  detailItem: {
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#1E3A5F',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  editButton: {
    backgroundColor: '#1E3A5F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
