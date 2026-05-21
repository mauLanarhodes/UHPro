import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  destination: string;
  minutes: number;
  shuttleInfo: string;
  onLeaveNow: () => void;
}

export default function DestinationCard({
  destination, minutes, shuttleInfo, onLeaveNow,
}: Props) {
  return (
    // Fake gradient using two layered views (no LinearGradient needed)
    <View style={styles.card}>
      {/* Dark red inner overlay for gradient feel */}
      <View style={styles.gradientOverlay} />

      <View style={styles.topRow}>
        <View style={styles.leftContent}>
          <Text style={styles.nextDestLabel}>Next Destination</Text>
          <Text style={styles.destName}>{destination}</Text>
        </View>
        {/* Time badge */}
        <View style={styles.timeBadge}>
          <Text style={styles.timeBadgeNumber}>{minutes}</Text>
          <Text style={styles.timeBadgeUnit}>MINS</Text>
        </View>
      </View>

      {/* Leave Now button */}
      <TouchableOpacity style={styles.leaveBtn} onPress={onLeaveNow} activeOpacity={0.85}>
        <Ionicons name="bus" size={18} color="#C8102E" style={{ marginRight: 8 }} />
        <Text style={styles.leaveBtnText}>LEAVE NOW</Text>
      </TouchableOpacity>

      {/* Shuttle info */}
      <Text style={styles.shuttleInfo}>{shuttleInfo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#C8102E',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 20,
    overflow: 'hidden',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  // Simulates a dark-to-lighter red gradient
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#9B0000',
    opacity: 0.45,
    borderRadius: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  leftContent: { flex: 1, marginRight: 12 },
  nextDestLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 6,
  },
  destName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  timeBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  timeBadgeNumber: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
  },
  timeBadgeUnit: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  leaveBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 14,
  },
  leaveBtnText: {
    color: '#C8102E',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  shuttleInfo: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
  },
});
