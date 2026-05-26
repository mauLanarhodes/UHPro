import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Transaction {
  id: string;
  title: string;
  datetime: string;
  amount: string;
  isCredit: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
}

interface Props { item: Transaction }

export default function TransactionRow({ item }: Props) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.8} onPress={() => console.log('Transaction:', item.title)}>
      <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
        <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
      </View>
      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          {item.badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.datetime}>{item.datetime}</Text>
      </View>
      <Text style={[styles.amount, item.isCredit ? styles.credit : styles.debit]}>
        {item.amount}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 14, marginBottom: 8, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
  },
  info: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  badge: {
    backgroundColor: '#FFEAEA', borderRadius: 8,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  badgeText: { color: '#C8102E', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },
  datetime: { fontSize: 12, color: '#AAAAAA', marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700' },
  credit: { color: '#16A34A' },
  debit: { color: '#1A1A1A' },
});
