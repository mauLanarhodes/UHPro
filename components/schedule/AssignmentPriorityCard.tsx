import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type AssignmentPriority = 'high' | 'upcoming';

export interface AssignmentItem {
  id: string;
  priority: AssignmentPriority;
  title: string;
  dueLabel: string;   // e.g. "Due in 2 days" or "Friday, 11:59"
}

interface Props {
  item: AssignmentItem;
  onPress?: () => void;
}

export default function AssignmentPriorityCard({ item, onPress }: Props) {
  const isHigh = item.priority === 'high';

  return (
    <TouchableOpacity
      style={[styles.card, isHigh ? styles.cardHigh : styles.cardUpcoming]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {/* Top row: badge + exclamation */}
      <View style={styles.topRow}>
        <View style={[styles.priorityBadge, isHigh ? styles.badgeHigh : styles.badgeUpcoming]}>
          <Text style={[styles.priorityBadgeText, isHigh ? styles.badgeHighText : styles.badgeUpcomingText]}>
            {isHigh ? 'HIGH PRIORITY' : 'Upcoming'}
          </Text>
        </View>
        {isHigh ? (
          <Text style={styles.exclamation}>!</Text>
        ) : (
          <Ionicons name="document-text-outline" size={20} color="#999" />
        )}
      </View>

      {/* Title */}
      <Text style={[styles.title, isHigh ? styles.titleHigh : styles.titleUpcoming]}>
        {item.title}
      </Text>

      {/* Due label */}
      <Text style={[styles.dueLabel, isHigh ? styles.dueLabelHigh : styles.dueLabelUpcoming]}>
        {item.dueLabel}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHigh: {
    backgroundColor: '#B5CC47', // lime green from screenshot
  },
  cardUpcoming: {
    backgroundColor: '#FFFFFF',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  priorityBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeHigh: {
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  badgeUpcoming: {
    backgroundColor: 'transparent',
  },
  priorityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  badgeHighText: {
    color: '#3A4A00',
  },
  badgeUpcomingText: {
    color: '#C8102E',
    fontSize: 14,
    fontWeight: '600',
  },

  exclamation: {
    color: '#C8102E',
    fontSize: 22,
    fontWeight: '900',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    lineHeight: 24,
  },
  titleHigh: {
    color: '#2A3800',
  },
  titleUpcoming: {
    color: '#1A1A1A',
  },

  dueLabel: {
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  dueLabelHigh: {
    color: '#3A4A00',
  },
  dueLabelUpcoming: {
    color: '#888',
  },
});
