import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onTrack: () => void;
  onDismiss: () => void;
}

export default function RouteSuggestionCard({ onTrack, onDismiss }: Props) {
  return (
    <View style={styles.card}>
      {/* Top row: pills + bus icon */}
      <View style={styles.topRow}>
        <View style={styles.topLeft}>
          <View style={styles.fastestPill}>
            <Text style={styles.fastestText}>FASTEST ROUTE</Text>
          </View>
          <Text style={styles.aiLabel}>AI Suggested</Text>
        </View>
        <View style={styles.busIconBox}>
          <Ionicons name="bus-outline" size={22} color="#C8102E" />
        </View>
      </View>

      {/* Route name */}
      <Text style={styles.routeName}>Take North Route</Text>

      {/* Arriving row */}
      <View style={styles.arrivingRow}>
        <Ionicons name="time-outline" size={14} color="#555" />
        <Text style={styles.arrivingText}>Arriving in 3 min</Text>
      </View>

      {/* Destination detail */}
      <View style={styles.destCard}>
        <View style={styles.destRow}>
          <Ionicons name="location-outline" size={16} color="#C8102E" style={{ marginTop: 2 }} />
          <Text style={styles.destText}>Science & Engineering Complex (SEC)</Text>
        </View>
        <View style={styles.destRow}>
          <Ionicons name="ellipse" size={10} color="#C8102E" style={{ marginTop: 4, marginLeft: 3 }} />
          <Text style={styles.walkText}>
            Walk to Student Center South stop now to arrive on time.
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.trackBtn} onPress={onTrack} activeOpacity={0.85}>
          <Text style={styles.trackBtnText}>Track Shuttle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissBtn} onPress={onDismiss} activeOpacity={0.8}>
          <Text style={styles.dismissBtnText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 22, padding: 18, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07, shadowRadius: 12, elevation: 4,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  fastestPill: {
    backgroundColor: '#FFF1F1', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  fastestText: { color: '#C8102E', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  aiLabel: { color: '#888', fontSize: 12, fontWeight: '500' },
  busIconBox: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: '#FFF1F1', alignItems: 'center', justifyContent: 'center',
  },
  routeName: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: 6 },
  arrivingRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 14 },
  arrivingText: { fontSize: 13, color: '#555', fontWeight: '500' },
  destCard: {
    backgroundColor: '#F9F9F9', borderRadius: 14, padding: 12,
    gap: 8, marginBottom: 16,
  },
  destRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  destText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#1A1A1A', lineHeight: 20 },
  walkText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },
  btnRow: { flexDirection: 'row', gap: 10 },
  trackBtn: {
    flex: 1, backgroundColor: '#C8102E', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  trackBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  dismissBtn: {
    flex: 1, backgroundColor: '#F0F0F0', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  dismissBtnText: { color: '#555', fontSize: 15, fontWeight: '600' },
});
