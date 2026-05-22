import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface OrgInfo {
  id: string;
  name: string;
  tagline: string;
  upcomingEvent: string;
  memberCount: string;
}

interface Props {
  visible: boolean;
  org: OrgInfo | null;
  onJoin: () => void;
  onClose: () => void;
  joined: boolean;
}

export default function JoinOrganizationModal({ visible, org, onJoin, onClose, joined }: Props) {
  if (!org) return null;
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          {joined ? (
            <>
              <Ionicons name="checkmark-circle" size={56} color="#C8102E" style={{ marginBottom: 12 }} />
              <Text style={styles.welcomeText}>Welcome to the community 🎉</Text>
              <Text style={styles.orgName}>{org.name}</Text>
              <Text style={styles.tagline}>{org.tagline}</Text>
            </>
          ) : (
            <>
              <Text style={styles.orgName}>{org.name}</Text>
              <Text style={styles.tagline}>{org.tagline}</Text>
              <View style={styles.infoBox}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color="#C8102E" />
                  <Text style={styles.infoText}>Upcoming: {org.upcomingEvent}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="people-outline" size={16} color="#C8102E" />
                  <Text style={styles.infoText}>{org.memberCount} members</Text>
                </View>
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.joinBtn, joined && styles.joinBtnJoined]}
            onPress={joined ? onClose : onJoin}
            activeOpacity={0.85}
          >
            <Text style={[styles.joinBtnText, joined && styles.joinBtnTextJoined]}>
              {joined ? 'Joined ✓' : 'Join Organization'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeBtnText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 28, paddingBottom: 44, alignItems: 'center',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#DDDDDD', marginBottom: 20,
  },
  orgName: { fontSize: 24, fontWeight: '800', color: '#1A1A1A', marginBottom: 6, textAlign: 'center' },
  tagline: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 18, lineHeight: 20 },
  welcomeText: { fontSize: 20, fontWeight: '800', color: '#C8102E', marginBottom: 8, textAlign: 'center' },
  infoBox: {
    backgroundColor: '#FFF1F1', borderRadius: 14,
    padding: 14, width: '100%', gap: 10, marginBottom: 20,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 14, color: '#444', fontWeight: '500' },
  joinBtn: {
    backgroundColor: '#C8102E', borderRadius: 14,
    paddingVertical: 15, width: '100%', alignItems: 'center', marginBottom: 10,
  },
  joinBtnJoined: { backgroundColor: '#F5E0E0' },
  joinBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  joinBtnTextJoined: { color: '#C8102E' },
  closeBtn: {
    backgroundColor: '#F5F5F5', borderRadius: 14,
    paddingVertical: 14, width: '100%', alignItems: 'center',
  },
  closeBtnText: { color: '#555', fontSize: 15, fontWeight: '600' },
});
