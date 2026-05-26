import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function AddFundsAmountPill({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, active && styles.textActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 14,
    paddingVertical: 14, borderWidth: 1.5, borderColor: '#EEEEEE',
  },
  pillActive: { backgroundColor: '#C8102E', borderColor: '#C8102E' },
  text: { fontSize: 15, fontWeight: '700', color: '#444' },
  textActive: { color: '#FFFFFF' },
});
