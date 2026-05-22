import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BalanceItem {
  label: string;
  amount: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

interface Props {
  items: BalanceItem[];
}

export default function BalanceCard({ items }: Props) {
  return (
    <View style={styles.row}>
      {items.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          activeOpacity={0.88}
          onPress={() => console.log('Balance tapped:', item.label)}
        >
          <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
            <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.amount}>{item.amount}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  card: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 16, alignItems: 'flex-start',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  iconCircle: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  label: { fontSize: 12, color: '#888', fontWeight: '500', marginBottom: 4 },
  amount: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
});
