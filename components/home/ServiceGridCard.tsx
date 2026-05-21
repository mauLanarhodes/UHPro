import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
// Card width = half screen minus outer padding (16px each side) minus half gap (6px)
const CARD_WIDTH = (width - 32 - 12) / 2;
const CARD_HEIGHT = 110;

interface Props {
  icon: string;
  label: string;
  onPress?: () => void;
}

export default function ServiceGridCard({ icon, label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Icon always top-left, fixed position */}
      <Ionicons name={icon as any} size={24} color="#FFFFFF" style={styles.icon} />
      {/* Label always bottom-left, fixed position */}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#C8102E',
    borderRadius: 18,
    padding: 14,
    // Use justifyContent space-between so icon stays top, label stays bottom
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  icon: {
    // Fixed top-left — no margin tricks, just padding from card
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
});
