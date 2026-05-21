import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// TO LOAD INTER FONT LATER:
// In App.tsx, use expo-font:
// import { useFonts } from 'expo-font';
// useFonts({ 'Inter': require('./assets/fonts/Inter-Regular.ttf') });
// Then fontFamily: 'Inter' will work below.

interface Props {
  title: string;
  subtitle: string;
  badge: string;
  onBadgePress: () => void;
}

export default function TaskAlertCard({ title, subtitle, badge, onBadgePress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>
        {/* Inter font applied — falls back to system font until loaded */}
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <TouchableOpacity style={styles.badge} onPress={onBadgePress} activeOpacity={0.8}>
        <Text style={styles.badgeText}>{badge}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#C8102E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  textArea: { flex: 1, marginRight: 12 },
  title: {
    color: '#C8102E',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    fontSize: 11,
    fontFamily: 'Inter', // loads when Inter font is registered via expo-font
    letterSpacing: 0,    // normal letter spacing per requirement
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  badge: {
    backgroundColor: '#C8102E',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
