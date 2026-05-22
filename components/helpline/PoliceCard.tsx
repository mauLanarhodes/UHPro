import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onCall: () => void;
}

export default function PoliceCard({ onCall }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onCall}>
      {/* Gradient overlay layers for deep red effect */}
      <View style={styles.gradientTop} />

      {/* Pill badge */}
      <View style={styles.pill}>
        <Text style={styles.pillText}>IMMEDIATE CRISIS</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Campus Police</Text>

      {/* Dispatch number */}
      <Text style={styles.dispatch}>
        Dispatch: (713) 743-3333 or{'\n'}Dial 911
      </Text>

      {/* Call Now button */}
      <TouchableOpacity style={styles.callBtn} onPress={onCall} activeOpacity={0.85}>
        <Ionicons name="call-outline" size={18} color="#C8102E" style={{ marginRight: 8 }} />
        <Text style={styles.callBtnText}>CALL NOW</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#B30000',
    borderRadius: 22,
    padding: 22,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  gradientTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#8B0000',
    opacity: 0.4,
    borderRadius: 22,
  },
  pill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 14,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 36,
  },
  dispatch: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 20,
  },
  callBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  callBtnText: {
    color: '#C8102E',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});
