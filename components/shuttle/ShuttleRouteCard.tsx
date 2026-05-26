import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CARD_WIDTH = Dimensions.get('window').width * 0.62;

export interface ShuttleRoute {
  id: string;
  name: string;
  status: 'ON TIME' | 'DELAYED' | 'EARLY';
  capacity: 'Low' | 'Moderate' | 'Full';
  time: string;
  stops: string;
  accentColor: string;
  statusBg: string;
  statusColor: string;
}

interface Props {
  route: ShuttleRoute;
  onPress: (route: ShuttleRoute) => void;
}

const CAPACITY_COLORS: Record<string, string> = {
  Low: '#16A34A', Moderate: '#D97706', Full: '#C8102E',
};

export default function ShuttleRouteCard({ route, onPress }: Props) {
  const capColor = CAPACITY_COLORS[route.capacity] || '#888';

  return (
    <TouchableOpacity style={[styles.card, { width: CARD_WIDTH }]} onPress={() => onPress(route)} activeOpacity={0.88}>
      {/* Top row: icon + status */}
      <View style={styles.topRow}>
        <View style={[styles.routeIconBox, { backgroundColor: route.accentColor + '20' }]}>
          <Ionicons name="git-branch-outline" size={20} color={route.accentColor} />
        </View>
        <View style={[styles.statusPill, { backgroundColor: route.statusBg }]}>
          <Text style={[styles.statusText, { color: route.statusColor }]}>{route.status}</Text>
        </View>
      </View>

      {/* Name + capacity */}
      <Text style={styles.routeName}>{route.name}</Text>
      <Text style={styles.capacityRow}>
        Capacity: <Text style={{ color: capColor, fontWeight: '700' }}>{route.capacity}</Text>
      </Text>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <View style={[
          styles.progressFill,
          {
            backgroundColor: route.accentColor,
            width: route.capacity === 'Low' ? '30%' : route.capacity === 'Moderate' ? '65%' : '95%',
          },
        ]} />
      </View>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <View style={styles.timeRow}>
          <Ionicons name="bus-outline" size={14} color="#555" />
          <Text style={styles.timeText}>{route.time}</Text>
        </View>
        <Text style={styles.stopsText}>{route.stops}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16,
    marginRight: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 4,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  routeIconBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  statusPill: {
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
  },
  statusText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  routeName: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 4 },
  capacityRow: { fontSize: 13, color: '#888', marginBottom: 12 },
  progressTrack: {
    height: 4, backgroundColor: '#F0F0F0', borderRadius: 2,
    marginBottom: 14, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 2 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  timeText: { fontSize: 13, color: '#444', fontWeight: '600' },
  stopsText: { fontSize: 13, color: '#888', fontWeight: '500' },
});
