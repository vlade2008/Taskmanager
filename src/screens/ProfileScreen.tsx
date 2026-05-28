// ─────────────────────────────────────────────────────────────────────────────
// screens/ProfileScreen.tsx
//
// Requirements:
//   - Display MOCK_USER name, role, and avatarInitials
//   - Show a count of the current user's incomplete tasks
//     This count must come from your shared state — it should update in real
//     time as tasks are completed on the TaskList screen
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MOCK_USER } from '@/data/mockData';
import { useTaskContext } from '@/state';

export default function ProfileScreen() {
  const { incompleteCount } = useTaskContext();

  return (
    <SafeAreaView style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{MOCK_USER.avatarInitials}</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{MOCK_USER.name}</Text>
        <Text style={styles.userRole}>{MOCK_USER.role}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{incompleteCount}</Text>
          <Text style={styles.statLabel}>Incomplete Tasks</Text>
        </View>
      </View>

      {/* Details Section */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Profile Details</Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Name</Text>
          <Text style={styles.detailValue}>{MOCK_USER.name}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Role</Text>
          <Text style={styles.detailValue}>{MOCK_USER.role}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>User ID</Text>
          <Text style={styles.detailValue}>{MOCK_USER.id}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  avatarContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 32,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    width: '90%',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E3A5F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  detailsSection: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    marginBottom: 16,
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
});
