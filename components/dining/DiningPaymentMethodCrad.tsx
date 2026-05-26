import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface DiningPaymentMethod {
  id: string; label: string; subtitle: string;
  icon: string; iconBg: string; iconColor: string;
}

interface Props { method: DiningPaymentMethod; selected: boolean; onSelect: () => void }

export default function DiningPaymentMethodCard({ method, selected, onSelect }: Props) {
  return (
    <TouchableOpacity style={[styles.card, selected && styles.cardSelected]} onPress={onSelect} activeOpacity={0.88}>
      <View style={[styles.iconCircle, { backgroundColor: method.iconBg }]}>
        <Ionicons name={method.icon as any} size={20} color={method.iconColor} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>{method.label}</Text>
        <Text style={styles.subtitle}>{method.subtitle}</Text>
      </View>
      {selected && (
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 14, marginBottom: 8, gap: 12,
    borderWidth: 1.5, borderColor: '#EEEEEE',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  cardSelected: { borderColor: '#C8102E', backgroundColor: '#FFF8F8' },
  iconCircle: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  label: { fontSize: 14, fontWeight: '700', color: '#1A1A1A' },
  subtitle: { fontSize: 12, color: '#AAAAAA', marginTop: 2 },
  checkCircle: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#C8102E', alignItems: 'center', justifyContent: 'center',
  },
});
