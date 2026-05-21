import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  message: string;
  onTrack: () => void;
  onDismiss: () => void;
}

export default function ProactiveSuggestionCard({ message, onTrack, onDismiss }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.tagRow}>
        <Ionicons name="sparkles" size={14} color="rgba(255,255,255,0.9)" />
        <Text style={styles.tagText}>Proactive suggestion</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.trackBtn} onPress={onTrack}>
          <Text style={styles.trackBtnText}>Track shuttle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissBtn} onPress={onDismiss}>
          <Text style={styles.dismissBtnText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#C8102E',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  tagText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '500',
  },
  message: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trackBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  trackBtnText: {
    color: '#C8102E',
    fontWeight: '700',
    fontSize: 14,
  },
  dismissBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dismissBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
