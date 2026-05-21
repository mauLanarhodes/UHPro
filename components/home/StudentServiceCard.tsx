import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// TO LOAD MANJARI FONT LATER:
// 1. Download Manjari from Google Fonts: https://fonts.google.com/specimen/Manjari
// 2. Place in: assets/fonts/Manjari-Regular.ttf
// 3. In App.tsx add:
//    import { useFonts } from 'expo-font';
//    useFonts({ 'Manjari': require('./assets/fonts/Manjari-Regular.ttf') });
// 4. fontFamily: 'Manjari' below will then apply.

interface Props {
  label: string;
  onPress?: () => void;
}

export default function StudentServiceCard({ label, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E8C4C4',
    borderRadius: 20,
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    padding: 14,
  },
  label: {
    color: '#8B0000',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Manjari', // applies once Manjari is loaded via expo-font
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
});
