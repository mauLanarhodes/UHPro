import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface DiningLocation {
  id: string; name: string; status: 'Open' | 'Busy' | 'Very Busy';
  distance: string; hours: string; rating: string;
  bestFor: string; waitTime: string;
}

interface Props { location: DiningLocation; onDirections: () => void }

const STATUS_COLORS: Record<string, string> = {
  'Open': '#16A34A', 'Busy': '#D97706', 'Very Busy': '#C8102E',
};

export default function DiningLocationCard({ location, onDirections }: Props) {
  const statusColor = STATUS_COLORS[location.status] || '#888';

  return (
    <TouchableOpacity style={styles.card} onPress={onDirections} activeOpacity={0.9}>
      {/* Left color bar */}
      <View style={[styles.colorBar, { backgroundColor: statusColor }]} />

      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.nameCol}>
            <Text style={styles.name}>{location.name}</Text>
            <View style={styles.distRow}>
              <Ionicons name="location-outline" size={12} color="#888" />
              <Text style={styles.dist}>{location.distance}</Text>
            </View>
          </View>
          <View style={[styles.statusPill, { backgroundColor: statusColor + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>{location.status}</Text>
            <Text style={styles.waitText}> Wait: {location.waitTime}</Text>
          </View>
        </View>

        {/* Hours + rating */}
        <View style={styles.bottomRow}>
          <Text style={styles.hours}>{location.hours}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.rating}>{location.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderRadius: 16, marginBottom: 10, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 3,
    borderWidth: 1, borderColor: '#F5F5F5',
  },
  colorBar: { width: 4 },
  content: { flex: 1, padding: 14 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  nameCol: { flex: 1, marginRight: 8 },
  name: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  distRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  dist: { fontSize: 12, color: '#888' },
  statusPill: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4, gap: 4,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '700' },
  waitText: { fontSize: 10, color: '#888' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hours: { fontSize: 12, color: '#C8102E', fontWeight: '600' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rating: { fontSize: 13, fontWeight: '700', color: '#1A1A1A' },
});
