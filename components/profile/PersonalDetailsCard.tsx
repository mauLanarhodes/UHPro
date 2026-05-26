import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DetailItem {
  label: string;
  value: string;
  icon: string;
}

interface Props {
  items: DetailItem[];
}

export default function PersonalDetailsCard({ items }: Props) {
  return (
    <View style={styles.card}>
      {items.map((item, i) => (
        <View key={i}>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.8}
            onPress={() => console.log('Detail tapped:', item.label)}
          >
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon as any} size={18} color="#888" />
            </View>
            <View style={styles.textArea}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </TouchableOpacity>
          {i < items.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 18,
    paddingHorizontal: 16, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center', justifyContent: 'center',
  },
  textArea: { flex: 1 },
  label: { fontSize: 10, color: '#AAAAAA', fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  value: { fontSize: 14, color: '#1A1A1A', fontWeight: '600' },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#F0F0F0', marginLeft: 48 },
});
