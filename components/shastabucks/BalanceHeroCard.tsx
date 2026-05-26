import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  balance: number;
  onAddFunds: () => void;
  onScanPay: () => void;
  onTransfer: () => void;
}

export default function BalanceHeroCard({ balance, onAddFunds, onScanPay, onTransfer }: Props) {
  return (
    <View style={styles.wrapper}>
      {/* Main balance card */}
      <View style={styles.card}>
        {/* Gradient overlays */}
        <View style={styles.gradientTop} />
        <View style={styles.gradientBottom} />

        {/* UH pill */}
        <View style={styles.uhPill}>
          <Ionicons name="school-outline" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.uhPillText}>University of Houston</Text>
        </View>

        {/* QR icon top right */}
        <View style={styles.qrCorner}>
          <Ionicons name="qr-code-outline" size={22} color="rgba(255,255,255,0.6)" />
        </View>

        {/* Balance label */}
        <Text style={styles.availableLabel}>AVAILABLE BALANCE</Text>

        {/* Amount */}
        <View style={styles.amountRow}>
          <Text style={styles.dollarSign}>$</Text>
          <Text style={styles.amount}>{balance.toFixed(2)}</Text>
          <Text style={styles.usdLabel}>USD</Text>
        </View>

        {/* Student ID row */}
        <View style={styles.idRow}>
          <View style={styles.idIconCircle}>
            <Ionicons name="card-outline" size={16} color="#C8102E" />
          </View>
          <View>
            <Text style={styles.idLabel}>Student ID</Text>
            <Text style={styles.idNumber}>8012 • 4492 • 0019</Text>
          </View>
          <Text style={styles.lastUpdated}>Last updated: Just now</Text>
        </View>
      </View>

      {/* Quick action buttons */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionItem} onPress={onAddFunds} activeOpacity={0.8}>
          <View style={styles.actionCircle}>
            <Ionicons name="add-circle-outline" size={26} color="#444" />
          </View>
          <Text style={styles.actionLabel}>Add Funds</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={onScanPay} activeOpacity={0.8}>
          <View style={[styles.actionCircle, styles.actionCircleRed]}>
            <Ionicons name="scan-outline" size={26} color="#FFFFFF" />
          </View>
          <Text style={[styles.actionLabel, styles.actionLabelBold]}>Scan & Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={onTransfer} activeOpacity={0.8}>
          <View style={styles.actionCircle}>
            <Ionicons name="swap-horizontal-outline" size={26} color="#444" />
          </View>
          <Text style={styles.actionLabel}>Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  card: {
    backgroundColor: '#C8102E',
    borderRadius: 24,
    padding: 20,
    paddingBottom: 18,
    overflow: 'hidden',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 0,
  },
  gradientTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#8B0000',
    opacity: 0.5,
    top: 0, height: '50%',
  },
  gradientBottom: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A0000',
    opacity: 0.3,
    top: '60%',
  },
  uhPill: {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
    marginBottom: 14,
  },
  uhPillText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  qrCorner: { position: 'absolute', top: 18, right: 18 },
  availableLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6,
  },
  amountRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 },
  dollarSign: { color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  amount: { color: '#FFFFFF', fontSize: 56, fontWeight: '900', lineHeight: 60 },
  usdLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16, fontWeight: '600', marginBottom: 10, marginLeft: 8,
  },
  idRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14, padding: 10, gap: 10,
  },
  idIconCircle: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center', justifyContent: 'center',
  },
  idLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '600' },
  idNumber: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  lastUpdated: {
    color: 'rgba(255,255,255,0.5)', fontSize: 10,
    fontWeight: '400', marginLeft: 'auto' as any,
  },

  // Action row below card
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 20, paddingVertical: 14, paddingHorizontal: 10,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  actionItem: { alignItems: 'center', gap: 6 },
  actionCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#F5F5F5',
    alignItems: 'center', justifyContent: 'center',
  },
  actionCircleRed: { backgroundColor: '#C8102E' },
  actionLabel: { fontSize: 12, color: '#555', fontWeight: '500' },
  actionLabelBold: { color: '#C8102E', fontWeight: '700' },
});
