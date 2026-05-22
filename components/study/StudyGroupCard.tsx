import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface StudyGroup {
  id: string;
  course: string;        // e.g. "COSC 3340"
  category: string;      // e.g. "Computer Science"
  categoryColor: string;
  title: string;
  topic: string;
  location: string;
  time: string;
  members: number;
  maxMembers: number;
}

interface Props {
  group: StudyGroup;
  onJoin: (group: StudyGroup) => void;
  joined: boolean;
}

export default function StudyGroupCard({ group, onJoin, joined }: Props) {
  const progress = group.members / group.maxMembers;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.92}
      onPress={() => !joined && onJoin(group)}
    >
      {/* Top row: category pill + members */}
      <View style={styles.topRow}>
        <View style={[styles.categoryPill, { backgroundColor: group.categoryColor + '22' }]}>
          <Text style={[styles.categoryText, { color: group.categoryColor }]}>
            {group.category}
          </Text>
        </View>
        <View style={styles.membersCol}>
          <Text style={styles.membersText}>
            {group.members}/{group.maxMembers} members
          </Text>
          {/* Member progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]} />
          </View>
        </View>
      </View>

      {/* Course + title */}
      <Text style={styles.courseTitle}>{group.title}</Text>

      {/* Details */}
      <View style={styles.detailsBlock}>
        <View style={styles.detailRow}>
          <Ionicons name="document-text-outline" size={15} color="#888" />
          <Text style={styles.detailText}>{group.topic}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={15} color="#888" />
          <Text style={styles.detailText}>{group.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={15} color="#888" />
          <Text style={styles.detailText}>{group.time}</Text>
        </View>
      </View>

      {/* Join button */}
      <TouchableOpacity
        style={[styles.joinBtn, joined && styles.joinBtnJoined]}
        onPress={() => !joined && onJoin(group)}
        activeOpacity={0.85}
      >
        <Text style={[styles.joinBtnText, joined && styles.joinBtnTextJoined]}>
          {joined ? 'Joined ✓' : 'Join Group'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryPill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  membersCol: {
    alignItems: 'flex-end',
    gap: 5,
  },
  membersText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  progressTrack: {
    width: 70,
    height: 4,
    backgroundColor: '#F0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C8102E',
    borderRadius: 2,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 14,
    lineHeight: 24,
  },
  detailsBlock: {
    gap: 8,
    marginBottom: 18,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#555',
    flex: 1,
    lineHeight: 18,
  },
  joinBtn: {
    backgroundColor: '#C8102E',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  joinBtnJoined: {
    backgroundColor: '#F5E0E0',
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  joinBtnTextJoined: {
    color: '#C8102E',
  },
});
