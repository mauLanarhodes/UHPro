import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Interest {
  id: string;
  name: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeColor: string;
  description: string;
  actions: { label: string; onPress?: () => void }[];
}

interface Props {
  item: Interest;
}

export default function InterestCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        {/* Icon square */}
        <View style={[styles.iconSquare, { backgroundColor: item.iconBg }]}>
          <Ionicons name={item.icon as any} size={26} color={item.iconColor} />
        </View>

        {/* Right: badge + name + description */}
        <View style={styles.rightContent}>
          <View style={[styles.badge, { backgroundColor: item.badgeColor + '22' }]}>
            <Text style={[styles.badgeText, { color: item.badgeColor }]}>{item.badge}</Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>

      {/* Action buttons row */}
      <View style={styles.actionsRow}>
        {item.actions.map((action, i) => (
          <TouchableOpacity
            key={i}
            style={styles.actionBtn}
            onPress={action.onPress ?? (() => console.log(action.label))}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>{action.label} ›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  topRow: { flexDirection: 'row', gap: 14, marginBottom: 14 },
  iconSquare: {
    width: 54, height: 54, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  rightContent: { flex: 1, gap: 4 },
  badge: {
    alignSelf: 'flex-start', borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  name: { fontSize: 17, fontWeight: '800', color: '#1A1A1A' },
  description: { fontSize: 13, color: '#666', lineHeight: 18 },
  actionsRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  actionBtn: {
    backgroundColor: '#FFF1F1', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
  },
  actionBtnText: { color: '#C8102E', fontSize: 13, fontWeight: '700' },
});
