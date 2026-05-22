import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function SkillPill({ label, active, onPress }: Props) {
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
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#C8102E',
  },
  text: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
  },
  textActive: {
    color: '#FFFFFF',
  },
});
