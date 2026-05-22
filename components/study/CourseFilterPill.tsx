import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  active: boolean;
  onPress: () => void;
}

export default function CourseFilterPill({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, active && styles.pillActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 8,
    marginBottom: 8,
  },
  pillActive: {
    backgroundColor: '#C8102E',
  },
  pillText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFFFFF',
  },
});
