import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props { onViewOptions: () => void }

export default function DiningRecommendationCard({ onViewOptions }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onViewOptions} activeOpacity={0.9}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <Ionicons name="sparkles" size={20} color="#C8102E" />
        </View>
        <View style={styles.textArea}>
          <Text style={styles.title}>Smart Suggestion</Text>
          <Text style={styles.body}>
            Cougar Woods has low wait times right now. Perfect time for a quick lunch!
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#CCCCCC" />
      </View>

      {/* Chips */}
      <View style={styles.chipsRow}>
        {['Vegetarian', 'Open Now', 'Near You'].map((chip) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFF1F1', alignItems: 'center', justifyContent: 'center',
  },
  textArea: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  body: { fontSize: 13, color: '#666', lineHeight: 18 },
  chipsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    backgroundColor: '#FFF1F1', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  chipText: { color: '#C8102E', fontSize: 11, fontWeight: '700' },
});
