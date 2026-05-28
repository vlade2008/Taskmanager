import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from '@/navigation';
import { TaskProvider } from '@/state';

export default function App() {
  return (
    <TaskProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </TaskProvider>
  );
}
