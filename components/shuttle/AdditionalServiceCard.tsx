import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface AdditionalService {
  id: string; name: string; subtitle: string;
  status: string; statusColor: string;
  time: string; icon: string;
  iconBg: string; iconColor: string;
}

interface Props { service: AdditionalService; onPress: () => void }

export default function AdditionalServiceCard({ service, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      {/* Icon square */}
      <View style={[styles.iconSquare, { backgroundColor: service.iconBg }]}>
        <Ionicons name={service.icon as any} size={22} color={service.iconColor} />
      </View>

      {/* Middle text */}
      <View style={styles.textArea}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.subtitle}>{service.subtitle}</Text>
      </View>

      {/* Right: status + time */}
      <View style={styles.rightArea}>
        <Text style={[styles.status, { color: service.statusColor }]}>{service.status}</Text>
        <Text style={styles.time}>{service.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#F5C0C0',
    shadowColor: '#C8102E', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    gap: 12,
  },
  iconSquare: {
    width: 46, height: 46, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  textArea: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 2 },
  subtitle: { fontSize: 12, color: '#888' },
  rightArea: { alignItems: 'flex-end', gap: 3 },
  status: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  time: { fontSize: 11, color: '#888', fontWeight: '500' },
});
