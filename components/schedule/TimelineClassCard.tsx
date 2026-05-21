import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Types ───────────────────────────────────────────────────────────────────
export type ClassStatus = 'ongoing' | 'upcoming' | 'done';

export interface ClassItem {
  id: string;
  code: string;
  name: string;
  startTime: string;  // "10:00 AM"
  endTime: string;    // "11:15 AM"
  location: string;
  status: ClassStatus;
  // For progress bar: 0.0 – 1.0
  progress?: number;
}

interface Props {
  item: ClassItem;
  isLast: boolean;
  onDirections: (item: ClassItem) => void;
}

export default function TimelineClassCard({ item, isLast, onDirections }: Props) {
  const isOngoing = item.status === 'ongoing';
  const isDone = item.status === 'done';

  return (
    <View style={styles.row}>
      {/* ── Left timeline column ── */}
      <View style={styles.timelineCol}>
        {/* Circle icon */}
        <View style={[
          styles.timelineCircle,
          isOngoing && styles.timelineCircleActive,
          isDone    && styles.timelineCircleDone,
        ]}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={isOngoing ? '#FFFFFF' : isDone ? '#999' : '#C8102E'}
          />
        </View>
        {/* Vertical line below circle (hidden for last item) */}
        {!isLast && <View style={styles.timelineLine} />}
      </View>

      {/* ── Card ── */}
      <View style={[styles.card, isDone && styles.cardDone]}>
        {/* Status badge — only on ongoing */}
        {isOngoing && (
          <Text style={styles.ongoingBadge}>ONGOING</Text>
        )}

        {/* Top row: course code + times */}
        <View style={styles.cardTopRow}>
          <View style={styles.cardLeft}>
            <Text style={[styles.courseCode, isDone && styles.textDone]}>
              {item.code}
            </Text>
            <Text style={[styles.courseName, isDone && styles.textDone]}>
              {item.name}
            </Text>
          </View>
          <View style={styles.timeCol}>
            <Text style={[styles.timeStart, isDone && styles.textDone]}>
              {item.startTime}
            </Text>
            <Text style={styles.timeEnd}>{item.endTime}</Text>
          </View>
        </View>

        {/* Progress bar for ongoing class */}
        {isOngoing && item.progress !== undefined && (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round(item.progress * 100)}%` }]} />
          </View>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Location + Directions */}
        <View style={styles.cardBottomRow}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#888" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <TouchableOpacity
            style={styles.directionsBtn}
            onPress={() => onDirections(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.directionsBtnText}>GET DIRECTIONS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 0,
  },

  // ── Timeline ──
  timelineCol: {
    width: 44,
    alignItems: 'center',
  },
  timelineCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF1F1',
    borderWidth: 2,
    borderColor: '#C8102E',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineCircleActive: {
    backgroundColor: '#C8102E',
    borderColor: '#C8102E',
  },
  timelineCircleDone: {
    backgroundColor: '#F0F0F0',
    borderColor: '#CCCCCC',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0C0C0',
    marginTop: 2,
    marginBottom: 0,
    minHeight: 20,
  },

  // ── Card ──
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardDone: {
    opacity: 0.6,
  },
  ongoingBadge: {
    color: '#C8102E',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardLeft: { flex: 1 },
  courseCode: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  courseName: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  timeCol: { alignItems: 'flex-end' },
  timeStart: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  timeEnd: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C8102E',
  },
  textDone: {
    color: '#AAAAAA',
  },

  // Progress bar
  progressTrack: {
    height: 4,
    backgroundColor: '#F0E0E0',
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C8102E',
    borderRadius: 2,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EEEEEE',
    marginBottom: 10,
  },

  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  directionsBtn: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  directionsBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#444',
    letterSpacing: 0.5,
  },
});
