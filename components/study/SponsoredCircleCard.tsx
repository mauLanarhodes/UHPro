import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  onViewCircle: () => void;
}

// Fake avatar colors to simulate overlapping profile pics
const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

export default function SponsoredCircleCard({ onViewCircle }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onViewCircle} activeOpacity={0.9}>
      {/* Gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* Sponsor label */}
      <Text style={styles.sponsorLabel}>SPONSORED BY TUTORING SERVICES</Text>

      {/* Title */}
      <Text style={styles.title}>The Honors Calc II{'\n'}Circle</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Intensive Problem-solving sessions led by graduate teaching assistances.
      </Text>

      {/* Bottom row: avatars + button */}
      <View style={styles.bottomRow}>
        {/* Overlapping avatar circles */}
        <View style={styles.avatarsRow}>
          {AVATAR_COLORS.map((color, i) => (
            <View
              key={i}
              style={[
                styles.avatar,
                { backgroundColor: color, marginLeft: i === 0 ? 0 : -10 },
              ]}
            >
              <Ionicons name="person" size={14} color="#FFFFFF" />
            </View>
          ))}
          {/* +8 circle */}
          <View style={[styles.avatar, styles.avatarMore, { marginLeft: -10 }]}>
            <Text style={styles.avatarMoreText}>+8</Text>
          </View>
        </View>

        {/* View Circle button */}
        <TouchableOpacity style={styles.viewBtn} onPress={onViewCircle} activeOpacity={0.85}>
          <Text style={styles.viewBtnText}>VIEW CIRCLE</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#B30000',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#C8102E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#8B0000',
    opacity: 0.4,
    borderRadius: 22,
  },
  sponsorLabel: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#B30000',
  },
  avatarMore: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  avatarMoreText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  viewBtn: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  viewBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
