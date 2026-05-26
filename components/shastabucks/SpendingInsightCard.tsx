import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props { onAddFunds: () => void }

export default function SpendingInsightCard({ onAddFunds }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.warningIcon}>
          <Ionicons name="bulb-outline" size={18} color="#D97706" />
        </View>
        <Text style={styles.title}>Budget Insight</Text>
      </View>
      <Text style={styles.body}>
        Your balance may not last through the weekend based on your typical{' '}
        <Text style={styles.link}>coffee and snack spending</Text>.
      </Text>
      <TouchableOpacity style={styles.addBtn} onPress={onAddFunds} activeOpacity={0.85}>
        <Text style={styles.addBtnText}>Add $20 Now →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFBEB', borderRadius: 18,
    padding: 16, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: '#F59E0B',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  warningIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 15, fontWeight: '700', color: '#92400E' },
  body: { fontSize: 13, color: '#78350F', lineHeight: 19, marginBottom: 12 },
  link: { textDecorationLine: 'underline', color: '#92400E', fontWeight: '600' },
  addBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#F59E0B', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 8,
  },
  addBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
});
