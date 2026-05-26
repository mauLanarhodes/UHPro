import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props { visible: boolean; onClose: () => void }

const SCHEDULES = [
  { route: 'North Route',   hours: '7:00 AM – 10:00 PM', freq: 'Every 8 mins',  color: '#14B8A6' },
  { route: 'PGH / Zone E', hours: '6:30 AM – 11:00 PM', freq: 'Every 12 mins', color: '#F59E0B' },
  { route: 'SC / Zone D',  hours: '7:00 AM – 9:30 PM',  freq: 'Every 10 mins', color: '#C8102E' },
];

export default function ShuttleScheduleModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Shuttle Schedule</Text>
          <Text style={styles.subtitle}>All routes operating today</Text>
          {SCHEDULES.map((s, i) => (
            <View key={i} style={styles.scheduleCard}>
              <View style={[styles.colorBar, { backgroundColor: s.color }]} />
              <View style={styles.scheduleContent}>
                <Text style={styles.routeName}>{s.route}</Text>
                <View style={styles.scheduleRow}>
                  <Ionicons name="time-outline" size={13} color="#888" />
                  <Text style={styles.scheduleText}>{s.hours}</Text>
                </View>
                <View style={styles.scheduleRow}>
                  <Ionicons name="reload-outline" size={13} color="#888" />
                  <Text style={styles.scheduleText}>{s.freq}</Text>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, paddingBottom: 44,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#DDD', alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A1A', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#888', marginBottom: 20 },
  scheduleCard: {
    flexDirection: 'row', backgroundColor: '#F9F9F9', borderRadius: 16,
    marginBottom: 10, overflow: 'hidden',
  },
  colorBar: { width: 4 },
  scheduleContent: { flex: 1, padding: 14, gap: 5 },
  routeName: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  scheduleText: { fontSize: 13, color: '#555' },
  closeBtn: {
    backgroundColor: '#C8102E', borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', marginTop: 8,
  },
  closeBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
