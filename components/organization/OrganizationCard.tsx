import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrgInfo } from './JoinOrganizationModal';

interface Props {
  org: OrgInfo;
  joined: boolean;
  onPress: (org: OrgInfo) => void;
}

// Fake avatar colors
const AVATAR_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

// Background color placeholders per org (used when no image)
const ORG_BG_COLORS: Record<string, string> = {
  PSA: '#2D1B3D',
  ISA: '#1A1A2E',
  VSA: '#0D1B2A',
};

export default function OrganizationCard({ org, joined, onPress }: Props) {
  const bgColor = ORG_BG_COLORS[org.id] || '#1A1A2E';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(org)} activeOpacity={0.92}>

      {/* Image section with dark overlay */}
      <View style={[styles.imageSection, { backgroundColor: bgColor }]}>
        {/* Subtle gradient overlays */}
        <View style={styles.imgOverlayTop} />
        <View style={styles.imgOverlayBottom} />

        {/* Decorative light circles to simulate photo feel */}
        <View style={[styles.decorCircle, { top: 20, left: 30, width: 80, height: 80, backgroundColor: 'rgba(255,255,255,0.06)' }]} />
        <View style={[styles.decorCircle, { top: 40, right: 20, width: 60, height: 60, backgroundColor: 'rgba(200,16,46,0.12)' }]} />
        <View style={[styles.decorCircle, { bottom: 10, left: '40%', width: 100, height: 100, backgroundColor: 'rgba(255,255,255,0.04)' }]} />
      </View>

      {/* Bottom info section */}
      <View style={styles.infoSection}>
        <View style={styles.infoLeft}>
          <Text style={styles.orgName}>{org.name}</Text>
          <Text style={styles.orgTagline}>{org.tagline}</Text>
          {/* Member avatars */}
          <View style={styles.membersRow}>
            {AVATAR_COLORS.map((c, i) => (
              <View
                key={i}
                style={[styles.avatar, { backgroundColor: c, marginLeft: i === 0 ? 0 : -8 }]}
              />
            ))}
            <Text style={styles.memberCount}>{org.memberCount}</Text>
          </View>
        </View>

        {/* Plus / Joined button */}
        <TouchableOpacity
          style={[styles.plusBtn, joined && styles.plusBtnJoined]}
          onPress={() => onPress(org)}
          activeOpacity={0.8}
        >
          {joined
            ? <Ionicons name="checkmark" size={18} color="#C8102E" />
            : <Ionicons name="add" size={22} color="#555" />
          }
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22, overflow: 'hidden', marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 12, elevation: 5,
  },
  imageSection: { height: 160, overflow: 'hidden' },
  imgOverlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)', top: 0, height: '50%',
  },
  imgOverlayBottom: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)', top: '50%',
  },
  decorCircle: {
    position: 'absolute', borderRadius: 999,
  },
  infoSection: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14, backgroundColor: '#FFFFFF',
  },
  infoLeft: { flex: 1, gap: 4 },
  orgName: { fontSize: 16, fontWeight: '800', color: '#1A1A1A' },
  orgTagline: { fontSize: 12, color: '#888', fontWeight: '400' },
  membersRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  avatar: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 1.5, borderColor: '#FFFFFF',
  },
  memberCount: { fontSize: 11, color: '#888', fontWeight: '500', marginLeft: 8 },
  plusBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#F5F5F5',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#EEEEEE',
  },
  plusBtnJoined: { backgroundColor: '#FFF1F1', borderColor: '#F5C0C0' },
});
