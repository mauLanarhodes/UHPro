import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  StatusBar, Platform, TouchableOpacity, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from './src/types/navigation';

interface Props {
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export default function DigitalIdentityScreen({ onNavigate, onBack }: Props) {
  // Animated scanner line — moves up and down continuously
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Translate scan line from top (0) to bottom (140) of QR area
  const scanLineY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 140],
  });

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={24} color="#C8102E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Digital Identity</Text>
          <View style={styles.iconBtn} />
        </View>

        {/* Center content */}
        <View style={styles.body}>
          {/* Name + ID */}
          <Text style={styles.name}>Khushbu</Text>
          <Text style={styles.cougerId}>COUGAR ID 1234567</Text>

          {/* QR card */}
          <TouchableOpacity style={styles.qrCard} activeOpacity={0.92} onPress={() => console.log('QR tapped')}>
            {/* Dark QR placeholder area */}
            <View style={styles.qrArea}>
              {/* Fake QR grid */}
              <View style={styles.qrGrid}>
                {Array.from({ length: 5 }).map((_, row) => (
                  <View key={row} style={styles.qrRow}>
                    {Array.from({ length: 5 }).map((__, col) => (
                      <View
                        key={col}
                        style={[
                          styles.qrCell,
                          (row + col) % 2 === 0 && styles.qrCellDark,
                        ]}
                      />
                    ))}
                  </View>
                ))}
              </View>

              {/* Animated red scan line */}
              <Animated.View
                style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
              />

              {/* Corner brackets */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>

            {/* Scan label */}
            <View style={styles.scanLabel}>
              <View style={styles.redDot} />
              <Text style={styles.scanLabelText}>Scan for Campus Access</Text>
            </View>
          </TouchableOpacity>

          {/* Status cards */}
          <View style={styles.statusRow}>
            <View style={styles.statusCard}>
              <Ionicons name="shield-checkmark-outline" size={20} color="#C8102E" style={{ marginBottom: 6 }} />
              <Text style={styles.statusLabel}>STATUS</Text>
              <Text style={styles.statusValue}>Active</Text>
            </View>
            <View style={styles.statusCard}>
              <Ionicons name="business-outline" size={20} color="#C8102E" style={{ marginBottom: 6 }} />
              <Text style={styles.statusLabel}>COLLEGE</Text>
              <Text style={styles.statusValue}>NSM</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFF1F1' },
  safeArea: { flex: 1, paddingTop: Platform.OS === 'android' ? 30 : 0 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
  },
  iconBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#C8102E' },

  body: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 20 },

  name: { fontSize: 36, fontWeight: '900', color: '#1A1A1A', marginBottom: 6 },
  cougerId: {
    fontSize: 12, fontWeight: '700', color: '#AAAAAA',
    letterSpacing: 2, marginBottom: 30,
  },

  // QR card
  qrCard: {
    backgroundColor: '#FFFFFF', borderRadius: 26,
    padding: 20, width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 5,
    marginBottom: 20,
  },
  qrArea: {
    backgroundColor: '#1C1C1E', borderRadius: 16,
    height: 160, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16, position: 'relative',
  },

  // Fake QR grid
  qrGrid: { gap: 4 },
  qrRow: { flexDirection: 'row', gap: 4 },
  qrCell: {
    width: 20, height: 20, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  qrCellDark: { backgroundColor: 'rgba(255,255,255,0.75)' },

  // Animated red scan line
  scanLine: {
    position: 'absolute', left: 0, right: 0,
    height: 2, backgroundColor: '#C8102E',
    shadowColor: '#C8102E', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 4,
  },

  // Corner brackets
  corner: {
    position: 'absolute', width: 20, height: 20,
    borderColor: '#C8102E', borderWidth: 0,
  },
  cornerTL: { top: 10, left: 10, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 10, right: 10, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 10, left: 10, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 10, right: 10, borderBottomWidth: 3, borderRightWidth: 3 },

  scanLabel: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  redDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#C8102E' },
  scanLabelText: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },

  // Status row
  statusRow: { flexDirection: 'row', gap: 12, width: '100%' },
  statusCard: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 16, alignItems: 'flex-start',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  statusLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    letterSpacing: 1.5, marginBottom: 4,
  },
  statusValue: { fontSize: 18, fontWeight: '800', color: '#1A1A1A' },
});
