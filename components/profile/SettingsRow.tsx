import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: string;
  label: string;
  isDestructive?: boolean;
  onPress: () => void;
  showChevron?: boolean;
}

export default function SettingsRow({
  icon, label, isDestructive = false, onPress, showChevron = true,
}: Props) {
  const color = isDestructive ? '#C8102E' : '#1A1A1A';
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconCircle, isDestructive && styles.iconCircleRed]}>
        <Ionicons name={icon as any} size={18} color={isDestructive ? '#C8102E' : '#555'} />
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
      {showChevron && !isDestructive && (
        <Ionicons name="chevron-forward" size={16} color="#CCCCCC" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 14,
    paddingHorizontal: 16, paddingVertical: 14,
    marginBottom: 8, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  iconCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F5F5F5',
    alignItems: 'center', justifyContent: 'center',
  },
  iconCircleRed: { backgroundColor: '#FFF1F1' },
  label: { flex: 1, fontSize: 15, fontWeight: '500' },
});
