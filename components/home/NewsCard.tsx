import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  category: string;
  headline: string;
  color: string;
  emoji: string;
}

export default function NewsCard({ category, headline, color, emoji }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={[styles.iconCircle, { backgroundColor: color }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.headline}>{headline}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 22 },
  textArea: { flex: 1 },
  category: {
    color: '#999',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headline: {
    color: '#222',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
});
