import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../src/types/navigation';

interface Props {
  onScan: () => void;
}

export default function DigitalStudentCard({ onScan }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onScan} activeOpacity={0.92}>
      {/* Header row */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.brandText}>DigitalUH</Text>
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.scanIconBtn} onPress={onScan} activeOpacity={0.8}>
          <Ionicons name="qr-code" size={18} color="#C8102E" />
        </TouchableOpacity>
      </View>

      <Text style={styles.campusPass}>OFFICIAL CAMPUS PASS</Text>

      {/* QR + barcode row */}
      <View style={styles.qrRow}>
        {/* QR placeholder */}
        <View style={styles.qrBox}>
          <Ionicons name="qr-code-outline" size={44} color="#FFFFFF" />
        </View>

        {/* Barcode area */}
        <View style={styles.barcodeArea}>
          <Text style={styles.accessTokenLabel}>STUDENT ACCESS TOKEN</Text>
          <View style={styles.barcodeLines}>
            {Array.from({ length: 18 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.barcodeLine,
                  { width: i % 3 === 0 ? 3 : i % 5 === 0 ? 2 : 1.5,
                    height: i % 4 === 0 ? 32 : 24 },
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Scan button */}
      <TouchableOpacity style={styles.scanBtn} onPress={onScan} activeOpacity={0.85}>
        <Text style={styles.scanBtnText}>Scan for Campus Access</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  proBadge: {
    backgroundColor: '#C8102E', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  proBadgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  scanIconBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: 'rgba(200,16,46,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  campusPass: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10, fontWeight: '600', letterSpacing: 1.5, marginBottom: 16,
  },
  qrRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  qrBox: {
    width: 72, height: 72, borderRadius: 12,
    backgroundColor: '#2C2C2E',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  barcodeArea: { flex: 1 },
  accessTokenLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 9, fontWeight: '700', letterSpacing: 1.5, marginBottom: 8,
  },
  barcodeLines: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  barcodeLine: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 1 },
  scanBtn: {
    backgroundColor: '#C8102E', borderRadius: 12,
    paddingVertical: 13, alignItems: 'center',
  },
  scanBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
