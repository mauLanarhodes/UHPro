import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface DiningMetric {
  label: string; value: string; icon: string;
  iconBg: string; iconColor: string; sub?: string;
}

export default function DiningMetricCard({ items }: { items: DiningMetric[] }) {
  return (
    <View style={styles.grid}>
      {items.map((item, i) => (
        <View key={i} style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
            <Ionicons name={item.icon as any} size={17} color={item.iconColor} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
          {item.sub && <Text style={styles.sub}>{item.sub}</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  card: {
    flex: 1, minWidth: '44%', backgroundColor: '#FFFFFF',
    borderRadius: 16, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 5, elevation: 2,
  },
  iconCircle: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  label: { fontSize: 10, color: '#AAAAAA', fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  value: { fontSize: 17, fontWeight: '800', color: '#1A1A1A' },
  sub: { fontSize: 11, color: '#AAAAAA', marginTop: 2 },
});
