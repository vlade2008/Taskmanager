// ─────────────────────────────────────────────────────────────────────────────
// navigation/index.tsx — Root navigator stub
//
// The navigation structure is wired up for you:
//   - RootNavigator: bottom tab navigator (Tasks + Profile)
//   - TasksStack: stack navigator inside the Tasks tab
//   - Deep link config is set up for /task/:id → TaskDetail
//
// Your job: implement the screens referenced below, and wire up your state
// management solution so that data flows correctly across both tabs.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { Text } from 'react-native';

import { RootTabParamList, TasksStackParamList } from '@/types';
import { useTaskContext } from '@/state';
import TaskListScreen from '@/screens/TaskListScreen';
import TaskDetailScreen from '@/screens/TaskDetailScreen';
import EditTaskScreen from '@/screens/EditTaskScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<TasksStackParamList>();

// ─── Deep link configuration ─────────────────────────────────────────────────
// Deep link: taskmanager://task/task-001 → TaskDetail screen
// Test with: npx uri-scheme open "taskmanager://task/task-001" --ios
const prefix = Linking.createURL('/');

const linkingConfig: LinkingOptions<RootTabParamList> = {
  prefixes: [prefix, 'taskmanager://'],
  config: {
    screens: {
      Tasks: {
        screens: {
          TaskDetail: 'task/:taskId',
        },
      },
      Profile: 'profile',
    },
  },
};

// ─── Tasks stack ─────────────────────────────────────────────────────────────
function TasksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1E3A5F' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Detail' }} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Edit Task' }} />
    </Stack.Navigator>
  );
}

// ─── Root tab navigator ───────────────────────────────────────────────────────

const TasksTabIcon = ({ color }: { color: string }) => (
  <Text style={{ fontSize: 20, color }}>📋</Text>
);

const ProfileTabIcon = ({ color }: { color: string }) => (
  <Text style={{ fontSize: 20, color }}>👤</Text>
);

export default function RootNavigator() {
  const { incompleteCount } = useTaskContext();

  return (
    <NavigationContainer linking={linkingConfig}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1E3A5F',
          tabBarInactiveTintColor: '#999999',
          tabBarStyle: { borderTopColor: '#E0E0E0' },
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={TasksStack}
          options={{
            tabBarIcon: TasksTabIcon,
            tabBarBadge: incompleteCount > 0 ? incompleteCount : undefined,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ProfileTabIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
