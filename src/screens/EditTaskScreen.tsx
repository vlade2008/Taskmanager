// ─────────────────────────────────────────────────────────────────────────────
// screens/EditTaskScreen.tsx
//
// Requirements:
//   - Receive taskId via route.params
//   - Allow editing: title, description, priority, status
//   - On Save: update task in shared state, navigate back to TaskDetail
//     Changes must be reflected on TaskList immediately (no manual refresh)
//   - On Cancel: discard changes, navigate back without updating state
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TasksStackParamList, TaskPriority, TaskStatus } from '@/types';
import { useTaskContext } from '@/state';

type Props = NativeStackScreenProps<TasksStackParamList, 'EditTask'>;

export default function EditTaskScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { getTaskById, updateTask } = useTaskContext();
  const task = useMemo(() => getTaskById(taskId), [taskId, getTaskById]);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'medium');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'todo');

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    updateTask(taskId, {
      title,
      description,
      priority,
      status,
    });
    navigation.navigate('TaskDetail', { taskId });
  };

  const handleCancel = () => {
    navigation.navigate('TaskDetail', { taskId });
  };

  const priorities: TaskPriority[] = ['high', 'medium', 'low'];
  const statuses: TaskStatus[] = ['todo', 'in_progress', 'done'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Task title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Task description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Priority Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.optionRow}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.optionButton,
                  priority === p && styles.optionButtonActive,
                ]}
                onPress={() => setPriority(p)}
              >
                <Text
                  style={[
                    styles.optionText,
                    priority === p && styles.optionTextActive,
                  ]}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Status Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.optionRow}>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.optionButton,
                  status === s && styles.optionButtonActive,
                ]}
                onPress={() => setStatus(s)}
              >
                <Text
                  style={[
                    styles.optionText,
                    status === s && styles.optionTextActive,
                  ]}
                >
                  {s.replace('_', ' ').charAt(0).toUpperCase() + s.replace('_', ' ').slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E3A5F',
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#1E3A5F',
    borderColor: '#1E3A5F',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#10B981',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#1E3A5F',
    fontSize: 15,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
