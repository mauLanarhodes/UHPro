import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Metric {
  label: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface Props { items: Metric[] }

export default function SummaryMetricCard({ items }: Props) {
  return (
    <View style={styles.grid}>
      {items.map((item, i) => (
        <View key={i} style={styles.card}>
          <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
            <Ionicons name={item.icon as any} size={18} color={item.iconColor} />
          </View>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  card: {
    flex: 1, minWidth: '44%',
    backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 14, alignItems: 'flex-start',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  value: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 2 },
  label: { fontSize: 11, color: '#AAAAAA', fontWeight: '500' },
});
