import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  balance: number;
  onAddFunds: () => void;
  onViewMealPlan: () => void;
}

export default function DiningBalanceHeroCard({ balance, onAddFunds, onViewMealPlan }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.gradientOverlay} />

      {/* Top badges */}
      <View style={styles.badgeRow}>
        <View style={styles.platinumBadge}>
          <Text style={styles.platinumText}>PLATINUM MEAL PLAN</Text>
        </View>
        <View style={styles.silverBadge}>
          <Text style={styles.silverText}>SILVER TIER</Text>
        </View>
      </View>

      {/* Balance */}
      <Text style={styles.availableLabel}>Available Balance</Text>
      <View style={styles.amountRow}>
        <Text style={styles.dollarSign}>$</Text>
        <Text style={styles.amount}>{balance.toFixed(2)}</Text>
      </View>

      {/* Add Funds link */}
      <TouchableOpacity style={styles.addLink} onPress={onAddFunds} activeOpacity={0.8}>
        <Ionicons name="add-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
        <Text style={styles.addLinkText}>Add Funds</Text>
      </TouchableOpacity>

      {/* Meal Plans button */}
      <TouchableOpacity style={styles.mealPlanBtn} onPress={onViewMealPlan} activeOpacity={0.85}>
        <Ionicons name="restaurant-outline" size={16} color="#C8102E" style={{ marginRight: 6 }} />
        <Text style={styles.mealPlanBtnText}>Meal Plans</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#C8102E',
    borderRadius: 24, padding: 22, marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 18, elevation: 12,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#7A0000', opacity: 0.5, top: '40%',
  },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  platinumBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
  },
  platinumText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  silverBadge: {
    backgroundColor: '#E8D5A3',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
  },
  silverText: { color: '#7A5C00', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  availableLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  amountRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 },
  dollarSign: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginBottom: 8 },
  amount: { color: '#FFFFFF', fontSize: 52, fontWeight: '900', lineHeight: 58 },
  addLink: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginBottom: 18,
  },
  addLinkText: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '600' },
  mealPlanBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 24,
    paddingHorizontal: 20, paddingVertical: 11,
  },
  mealPlanBtnText: { color: '#C8102E', fontSize: 14, fontWeight: '700' },
});
