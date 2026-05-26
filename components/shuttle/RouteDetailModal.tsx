import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ShuttleRoute } from './ShuttleRouteCard';

interface Props {
  visible: boolean;
  route: ShuttleRoute | null;
  onTrack: () => void;
  onClose: () => void;
}

const STOPS = ['Student Center South', 'MD Anderson Library', 'Science & Engineering Complex', 'PGH'];

export default function RouteDetailModal({ visible, route, onTrack, onClose }: Props) {
  if (!route) return null;
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.headerRow}>
            <View style={[styles.routeIconBox, { backgroundColor: route.accentColor + '20' }]}>
              <Ionicons name="git-branch-outline" size={20} color={route.accentColor} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.routeName}>{route.name}</Text>
              <View style={[styles.statusPill, { backgroundColor: route.statusBg }]}>
                <Text style={[styles.statusText, { color: route.statusColor }]}>{route.status}</Text>
              </View>
            </View>
          </View>

          {/* Info grid */}
          <View style={styles.infoGrid}>
            {[
              { label: 'Arrival', value: route.time },
              { label: 'Capacity', value: route.capacity },
              { label: 'Stops Left', value: route.stops },
            ].map((item, i) => (
              <View key={i} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Stops list */}
          <Text style={styles.stopsTitle}>Route Stops</Text>
          {STOPS.map((stop, i) => (
            <View key={i} style={styles.stopRow}>
              <View style={[styles.stopDot, { backgroundColor: i === 0 ? '#C8102E' : '#DDDDDD' }]} />
              {i < STOPS.length - 1 && <View style={styles.stopLine} />}
              <Text style={[styles.stopName, i === 0 && styles.stopNameActive]}>{stop}</Text>
            </View>
          ))}

          {/* Buttons */}
          <TouchableOpacity style={styles.trackBtn} onPress={onTrack} activeOpacity={0.85}>
            <Text style={styles.trackBtnText}>Track This Shuttle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
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
    padding: 24, paddingBottom: 40,
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#DDD', alignSelf: 'center', marginBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  routeIconBox: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  headerText: { flex: 1, gap: 6 },
  routeName: { fontSize: 22, fontWeight: '800', color: '#1A1A1A' },
  statusPill: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  infoGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  infoItem: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 14, padding: 12, alignItems: 'center' },
  infoLabel: { fontSize: 10, color: '#AAAAAA', fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  infoValue: { fontSize: 15, fontWeight: '800', color: '#1A1A1A' },
  stopsTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginBottom: 14 },
  stopRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14, position: 'relative' },
  stopDot: { width: 12, height: 12, borderRadius: 6, marginTop: 3, flexShrink: 0 },
  stopLine: { position: 'absolute', left: 5, top: 15, width: 2, height: 18, backgroundColor: '#EEEEEE' },
  stopName: { fontSize: 14, color: '#444', fontWeight: '500' },
  stopNameActive: { color: '#C8102E', fontWeight: '700' },
  trackBtn: {
    backgroundColor: '#C8102E', borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', marginTop: 8, marginBottom: 10,
  },
  trackBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  closeBtn: { backgroundColor: '#F5F5F5', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  closeBtnText: { color: '#555', fontSize: 15, fontWeight: '600' },
});
